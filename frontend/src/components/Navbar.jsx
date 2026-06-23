import { useState, useEffect } from 'react'
import { ShoppingBag, Globe, Menu, X } from 'lucide-react'
import './Navbar.css'

// Import company logo
import companyLogo from '../assets/images/company_logo.jpeg'

export default function Navbar({
  buyerType,
  setBuyerType,
  currency,
  setCurrency,
  language,
  setLanguage,
  cartCount,
  toggleCart,
  currentPage,
  setCurrentPage,
}) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(currentPage !== 'home' || window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [currentPage])

  // Translation sets
  const t = {
    EN: {
      home: 'Home',
      products: 'Products',
      story: 'Our Story',
      reviews: 'Reviews',
      specs: 'Technical Specs',
      company: 'Our Company',
      admin: 'Admin',
      localBuyer: 'Local Buyer',
      foreignBuyer: 'Eng',
      cart: 'Cart',
      buyerMode: 'Buyer Mode',
      currency: 'Currency',
    },
    SI: {
      home: 'මුල් පිටුව',
      products: 'නිෂ්පාදන',
      story: 'අපේ කතාව',
      reviews: 'පාරිභෝගික අදහස්',
      specs: 'තාක්ෂණික පිරිවිතර',
      company: 'අපේ සමාගම',
      admin: 'කළමනාකරු',
      localBuyer: 'සිංහල',
      foreignBuyer: 'අපනයන / විදේශීය',
      cart: 'කරත්තය',
      buyerMode: 'ගැනුම්කරුගේ ප්‍රකාරය',
      currency: 'මුදල් වර්ගය',
    },
  }[language]

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-header--scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <a href="#hero" className="navbar-logo" onClick={(e) => { e.preventDefault(); handleNavClick('home', '#hero'); }}>
          <img src={companyLogo} alt="Shorewin Agri Logo" className="navbar-logo-img" />
          <div className="navbar-logo__text">
            <span className="brand-main">Shorewin Agri</span>
            <span className="brand-sub">Reserve</span>
          </div>
        </a>

        {/* Navigation Links & Mobile Drawer */}
        <nav className={`navbar-nav ${menuOpen ? 'navbar-nav--open' : ''}`}>
          <a href="#products" className={`nav-link ${currentPage === 'home' ? '' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('home', '#products'); }}>
            {t.products}
          </a>
          <a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('home', '#about'); }}>
            {t.story}
          </a>
          <a href="#product-details" className={`nav-link ${currentPage === 'product-details' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('product-details'); }}>
            {t.specs}
          </a>
          <a href="#about-company" className={`nav-link ${currentPage === 'about-company' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('about-company'); }}>
            {t.company}
          </a>
          {/* <a href="/admin" className={`nav-link ${currentPage === 'admin' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('admin'); }}>
            {t.admin}
          </a> */}

          {/* Mobile selectors inside drawer */}
          <div className="mobile-selectors">
            <div className="buyer-toggle-wrap">
              <span className="selector-title">{t.buyerMode}</span>
              <div className="buyer-toggle-buttons">
                <button
                  className={`btn-mode ${buyerType === 'local' ? 'active' : ''}`}
                  onClick={() => {
                    setBuyerType('local')
                  }}
                >
                  🇱🇰 Local
                </button>
                <button
                  className={`btn-mode ${buyerType === 'foreign' ? 'active' : ''}`}
                  onClick={() => {
                    setBuyerType('foreign')
                  }}
                >
                  🌐 Export
                </button>
              </div>
            </div>

            {buyerType === 'foreign' && (
              <div className="buyer-toggle-wrap" style={{ marginTop: '20px' }}>
                <span className="selector-title">{t.currency}</span>
                <div className="buyer-toggle-buttons">
                  <button
                    className={`btn-mode ${currency === 'LKR' ? 'active' : ''}`}
                    onClick={() => setCurrency('LKR')}
                  >
                    LKR (Rs.)
                  </button>
                  <button
                    className={`btn-mode ${currency === 'USD' ? 'active' : ''}`}
                    onClick={() => setCurrency('USD')}
                  >
                    USD ($)
                  </button>
                  <button
                    className={`btn-mode ${currency === 'EUR' ? 'active' : ''}`}
                    onClick={() => setCurrency('EUR')}
                  >
                    EUR (€)
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Side Actions */}
        <div className="navbar-actions">
          {/* Buyer Type Switcher (Desktop Only - hidden on mobile via CSS) */}
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

          {/* Currency Switcher (Desktop Only - hidden on mobile via CSS) */}
          {buyerType === 'foreign' && (
            <div className="currency-selector">
              <Globe className="icon-globe" size={16} />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="select-currency"
              >
                <option value="LKR">LKR (Rs.)</option>
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
