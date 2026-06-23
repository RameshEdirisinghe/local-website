import { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import About from './components/About'
import Gallery from './components/Gallery'
import Reviews from './components/Reviews'
import Footer from './components/Footer'
import Cart from './components/Cart'
import CheckoutModal from './components/CheckoutModal'
import { DEFAULT_PRODUCTS } from './data/defaultProducts'

// Lazy-load heavy pages — only bundled and fetched when navigated to
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const AboutCompany   = lazy(() => import('./pages/AboutCompany'))
const AdminPanel     = lazy(() => import('./pages/AdminPanel'))

// Minimal spinner shown during lazy load
function PageLoader() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--clr-cream)',
      fontFamily: 'var(--ff-ui)',
      color: 'var(--clr-muted)',
      fontSize: '14px',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    }}>
      🌿 Loading…
    </div>
  )
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home') // 'home', 'product-details', 'about-company', 'admin'
  const [buyerType, setBuyerType] = useState('foreign') // default to 'foreign'
  const [currency, setCurrency] = useState('LKR') // default to 'LKR'
  const [language, setLanguage] = useState('EN') // default to 'EN'
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [toasts, setToasts] = useState([])

  // Initialize empty products list – will be populated from backend API
  const [products, setProducts] = useState([])

  // Load products from the backend on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/products`)
        if (!res.ok) throw new Error('Failed to fetch products')
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        console.error(err)
        // Fallback to default products if backend is unreachable
        setProducts(DEFAULT_PRODUCTS)
      }
    }
    fetchProducts()
  }, [])

  // Initialize page from URL on first load, then keep URL in sync on navigation
  useEffect(() => {
    const path = window.location.pathname

    // On mount: derive page from URL (handles direct navigation & refresh)
    const pageFromPath =
      path === '/admin'           ? 'admin'           :
      path === '/product-details' ? 'product-details' :
      path === '/about-company'   ? 'about-company'   :
      'home'

    if (pageFromPath !== currentPage) {
      setCurrentPage(pageFromPath)
      return // let the re-render triggered by setCurrentPage sync the URL next tick
    }

    // On subsequent renders: keep URL in sync with currentPage state
    const targetPath =
      currentPage === 'admin'           ? '/admin'           :
      currentPage === 'product-details' ? '/product-details' :
      currentPage === 'about-company'   ? '/about-company'   :
      '/'

    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath)
    }
  }, [currentPage])

  // Adjust currency and language based on buyerType selection automatically
  useEffect(() => {
    setCurrency('LKR')
    if (buyerType === 'local') {
      setLanguage('SI')
    } else {
      setLanguage('EN')
    }
  }, [buyerType])

  const showToast = useCallback((message) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  const addToCart = useCallback((product, gradeName, qty, unit, unitPrice) => {
    const itemKey = `${product.id}-${gradeName}`
    setCart((prev) => {
      const existing = prev.find((item) => item.key === itemKey)
      if (existing) {
        showToast(`Updated ${product.name} (${gradeName}) quantity to ${existing.quantity + qty} ${unit}!`)
        return prev.map((item) =>
          item.key === itemKey
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
      }
      showToast(`Added ${qty} ${unit} of ${product.name} (${gradeName}) to cart.`)
      return [
        ...prev,
        {
          key: itemKey,
          id: product.id,
          name: product.name,
          sinhala: product.sinhala,
          grade: gradeName,
          quantity: qty,
          unit,
          price: unitPrice,
          image: product.image || product.imageUrl || '',
          imageUrl: product.imageUrl || product.image || '',
        },
      ]
    })
  }, [showToast])

  const updateCartQuantity = useCallback((key, qty) => {
    if (qty <= 0) {
      removeFromCart(key)
      return
    }
    setCart((prev) =>
      prev.map((item) => (item.key === key ? { ...item, quantity: qty } : item))
    )
  }, [])

  const removeFromCart = useCallback((key) => {
    setCart((prev) => {
      const item = prev.find((item) => item.key === key)
      if (item) showToast(`Removed ${item.name} (${item.grade}) from cart.`)
      return prev.filter((item) => item.key !== key)
    })
  }, [showToast])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  // Memoize derived values to avoid unnecessary re-renders
  const cartCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  )

  if (currentPage === 'admin') {
    return (
      <Suspense fallback={<PageLoader />}>
        <AdminPanel
          products={products}
          setProducts={setProducts}
          setCurrentPage={setCurrentPage}
        />
        <div className="toast-container">
          {toasts.map((t) => (
            <div key={t.id} className="toast toast--success">
              <span>🌿</span>
              <span>{t.message}</span>
            </div>
          ))}
        </div>
      </Suspense>
    )
  }

  return (
    <>
      <Navbar
        buyerType={buyerType}
        setBuyerType={setBuyerType}
        currency={currency}
        setCurrency={setCurrency}
        language={language}
        setLanguage={setLanguage}
        cartCount={cartCount}
        toggleCart={() => setCartOpen(true)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      
      <main>
        {currentPage === 'home' && (
          <>
            <Hero buyerType={buyerType} language={language} />
            
            <Products
              buyerType={buyerType}
              currency={currency}
              language={language}
              addToCart={addToCart}
              products={products}
            />
            
            <About buyerType={buyerType} language={language} />
            
            <Gallery language={language} />
            
            <Reviews buyerType={buyerType} language={language} />
          </>
        )}

        <Suspense fallback={<PageLoader />}>
          {currentPage === 'product-details' && <ProductDetails language={language} products={products} />}
          {currentPage === 'about-company' && <AboutCompany language={language} />}
        </Suspense>
      </main>
      
      <Footer buyerType={buyerType} language={language} />

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        updateCartQuantity={updateCartQuantity}
        removeFromCart={removeFromCart}
        checkout={() => {
          setCartOpen(false)
          setCheckoutOpen(true)
        }}
        currency={currency}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        clearCart={clearCart}
        buyerType={buyerType}
        currency={currency}
        language={language}
      />

      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className="toast toast--success">
            <span>🌿</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </>
  )
}
