import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import About from './components/About'
import Gallery from './components/Gallery'
import Reviews from './components/Reviews'
import Footer from './components/Footer'
import Cart from './components/Cart'
import CheckoutModal from './components/CheckoutModal'
import ProductDetails from './pages/ProductDetails'
import AboutCompany from './pages/AboutCompany'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home') // 'home', 'product-details', 'about-company'
  const [buyerType, setBuyerType] = useState('foreign') // 'local' or 'foreign'
  const [currency, setCurrency] = useState('USD') // 'USD', 'LKR', 'EUR'
  const [language, setLanguage] = useState('EN') // 'EN' or 'SI' (Sinhala)
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [toasts, setToasts] = useState([])

  // Adjust currency and language based on buyerType selection automatically
  useEffect(() => {
    if (buyerType === 'local') {
      setCurrency('LKR')
      setLanguage('SI')
    } else {
      setCurrency('USD')
      setLanguage('EN')
    }
  }, [buyerType])

  const showToast = (message) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  const addToCart = (product, gradeName, qty, unit, unitPrice) => {
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
          image: product.image,
        },
      ]
    })
  }

  const updateCartQuantity = (key, qty) => {
    if (qty <= 0) {
      removeFromCart(key)
      return
    }
    setCart((prev) =>
      prev.map((item) => (item.key === key ? { ...item, quantity: qty } : item))
    )
  }

  const removeFromCart = (key) => {
    const item = cart.find((item) => item.key === key)
    if (item) {
      showToast(`Removed ${item.name} (${item.grade}) from cart.`)
    }
    setCart((prev) => prev.filter((item) => item.key !== key))
  }

  const clearCart = () => {
    setCart([])
  }

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0)

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
            />
            
            <About buyerType={buyerType} language={language} />
            
            <Gallery language={language} />
            
            <Reviews buyerType={buyerType} language={language} />
          </>
        )}
        {currentPage === 'product-details' && <ProductDetails language={language} />}
        {currentPage === 'about-company' && <AboutCompany language={language} />}
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
