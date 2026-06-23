import { useState, useEffect, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Plus, 
  LogOut, 
  ArrowLeft, 
  Trash2, 
  Edit, 
  Check, 
  AlertCircle, 
  Activity, 
  DollarSign, 
  FileText, 
  Eye, 
  Upload,
  Loader2
} from 'lucide-react'
import './AdminPanel.css'
import companyLogo from '../assets/images/company_logo.jpeg'
import MobileBlock from '../components/MobileBlock'

// Validate that a URL is a real Supabase Storage public URL (not localhost/blob/objectURL)
const isValidSupabaseUrl = (url) => {
  if (!url) return false
  if (url.startsWith('blob:')) return false
  if (url.startsWith('data:')) return false
  if (url.includes('localhost')) return false
  if (url.startsWith('http://127.')) return false
  // Must be an https Supabase storage URL
  return url.startsWith('https://') && url.includes('.supabase.co/storage/')
}

export default function AdminPanel({ products, setProducts, setCurrentPage }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  // Mobile detection — Admin Panel is desktop/tablet only
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const [activeTab, setActiveTab] = useState('overview') // 'overview', 'manage', 'add-edit', 'orders'
  const [editingProduct, setEditingProduct] = useState(null) // product object if editing, null if creating
  
  // Orders management state
  const [orders, setOrders] = useState([])
  const [isLoadingOrders, setIsLoadingOrders] = useState(false)

  // Activities log state
  const [activities, setActivities] = useState([])

  const fetchOrders = async () => {
    setIsLoadingOrders(true)
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
    try {
      const res = await fetch(`${baseUrl}/api/orders`)
      if (res.ok) {
        const data = await res.json()
        setOrders(data)
      }
    } catch (e) {
      console.error('Error fetching orders:', e)
    } finally {
      setIsLoadingOrders(false)
    }
  }

  // Auth checking, activities, and initial orders loading on mount
  useEffect(() => {
    const loggedIn = sessionStorage.getItem('admin_authenticated') === 'true'
    if (loggedIn) {
      setIsAuthenticated(true)
    }

    // Load activities
    const savedLogs = localStorage.getItem('admin_activity_logs')
    if (savedLogs) {
      setActivities(JSON.parse(savedLogs))
    } else {
      const initialLogs = [
        { time: 'Just now', text: 'System initialized and default products verified.' },
        { time: '10m ago', text: 'Loaded 2 default spices (Ceylon Ginger, Hot Dragon Nai Miris).' }
      ]
      setActivities(initialLogs)
      localStorage.setItem('admin_activity_logs', JSON.stringify(initialLogs))
    }

    fetchOrders()
  }, [])

  // Poll or refresh orders whenever relevant tabs are selected
  useEffect(() => {
    if (activeTab === 'orders' || activeTab === 'overview') {
      fetchOrders()
    }
  }, [activeTab])

  const addActivityLog = (text) => {
    const newLog = {
      time: 'Just now',
      text
    }
    const updated = [newLog, ...activities.slice(0, 19)] // Limit to 20 logs
    setActivities(updated)
    localStorage.setItem('admin_activity_logs', JSON.stringify(updated))
  }

  // Handle Login — verifies credentials against MongoDB via /api/auth/login
  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoggingIn(true)
    setLoginError('')
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
    try {
      const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setIsAuthenticated(true)
        sessionStorage.setItem('admin_authenticated', 'true')
        setLoginError('')
        addActivityLog('Administrator logged in successfully.')
      } else {
        setLoginError(data.error || 'Invalid username or password.')
      }
    } catch (err) {
      setLoginError('Unable to connect to server. Please ensure the backend is running.')
    } finally {
      setIsLoggingIn(false)
    }
  }

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin_authenticated')
    setUsername('')
    setPassword('')
  }

  // Toggle active status — calls backend PUT, then refreshes from server
  const handleToggleActive = async (id) => {
    const product = products.find(p => p.id === id)
    if (!product) return
    const nextState = !product.active
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
    try {
      const res = await fetch(`${baseUrl}/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...product, active: nextState }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        toast.error(`❌ Failed to update status: ${err.error || 'Unknown error'}`)
        return
      }
      // Refresh the full list from MongoDB
      const allRes = await fetch(`${baseUrl}/api/products`)
      const fresh = await allRes.json()
      setProducts(fresh)
      const label = nextState ? 'ACTIVE' : 'INACTIVE'
      addActivityLog(`Product "${product.name}" status changed to ${label}.`)
      toast.success(`✅ "${product.name}" is now ${label}.`)
    } catch (e) {
      console.error(e)
      toast.error('❌ Network error while updating status.')
    }
  }

  // Delete product — calls backend DELETE, then refreshes from server
  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
    try {
      const res = await fetch(`${baseUrl}/api/products/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        toast.error(`❌ Failed to delete: ${err.error || 'Unknown error'}`)
        return
      }
      // Refresh the full list from MongoDB
      const allRes = await fetch(`${baseUrl}/api/products`)
      const fresh = await allRes.json()
      setProducts(fresh)
      addActivityLog(`Product "${name}" deleted.`)
      toast.success(`✅ "${name}" deleted successfully.`)
      // If currently editing the deleted product, go back to list
      if (editingProduct && editingProduct.id === id) {
        setEditingProduct(null)
        setActiveTab('manage')
      }
    } catch (e) {
      console.error(e)
      toast.error('❌ Network error while deleting product.')
    }
  }

  // Confirm pending order — updates database status, triggers toast, and re-fetches
  const handleConfirmOrder = async (orderId, customerName) => {
    if (!window.confirm(`Are you sure you want to confirm Order "${orderId}" for ${customerName}?`)) return
    
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
    try {
      const res = await fetch(`${baseUrl}/api/orders/${orderId}/confirm`, {
        method: 'PUT',
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        toast.error(`❌ Failed to confirm order: ${err.error || 'Unknown error'}`)
        return
      }
      toast.success(`✅ Order ${orderId} confirmed!`)
      addActivityLog(`Order "${orderId}" confirmed for customer ${customerName}.`)
      fetchOrders()
    } catch (e) {
      console.error(e)
      toast.error('❌ Network error while confirming order.')
    }
  }

  // Form State
  const [formId, setFormId] = useState('')
  const [formName, setFormName] = useState('')
  const [formSinhala, setFormSinhala] = useState('')
  const [formTagline, setFormTagline] = useState('')
  const [formDescEn, setFormDescEn] = useState('')
  const [formDescSi, setFormDescSi] = useState('')
  const [formColor, setFormColor] = useState('var(--clr-ginger)')
  const [formImage, setFormImage] = useState('')        // only ever holds a valid Supabase public URL
  const [formImageFile, setFormImageFile] = useState(null) // raw File object from <input>
  const [imageUploaded, setImageUploaded] = useState(false) // true only after a successful Supabase upload
  const [imageSelected, setImageSelected] = useState(false)  // true when user has picked a NEW file
  const [formCerts, setFormCerts] = useState([])
  const [imagePreviewUrl, setImagePreviewUrl] = useState('') // blob URL for preview only

  // Loading / in-progress flags
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [isSubmittingProduct, setIsSubmittingProduct] = useState(false)

  // Ref for the hidden file input so we can reset it
  const fileInputRef = useRef(null)
  const [formPitchTitleEn, setFormPitchTitleEn] = useState('')
  const [formPitchTitleSi, setFormPitchTitleSi] = useState('')
  const [formPitchTextEn, setFormPitchTextEn] = useState('')
  const [formPitchTextSi, setFormPitchTextSi] = useState('')

  // Sub-items states
  const [formGrades, setFormGrades] = useState([])
  const [formSpecs, setFormSpecs] = useState([])

  // Setup form for editing
  const startEditProduct = (product) => {
    setEditingProduct(product)
    setFormId(product.id)
    setFormName(product.name)
    setFormSinhala(product.sinhala || '')
    setFormTagline(product.tagline || '')
    setFormDescEn(product.description?.EN || '')
    setFormDescSi(product.description?.SI || '')
    // Resolve the best available Supabase URL from either image or imageUrl field
    const rawUrl = product.image || product.imageUrl || ''
    const existingUrl = isValidSupabaseUrl(rawUrl) ? rawUrl : ''
    setFormImage(existingUrl)
    setImagePreviewUrl(existingUrl)
    setFormColor(product.color || 'var(--clr-ginger)')
    setFormCerts(product.certifications || [])
    // For edit: image is considered "uploaded" if we have an existing valid URL and no new file selected
    setImageUploaded(!!existingUrl)
    setImageSelected(false)
    setFormImageFile(null)
    setIsUploadingImage(false)
    setIsSubmittingProduct(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
    
    setFormPitchTitleEn(product.pitch?.title?.EN || '')
    setFormPitchTitleSi(product.pitch?.title?.SI || '')
    setFormPitchTextEn(product.pitch?.text?.EN || '')
    setFormPitchTextSi(product.pitch?.text?.SI || '')

    setFormGrades(product.grades ? product.grades.map(g => ({ ...g, basePriceUSD: g.basePriceUSD * 300 })) : [])
    setFormSpecs(product.specifications ? [...product.specifications] : [])
    
    setActiveTab('add-edit')
  }

  // Setup form for creating
  const startCreateProduct = () => {
    setEditingProduct(null)
    setFormId('')
    setFormName('')
    setFormSinhala('')
    setFormTagline('')
    setFormDescEn('')
    setFormDescSi('')
    setFormColor('var(--clr-ginger)')
    setFormImage('')
    setImagePreviewUrl('')
    setFormImageFile(null)
    setImageUploaded(false)
    setImageSelected(false)
    setIsUploadingImage(false)
    setIsSubmittingProduct(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
    setFormCerts(['USDA Organic', 'SLS Certified'])
    
    setFormPitchTitleEn('')
    setFormPitchTitleSi('')
    setFormPitchTextEn('')
    setFormPitchTextSi('')

    setFormGrades([
      { name: 'Standard Grade', desc: { EN: 'Standard quality dried spice.', SI: 'සාමාන්‍ය ප්‍රමිතියෙන් යුතු වියළි කුළුබඩු.' }, basePriceUSD: 3000 }
    ])
    setFormSpecs([
      { label: { EN: 'Grade Class', SI: 'ශ්‍රේණි පන්තිය' }, value: { EN: 'Premium Ceylon Standard', SI: 'ප්‍රමිතියෙන් උසස් ලංකා වර්ගය' } }
    ])
    
    setActiveTab('add-edit')
  }

  // Handle file selection — only sets local preview, does NOT upload yet
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    // Revoke any previous blob URL to avoid memory leaks
    if (imagePreviewUrl && imagePreviewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreviewUrl)
    }
    setFormImageFile(file)
    setImageSelected(true)
    // Clear any previously uploaded URL — the user must click "Store Image" again
    setFormImage('')
    setImageUploaded(false)
    // Show blob preview
    const previewUrl = URL.createObjectURL(file)
    setImagePreviewUrl(previewUrl)
    toast.success('✅ Image selected successfully.')
  }

  // Toggle certifications selection
  const toggleCert = (cert) => {
    if (formCerts.includes(cert)) {
      setFormCerts(formCerts.filter(c => c !== cert))
    } else {
      setFormCerts([...formCerts, cert])
    }
  }

  // Grades Handlers
  const handleGradeChange = (index, field, value) => {
    const updated = [...formGrades]
    if (field === 'basePriceUSD') {
      updated[index][field] = Math.max(1, parseFloat(value) || 0)
    } else if (field === 'descEn') {
      updated[index].desc.EN = value
    } else if (field === 'descSi') {
      updated[index].desc.SI = value
    } else {
      updated[index][field] = value
    }
    setFormGrades(updated)
  }

  const addGradeField = () => {
    setFormGrades([...formGrades, { 
      name: '', 
      desc: { EN: '', SI: '' }, 
      basePriceUSD: 10 
    }])
  }

  const removeGradeField = (index) => {
    setFormGrades(formGrades.filter((_, i) => i !== index))
  }

  // Specifications Handlers
  const handleSpecChange = (index, part, lang, value) => {
    const updated = [...formSpecs]
    updated[index][part][lang] = value
    setFormSpecs(updated)
  }

  const addSpecField = () => {
    setFormSpecs([...formSpecs, { label: { EN: '', SI: '' }, value: { EN: '', SI: '' } }]);
  };

  // Upload the selected file to Supabase Storage via the backend
  const handleStoreImage = async () => {
    if (!formImageFile) {
      toast.error('⚠️ Please select an image first.');
      return;
    }
    if (isUploadingImage) return; // prevent duplicate clicks

    setIsUploadingImage(true);
    const toastId = toast.loading('⬆️ Uploading image...');
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    const formData = new FormData();
    formData.append('file', formImageFile);
    try {
      const res = await fetch(`${baseUrl}/api/products/upload-image`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err.error || 'Image upload failed';
        toast.error('❌ Image upload failed. Please try again.', { id: toastId });
        throw new Error(msg);
      }
      const { url } = await res.json();
      // Validate the URL returned is a proper Supabase public URL
      if (!url || !isValidSupabaseUrl(url)) {
        toast.error('❌ Invalid image URL returned. Please try again.', { id: toastId });
        throw new Error('Invalid or missing Supabase public URL from server');
      }
      // Store ONLY the Supabase public URL; keep the blob URL for the visual preview
      setFormImage(url);
      setImageSelected(false); // a new file selection will re-enable Store Image
      setImageUploaded(true);
      toast.success('✅ Image uploaded successfully.', { id: toastId });
      addActivityLog(`Image uploaded for product "${formName || formId}"`);
    } catch (e) {
      console.error(e);
      setImageUploaded(false);
      setFormImage('');
      // toast already shown above if it's a known error; only show here if not
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (isSubmittingProduct) return; // prevent duplicate submits

    // — Final validation before sending —
    if (!formId?.trim() || !formName?.trim()) {
      toast.error('⚠️ Please fill all required fields.');
      return;
    }
    if (!imageUploaded || !isValidSupabaseUrl(formImage)) {
      toast.error('⚠️ Please upload the image before publishing.');
      return;
    }

    setIsSubmittingProduct(true);
    const cleanedId = formId.toLowerCase().replace(/[^a-z0-9_-]/g, '');

    // Only ever send the Supabase public URL — never blob or localhost
    const safeImageUrl = isValidSupabaseUrl(formImage) ? formImage : '';

    const newProduct = {
      id: cleanedId,
      name: formName,
      sinhala: formSinhala,
      tagline: formTagline,
      description: {
        EN: formDescEn,
        SI: formDescSi,
      },
      image: safeImageUrl,
      imageUrl: safeImageUrl,
      color: formColor,
      grades: formGrades.map(g => ({
        name: g.name,
        desc: { EN: g.desc?.EN || '', SI: g.desc?.SI || '' },
        basePriceUSD: (g.basePriceUSD || 3000) / 300,
      })),
      certifications: formCerts,
      active: editingProduct ? editingProduct.active : true,
      pitch: {
        title: { EN: formPitchTitleEn, SI: formPitchTitleSi },
        text: { EN: formPitchTextEn, SI: formPitchTextSi },
      },
      specifications: formSpecs.map(s => ({
        label: { EN: s.label?.EN || '', SI: s.label?.SI || '' },
        value: { EN: s.value?.EN || '', SI: s.value?.SI || '' },
      })),
    };

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const endpoint = editingProduct
        ? `${baseUrl}/api/products/${editingProduct.id}`
        : `${baseUrl}/api/products`;
      const method = editingProduct ? 'PUT' : 'POST';
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err.error || (editingProduct ? 'Failed to update product.' : 'Failed to publish product.');
        toast.error(`❌ ${msg}`);
        throw new Error(msg);
      }
      // Refresh product list from server
      const allRes = await fetch(`${baseUrl}/api/products`);
      const fresh = await allRes.json();
      setProducts(fresh);
      const successMsg = editingProduct
        ? '✅ Product updated successfully.'
        : '✅ Product published successfully.';
      toast.success(successMsg);
      addActivityLog(successMsg);
      // Reset image-related state
      if (imagePreviewUrl && imagePreviewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreviewUrl)
      }
      setActiveTab('manage');
      setEditingProduct(null);
    } catch (e) {
      console.error(e);
      // toast already shown above
    } finally {
      setIsSubmittingProduct(false);
    }
  };

  // Block admin access on mobile devices
  if (isMobile) {
    return <MobileBlock />
  }

  // Render Login view if not logged in
  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card glass">
          <div className="admin-login-logo">
            <img src={companyLogo} alt="Shorewin Agri Logo" className="admin-login-logo-img" />
            <h1>Ceylon Reserve</h1>
            <p>Admin Workspace</p>
          </div>
          
          <form className="admin-login-form" onSubmit={handleLogin}>
            <div className="admin-input-group">
              <label htmlFor="username">Username</label>
              <input 
                id="username"
                type="text" 
                className="admin-input-field"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="admin-input-group">
              <label htmlFor="password">Password</label>
              <input 
                id="password"
                type="password" 
                className="admin-input-field"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {loginError && (
              <div className="admin-login-error">
                <AlertCircle size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                {loginError}
              </div>
            )}

            <button type="submit" className="admin-login-btn" disabled={isLoggingIn}>
              {isLoggingIn ? 'Authenticating…' : 'Authenticate'}
            </button>
          </form>

          <button 
            className="admin-back-btn" 
            style={{ width: '100%', justifyContent: 'center', marginTop: '20px' }}
            onClick={() => setCurrentPage('home')}
          >
            <ArrowLeft size={16} /> Back to Ceylon Shop
          </button>
        </div>
      </div>
    )
  }

  // Calculate Metrics for Overview
  const totalProducts = products.length
  const activeProducts = products.filter(p => p.active).length
  const totalGrades = products.reduce((acc, p) => acc + (p.grades?.length || 0), 0)
  
  // Average base price in LKR (converted from base USD rate stored in database)
  const allPrices = products.flatMap(p => p.grades?.map(g => g.basePriceUSD) || [])
  const avgPrice = allPrices.length > 0 
    ? Math.round(allPrices.reduce((sum, p) => sum + p, 0) / allPrices.length * 300).toLocaleString()
    : '0'

  return (
    <div className="admin-page-container">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="admin-dashboard-layout">
        
        {/* Sidebar Nav */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-header">
            <img src={companyLogo} alt="Shorewin Logo" className="admin-sidebar-logo" />
            <div className="admin-sidebar-header-text">
              <h2>Ceylon Spice</h2>
              <span>Control Panel</span>
            </div>
          </div>

          <nav className="admin-nav-menu">
            <div 
              className={`admin-nav-item ${activeTab === 'overview' ? 'admin-nav-item--active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <LayoutDashboard size={18} />
              <span>Overview</span>
            </div>
            
            <div 
              className={`admin-nav-item ${activeTab === 'manage' ? 'admin-nav-item--active' : ''}`}
              onClick={() => {
                setActiveTab('manage')
                setEditingProduct(null)
              }}
            >
              <ShoppingBag size={18} />
              <span>Manage Products</span>
            </div>

            <div 
              className={`admin-nav-item ${activeTab === 'add-edit' && !editingProduct ? 'admin-nav-item--active' : ''}`}
              onClick={startCreateProduct}
            >
              <Plus size={18} />
              <span>Add Product</span>
            </div>

            <div 
              className={`admin-nav-item ${activeTab === 'orders' ? 'admin-nav-item--active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <FileText size={18} />
              <span>Manage Orders</span>
            </div>
          </nav>

          <div className="admin-sidebar-footer">
            <button className="admin-back-btn" onClick={() => setCurrentPage('home')}>
              <ArrowLeft size={16} />
              <span>Shop View</span>
            </button>
            <button className="admin-logout-btn" onClick={handleLogout}>
              <LogOut size={16} />
              <span>Log out</span>
            </button>
          </div>
        </aside>

        {/* Workspace area */}
        <main className="admin-workspace">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <section className="animate-fade-in">
              <div className="admin-section-header">
                <h1>Dashboard Summary</h1>
                <p>Welcome, Shorewin administrator. Review estate status and control active inventories.</p>
              </div>

              <div className="admin-stats-grid">
                <div className="admin-stat-card glass">
                  <div className="admin-stat-icon">
                    <ShoppingBag size={24} />
                  </div>
                  <div className="admin-stat-info">
                    <span className="admin-stat-value">{totalProducts}</span>
                    <span className="admin-stat-label">Total Spices</span>
                  </div>
                </div>

                <div className="admin-stat-card glass">
                  <div className="admin-stat-icon">
                    <Eye size={24} />
                  </div>
                  <div className="admin-stat-info">
                    <span className="admin-stat-value">{activeProducts}</span>
                    <span className="admin-stat-label">Active Spices</span>
                  </div>
                </div>

                <div className="admin-stat-card glass">
                  <div className="admin-stat-icon">
                    <FileText size={24} style={{ color: orders.filter(o => o.status === 'PENDING').length > 0 ? 'var(--clr-gold)' : 'inherit' }} />
                  </div>
                  <div className="admin-stat-info">
                    <span className="admin-stat-value">{orders.filter(o => o.status === 'PENDING').length}</span>
                    <span className="admin-stat-label">Pending Orders</span>
                  </div>
                </div>

                <div className="admin-stat-card glass">
                  <div className="admin-stat-icon">
                    <DollarSign size={24} />
                  </div>
                  <div className="admin-stat-info">
                    <span className="admin-stat-value">Rs. {avgPrice}</span>
                    <span className="admin-stat-label">Avg Grade Price (LKR)</span>
                  </div>
                </div>
              </div>

              <div className="admin-overview-grid">
                <div className="admin-recent-activity glass">
                  <h3><Activity size={20} style={{ verticalAlign: 'middle', marginRight: '8px', color: 'var(--clr-gold)' }} /> System Activity Log</h3>
                  <div className="activity-list">
                    {activities.map((act, i) => (
                      <div key={i} className="activity-item">
                        <span className="activity-time">{act.time}</span>
                        <span className="activity-text" dangerouslySetInnerHTML={{ __html: act.text }}></span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="admin-quick-actions glass">
                  <h3>Quick Actions</h3>
                  <div className="quick-action-buttons">
                    <button className="quick-action-btn" onClick={startCreateProduct}>
                      <span>Add new spice inventory</span>
                      <Plus size={16} />
                    </button>
                    <button className="quick-action-btn" onClick={() => setActiveTab('manage')}>
                      <span>View products listing</span>
                      <ShoppingBag size={16} />
                    </button>
                    <button className="quick-action-btn" onClick={() => setCurrentPage('home')}>
                      <span>Return to client shop front</span>
                      <ArrowLeft size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* TAB 2: MANAGE PRODUCTS */}
          {activeTab === 'manage' && (
            <section className="animate-fade-in">
              <div className="admin-section-header">
                <h1>Manage Spice Inventory</h1>
                <p>Edit prices, update details, delete items, or toggle buyer access instantly.</p>
              </div>

              <div className="table-responsive-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Product Info</th>
                      <th>Slug ID</th>
                      <th>Grades</th>
                      <th>Starting Price</th>
                      <th>Buyer Access</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => {
                      const startingPrice = p.grades && p.grades.length > 0
                        ? Math.min(...p.grades.map(g => g.basePriceUSD))
                        : 0

                      return (
                        <tr key={p.id}>
                          <td>
                            <div className="product-row-info">
                              <img
                                src={p.image || p.imageUrl || ''}
                                alt={p.name}
                                className="product-table-img"
                                onError={(e) => {
                                  e.target.onerror = null
                                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23c59d5f" stroke-width="1.5"%3E%3Crect x="3" y="3" width="18" height="18" rx="2"/%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"/%3E%3Cpath d="M21 15l-5-5L5 21"/%3E%3C/svg%3E'
                                }}
                              />
                              <div className="product-row-names">
                                <span className="product-row-name-en">{p.name}</span>
                                <span className="product-row-name-si">{p.sinhala}</span>
                              </div>
                            </div>
                          </td>
                          <td style={{ fontFamily: 'monospace', color: 'var(--clr-gold)' }}>
                            {p.id}
                          </td>
                          <td>
                            <span style={{ fontSize: '0.85rem' }}>
                              {p.grades ? p.grades.map(g => g.name).join(', ') : 'No grades'}
                            </span>
                          </td>
                          <td>
                            <strong style={{ color: 'var(--clr-cream)' }}>Rs. {(startingPrice * 300).toLocaleString()}</strong>
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div className="admin-switch-container">
                                <label className="admin-switch">
                                  <input 
                                    type="checkbox" 
                                    checked={p.active} 
                                    onChange={() => handleToggleActive(p.id)}
                                  />
                                  <span className="admin-slider"></span>
                                </label>
                              </div>
                              <span className={`admin-badge ${p.active ? 'admin-badge--active' : 'admin-badge--inactive'}`}>
                                {p.active ? 'Active' : 'Hidden'}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="action-buttons-cell">
                              <button 
                                className="action-icon-btn" 
                                title="Edit Product Details"
                                onClick={() => startEditProduct(p)}
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                className="action-icon-btn action-icon-btn--delete" 
                                title="Delete Product"
                                onClick={() => handleDeleteProduct(p.id, p.name)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--clr-muted)' }}>
                          No spices found. Click "Add Product" to create one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* TAB: MANAGE ORDERS */}
          {activeTab === 'orders' && (
            <section className="animate-fade-in">
              <div className="admin-section-header">
                <h1>Manage Customer Orders</h1>
                <p>Verify customer details, review cart selections, and confirm pending orders.</p>
              </div>

              {isLoadingOrders ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                  <Loader2 className="animate-spin" size={32} style={{ color: 'var(--clr-gold)' }} />
                </div>
              ) : (
                <div className="table-responsive-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order ID / Date</th>
                        <th>Customer Details</th>
                        <th>Purchased Items</th>
                        <th>Totals Summary</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => {
                        const orderCurrencySymbol = { USD: '$', LKR: 'Rs. ', EUR: '€' }[order.currency] || '$'
                        return (
                          <tr key={order.id}>
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <strong style={{ color: 'var(--clr-gold)', fontFamily: 'monospace', fontSize: '15px' }}>{order.id}</strong>
                                <span style={{ fontSize: '11px', color: 'var(--clr-muted)', marginTop: '4px' }}>
                                  {new Date(order.createdAt).toLocaleString()}
                                </span>
                              </div>
                            </td>
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '12px' }}>
                                <strong>{order.userDetails.name}</strong>
                                <span style={{ color: 'var(--clr-text-light)' }}>📞 {order.userDetails.phone}</span>
                                <span style={{ color: 'var(--clr-muted)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }} title={order.userDetails.address}>
                                  📍 {order.userDetails.address}
                                </span>
                              </div>
                            </td>
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
                                {order.items.map((item, idx) => (
                                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                                    <span>
                                      {item.name} <small style={{ color: 'var(--clr-gold-dark)', fontWeight: '600' }}>({item.grade})</small>
                                    </span>
                                    <strong>{item.quantity}{item.unit || 'kg'}</strong>
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '12px' }}>
                                <span style={{ color: 'var(--clr-muted)' }}>Subtotal: {orderCurrencySymbol}{order.subtotal.toLocaleString()}</span>
                                <span style={{ color: 'var(--clr-muted)' }}>Shipping: {orderCurrencySymbol}{order.shipping.toLocaleString()}</span>
                                <strong style={{ color: 'var(--clr-cream)', fontSize: '13px' }}>Total: {orderCurrencySymbol}{order.total.toLocaleString()}</strong>
                              </div>
                            </td>
                            <td>
                              <span className={`admin-badge ${order.status === 'CONFIRMED' ? 'admin-badge--active' : 'admin-badge--inactive'}`} style={{ textTransform: 'uppercase', padding: '4px 8px', borderRadius: '4px' }}>
                                {order.status}
                              </span>
                            </td>
                            <td>
                              {order.status === 'PENDING' && (
                                <button
                                  className="action-icon-btn"
                                  style={{ background: 'var(--clr-forest-light)', color: 'var(--clr-cream)', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '4px', borderRadius: '4px', width: 'auto', height: 'auto' }}
                                  title="Confirm Order"
                                  onClick={() => handleConfirmOrder(order.id, order.userDetails.name)}
                                >
                                  <Check size={14} />
                                  <span style={{ fontSize: '11px', fontWeight: '600' }}>Confirm</span>
                                </button>
                              )}
                            </td>
                          </tr>
                        )
                      })}
                      {orders.length === 0 && (
                        <tr>
                          <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--clr-muted)' }}>
                            No orders placed yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* TAB 3: ADD/EDIT FORM */}
          {activeTab === 'add-edit' && (
            <section className="animate-fade-in">
              <div className="admin-form-container glass-dark">
                <div className="admin-form-title-bar">
                  <h2>{editingProduct ? `Edit Spice: ${editingProduct.name}` : 'Create New Spice Inventory'}</h2>
                  <button className="admin-back-btn" onClick={() => setActiveTab('manage')}>
                    <ArrowLeft size={16} /> Back to list
                  </button>
                </div>

                <form onSubmit={handleSaveProduct}>
                  
                  {/* Basic Details */}
                  <div className="admin-form-section-title">1. Essential Profile Details</div>
                  
                  <div className="admin-grid-2col">
                    <div className="admin-input-group">
                      <label htmlFor="prodId">Unique Slug ID (e.g. cinnamon)</label>
                      <input 
                        id="prodId"
                        type="text" 
                        className="admin-input-field" 
                        value={formId}
                        onChange={(e) => setFormId(e.target.value)}
                        disabled={editingProduct !== null}
                        required
                        placeholder="lowercase-only-no-spaces"
                      />
                      <span className="input-hint">Used for identification. Cannot be changed later.</span>
                    </div>

                    <div className="admin-input-group">
                      <label htmlFor="prodName">English Product Name</label>
                      <input 
                        id="prodName"
                        type="text" 
                        className="admin-input-field" 
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        required
                        placeholder="e.g. Ceylon Cinnamon"
                      />
                    </div>

                    <div className="admin-input-group">
                      <label htmlFor="prodSinhala">Sinhala Product Name</label>
                      <input 
                        id="prodSinhala"
                        type="text" 
                        className="admin-input-field" 
                        value={formSinhala}
                        onChange={(e) => setFormSinhala(e.target.value)}
                        placeholder="e.g. කුරුඳු"
                      />
                    </div>

                    <div className="admin-input-group">
                      <label htmlFor="prodTagline">Marketing Tagline</label>
                      <input 
                        id="prodTagline"
                        type="text" 
                        className="admin-input-field" 
                        value={formTagline}
                        onChange={(e) => setFormTagline(e.target.value)}
                        placeholder="e.g. Sweet, Sweetly Aromatic & Pure"
                      />
                    </div>
                  </div>

                  {/* Multilingual Descriptions */}
                  <div className="admin-grid-2col" style={{ marginTop: '20px' }}>
                    <div className="admin-input-group">
                      <label htmlFor="descEn">English Description</label>
                      <textarea 
                        id="descEn"
                        className="admin-input-field" 
                        rows="4"
                        value={formDescEn}
                        onChange={(e) => setFormDescEn(e.target.value)}
                        placeholder="Write English narrative description..."
                        style={{ resize: 'vertical' }}
                      />
                    </div>

                    <div className="admin-input-group">
                      <label htmlFor="descSi">Sinhala Description</label>
                      <textarea 
                        id="descSi"
                        className="admin-input-field" 
                        rows="4"
                        value={formDescSi}
                        onChange={(e) => setFormDescSi(e.target.value)}
                        placeholder="දේශීය විස්තරය සිංහලෙන් ලියන්න..."
                        style={{ resize: 'vertical' }}
                      />
                    </div>
                  </div>

                  {/* Layout & Assets */}
                  <div className="admin-grid-2col" style={{ marginTop: '20px' }}>
                    <div className="admin-input-group">
                      <label htmlFor="accentColor">Accent Color (CSS Variable or Hex)</label>
                      <select 
                        id="accentColor"
                        className="admin-input-field"
                        value={formColor}
                        onChange={(e) => setFormColor(e.target.value)}
                      >
                        <option value="var(--clr-ginger)">Ginger Ochre (Brown/Orange)</option>
                        <option value="var(--clr-naimiris)">Nai Miris Red (Crimson)</option>
                        <option value="#c59d5f">Luxury Gold (#c59d5f)</option>
                        <option value="#1e3f20">Forest Green (#1e3f20)</option>
                        <option value="#8e44ad">Royal Purple (#8e44ad)</option>
                      </select>
                    </div>

                    <div className="admin-input-group">
                      <label>Product Imagery</label>
                      <div className="admin-image-upload-box">
                        <div className="admin-image-preview">
                          {imagePreviewUrl ? (
                            <img src={imagePreviewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                          ) : (
                            <div className="admin-image-placeholder">
                              <Upload size={20} />
                              <span>No image</span>
                            </div>
                          )}
                        </div>
                        <div className="file-input-wrapper">
                          <button type="button" className="file-input-btn">
                            <Upload size={16} /> Choose Image
                          </button>
                          <input 
                            ref={fileInputRef}
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageUpload}
                          />
                          <button
                            type="button"
                            className={`file-input-btn${isUploadingImage ? ' btn--loading' : ''}`}
                            onClick={handleStoreImage}
                            disabled={!imageSelected || isUploadingImage || imageUploaded}
                            style={{ marginLeft: '8px' }}
                            title={
                              !imageSelected ? 'Select an image first'
                              : imageUploaded ? 'Image already stored — select a new image to replace'
                              : 'Upload selected image to Supabase'
                            }
                          >
                            {isUploadingImage
                              ? <><Loader2 size={16} className="spin-icon" /> Uploading...
                              </>
                              : <><Upload size={16} /> Store Image</>
                            }
                          </button>
                        </div>
                        {/* Upload status indicator */}
                        {imageUploaded && isValidSupabaseUrl(formImage) && (
                          <div className="image-upload-status image-upload-status--ok">
                            <Check size={14} /> Image stored in Supabase
                          </div>
                        )}
                        {imageSelected && !imageUploaded && (
                          <div className="image-upload-status image-upload-status--warn">
                            <AlertCircle size={14} /> Image selected — click "Store Image" to upload
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="admin-input-group" style={{ marginTop: '20px' }}>
                    <label>Estate Certifications</label>
                    <div className="certs-grid">
                      {['USDA Organic', 'SLS Certified', 'ISO 22000', 'HACCP', 'GMP Approved', 'Fairtrade', 'GlobalG.A.P.'].map(cert => {
                        const isSelected = formCerts.includes(cert)
                        return (
                          <label key={cert} className={`cert-checkbox-label ${isSelected ? 'selected' : ''}`}>
                            <input 
                              type="checkbox" 
                              checked={isSelected}
                              onChange={() => toggleCert(cert)}
                            />
                            <span>{cert}</span>
                          </label>
                        )
                      })}
                    </div>
                  </div>

                  {/* Grades and Pricing */}
                  <div className="admin-form-section-title">2. Grades & Pricing Structures</div>
                  <div className="form-grades-container">
                    {formGrades.map((grade, index) => (
                      <div key={index} className="form-grade-card">
                        <div className="form-grade-card-header">
                          <span className="form-grade-card-title">Grade #{index + 1} Profile</span>
                          {formGrades.length > 1 && (
                            <button 
                              type="button" 
                              className="form-grade-remove-btn"
                              onClick={() => removeGradeField(index)}
                            >
                              <Trash2 size={12} /> Remove Grade
                            </button>
                          )}
                        </div>

                        <div className="admin-grid-2col">
                          <div className="admin-input-group">
                            <label>Grade Name</label>
                            <input 
                              type="text" 
                              className="admin-input-field" 
                              value={grade.name}
                              onChange={(e) => handleGradeChange(index, 'name', e.target.value)}
                              required
                              placeholder="e.g. Fine Powder, Premium Whole"
                            />
                          </div>

                          <div className="admin-input-group">
                            <label>Base Price (LKR per kg)</label>
                            <input 
                              type="number" 
                              className="admin-input-field" 
                              value={grade.basePriceUSD}
                              onChange={(e) => handleGradeChange(index, 'basePriceUSD', e.target.value)}
                              required
                              min="1"
                            />
                          </div>
                        </div>

                        <div className="admin-grid-2col" style={{ marginTop: '15px' }}>
                          <div className="admin-input-group">
                            <label>Grade Description (English)</label>
                            <input 
                              type="text" 
                              className="admin-input-field" 
                              value={grade.desc?.EN || ''}
                              onChange={(e) => handleGradeChange(index, 'descEn', e.target.value)}
                              placeholder="English specifications..."
                            />
                          </div>

                          <div className="admin-input-group">
                            <label>Grade Description (Sinhala)</label>
                            <input 
                              type="text" 
                              className="admin-input-field" 
                              value={grade.desc?.SI || ''}
                              onChange={(e) => handleGradeChange(index, 'descSi', e.target.value)}
                              placeholder="සිංහල විස්තරය..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <button 
                      type="button" 
                      className="add-grade-dashed-btn"
                      onClick={addGradeField}
                    >
                      <Plus size={16} /> Add Another Grade
                    </button>
                  </div>

                  {/* Technical Specifications & Persuasive Pitch */}
                  <div className="admin-form-section-title">3. Specifications & Marketing Pitch</div>
                  
                  <div className="admin-grid-2col">
                    <div className="admin-input-group">
                      <label>Pitch Box Title (English)</label>
                      <input 
                        type="text" 
                        className="admin-input-field" 
                        value={formPitchTitleEn}
                        onChange={(e) => setFormPitchTitleEn(e.target.value)}
                        placeholder="e.g. Why Choose Ceylon Cinnamon?"
                      />
                    </div>

                    <div className="admin-input-group">
                      <label>Pitch Box Title (Sinhala)</label>
                      <input 
                        type="text" 
                        className="admin-input-field" 
                        value={formPitchTitleSi}
                        onChange={(e) => setFormPitchTitleSi(e.target.value)}
                        placeholder="සිංහල මාතෘකාව..."
                      />
                    </div>
                  </div>

                  <div className="admin-grid-2col" style={{ marginTop: '15px' }}>
                    <div className="admin-input-group">
                      <label>Pitch Detailed Text (English)</label>
                      <textarea 
                        className="admin-input-field" 
                        rows="3"
                        value={formPitchTextEn}
                        onChange={(e) => setFormPitchTextEn(e.target.value)}
                        placeholder="Detailed sales pitch..."
                        style={{ resize: 'vertical' }}
                      />
                    </div>

                    <div className="admin-input-group">
                      <label>Pitch Detailed Text (Sinhala)</label>
                      <textarea 
                        className="admin-input-field" 
                        rows="3"
                        value={formPitchTextSi}
                        onChange={(e) => setFormPitchTextSi(e.target.value)}
                        placeholder="සිංහල විස්තරය..."
                        style={{ resize: 'vertical' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: '30px' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--clr-gold-light)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>Technical Specifications Grid</label>
                    <div className="form-specs-container" style={{ marginTop: '15px' }}>
                      {formSpecs.map((spec, index) => (
                        <div key={index} className="form-spec-row">
                          <div className="form-spec-col">
                            <label style={{ fontSize: '0.75rem', color: 'var(--clr-muted)' }}>Spec Label (e.g. Heat Level)</label>
                            <input 
                              type="text" 
                              className="admin-input-field" 
                              placeholder="EN Label"
                              value={spec.label?.EN || ''}
                              onChange={(e) => handleSpecChange(index, 'label', 'EN', e.target.value)}
                              required
                            />
                            <input 
                              type="text" 
                              className="admin-input-field" 
                              placeholder="SI Label"
                              value={spec.label?.SI || ''}
                              onChange={(e) => handleSpecChange(index, 'label', 'SI', e.target.value)}
                              style={{ marginTop: '5px' }}
                            />
                          </div>

                          <div className="form-spec-col">
                            <label style={{ fontSize: '0.75rem', color: 'var(--clr-muted)' }}>Spec Value (e.g. 150k SHU)</label>
                            <input 
                              type="text" 
                              className="admin-input-field" 
                              placeholder="EN Value"
                              value={spec.value?.EN || ''}
                              onChange={(e) => handleSpecChange(index, 'value', 'EN', e.target.value)}
                              required
                            />
                            <input 
                              type="text" 
                              className="admin-input-field" 
                              placeholder="SI Value"
                              value={spec.value?.SI || ''}
                              onChange={(e) => handleSpecChange(index, 'value', 'SI', e.target.value)}
                              style={{ marginTop: '5px' }}
                            />
                          </div>

                          <button 
                            type="button" 
                            className="form-spec-delete-btn"
                            onClick={() => removeSpecField(index)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}

                      <button 
                        type="button" 
                        className="add-grade-dashed-btn"
                        onClick={addSpecField}
                        style={{ marginTop: '5px' }}
                      >
                        <Plus size={16} /> Add Specification Row
                      </button>
                    </div>
                  </div>

                  <div className="form-actions-row">
                    <button 
                      type="button" 
                      className="btn btn--ghost" 
                      style={{ border: '1px solid rgba(255, 255, 255, 0.2)', color: 'var(--clr-cream)' }}
                      onClick={() => setActiveTab('manage')}
                      disabled={isSubmittingProduct}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className={`btn btn--gold${isSubmittingProduct ? ' btn--loading' : ''}`}
                      disabled={
                        isSubmittingProduct ||
                        isUploadingImage ||
                        !imageUploaded ||
                        !isValidSupabaseUrl(formImage) ||
                        !formId?.trim() ||
                        !formName?.trim()
                      }
                      title={
                        !imageUploaded ? 'Upload an image first'
                        : !formId?.trim() || !formName?.trim() ? 'Fill all required fields'
                        : ''
                      }
                    >
                      {isSubmittingProduct
                        ? <><Loader2 size={16} className="spin-icon" /> {editingProduct ? 'Updating...' : 'Publishing...'}</>
                        : <><Check size={16} /> {editingProduct ? 'Update Product' : 'Publish Spice'}</>
                      }
                    </button>

                  </div>

                </form>
              </div>
            </section>
          )}

        </main>
      </div>
    </div>
  )
}
