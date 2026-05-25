import { useState, useEffect } from 'react'
import { ShoppingBag, Globe, Menu, X, Landmark } from 'lucide-react'
import './Navbar.css'

export default function Navbar({
  buyerType,
  setBuyerType,
  currency,
  setCurrency,
  language,
  setLanguage,
  cartCount,
  toggleCart,
}) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Translation sets
  const t = {
    EN: {
      products: 'Products',
      story: 'Our Story',
      reviews: 'Reviews',
      localBuyer: 'Local Buyer',
      foreignBuyer: 'Export/Global',
      cart: 'Cart',
    },
    SI: {
      products: 'නිෂ්පාදන',
      story: 'අපේ කතාව',
      reviews: 'පාරිභෝගික අදහස්',
      localBuyer: 'දේශීය ගැනුම්කරු',
      foreignBuyer: 'අපනයන / විදේශීය',
      cart: 'කරත්තය',
    },
  }[language]

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-header--scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <a href="#hero" className="navbar-logo">
          <span className="navbar-logo__icon">🌿</span>
          <div className="navbar-logo__text">
            <span className="brand-main">Ceylon Spice</span>
            <span className="brand-sub">Reserve</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className={`navbar-nav ${menuOpen ? 'navbar-nav--open' : ''}`}>
          <a href="#products" className="nav-link" onClick={() => setMenuOpen(false)}>
            {t.products}
          </a>
          <a href="#about" className="nav-link" onClick={() => setMenuOpen(false)}>
            {t.story}
          </a>
          <a href="#reviews" className="nav-link" onClick={() => setMenuOpen(false)}>
            {t.reviews}
          </a>

          {/* Mobile selectors inside drawer */}
          <div className="mobile-selectors">
            <div className="buyer-toggle-wrap">
              <span className="selector-title">Buyer Mode</span>
              <div className="buyer-toggle-buttons">
                <button
                  className={`btn-mode ${buyerType === 'local' ? 'active' : ''}`}
                  onClick={() => {
                    setBuyerType('local')
                    setMenuOpen(false)
                  }}
                >
                  🇱🇰 Local
                </button>
                <button
                  className={`btn-mode ${buyerType === 'foreign' ? 'active' : ''}`}
                  onClick={() => {
                    setBuyerType('foreign')
                    setMenuOpen(false)
                  }}
                >
                  🌐 Export
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Right Side Actions */}
        <div className="navbar-actions">
          {/* Buyer Type Switcher (Desktop) */}
          <div className="buyer-type-dropdown">
            <button
              className="buyer-badge"
              onClick={() => setBuyerType(buyerType === 'local' ? 'foreign' : 'local')}
              title="Click to switch buyer mode"
            >
              {buyerType === 'local' ? (
                <>
                  <span className="badge-flag">🇱🇰</span>
                  <span className="badge-text">{t.localBuyer}</span>
                </>
              ) : (
                <>
                  <span className="badge-flag">🌐</span>
                  <span className="badge-text">{t.foreignBuyer}</span>
                </>
              )}
            </button>
          </div>

          {/* Currency Switcher (if Global Buyer) */}
          {buyerType === 'foreign' && (
            <div className="currency-selector">
              <Globe className="icon-globe" size={16} />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="select-currency"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
          )}

          {/* Cart Icon Button */}
          <button className="cart-trigger" onClick={toggleCart} aria-label="Open cart">
            <div className="cart-icon-container">
              <ShoppingBag size={20} className="icon-bag" />
              {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
            </div>
            <span className="cart-trigger-text">{t.cart}</span>
          </button>

          {/* Burger Menu Button (Mobile) */}
          <button
            className={`navbar-burger-btn ${menuOpen ? 'navbar-burger-btn--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  )
}
