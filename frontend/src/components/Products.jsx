import { useState } from 'react'
import './Products.css'
import gingerProduct from '../assets/images/ginger_product.png'
import naimirisProduct from '../assets/images/naimiris_premium.png'

export default function Products({ buyerType, currency, language, addToCart, products = [] }) {
  const [activeGradeIndex, setActiveGradeIndex] = useState({})
  const [quantities, setQuantities] = useState({}) 

  // Currency factors relative to USD
  const currencySymbol = {
    USD: '$',
    LKR: 'Rs. ',
    EUR: '€',
  }[currency]

  const currencyRate = {
    USD: 1,
    LKR: 300,
    EUR: 0.92,
  }[currency]

  // Translate basic text
  const text = {
    EN: {
      label: 'Our Premium Estate Products',
      title: 'Harvested with Pride. Crafted for Purity.',
      intro: 'Choose your desired grade below. We adjust pricing and order options based on your local or international profile.',
      gradeSelect: 'Select Product Grade:',
      qtyLabel: 'Order Quantity',
      addCartBtn: 'Add to Cart',
      moqMsg: 'MOQ for export is 50 kg. Local delivery starts at 5 kg.',
      certifications: 'Certifications:',
      perKg: 'per kg',
      from: 'Starting at',
    },
    SI: {
      label: 'අපගේ උසස් නිෂ්පාදන',
      title: 'උද්‍යෝගයෙන් නෙලාගත් සැබෑ ගුණාත්මක බව',
      intro: 'ඔබට අවශ්‍ය නිෂ්පාදන ශ්‍රේණිය තෝරන්න. දේශීය සහ විදේශීය ගැනුම්කරුවන් සඳහා මිල ගණන් සහ ප්‍රවාහන ක්‍රම වෙනස් වේ.',
      gradeSelect: 'ශ්‍රේණිය තෝරන්න:',
      qtyLabel: 'ඇණවුම් ප්‍රමාණය',
      addCartBtn: 'කරත්තයට එක් කරන්න',
      moqMsg: 'අපනයන අවම ප්‍රමාණය කි.ග්‍රෑ 50 කි. දේශීය බෙදා හැරීම කි.ග්‍රෑ 5 සිට ඇරඹේ.',
      certifications: 'සහතික සහ ප්‍රමිති:',
      perKg: 'කි.ග්‍රෑ එකකට',
      from: 'මිල ආරම්භය',
    },
  }[language]

  const handleQtyChange = (prodId, val) => {
    const minVal = buyerType === 'local' ? 5 : 10 // Min values: Local: 5kg, Foreign: 10kg
    if (val === '') {
      setQuantities(prev => ({ ...prev, [prodId]: '' }))
      return
    }
    const num = Math.max(minVal, parseInt(val) || minVal)
    setQuantities(prev => ({ ...prev, [prodId]: num }))
  }

  const handleIncrement = (prodId) => {
    const minVal = buyerType === 'local' ? 5 : 10
    const currentQty = quantities[prodId] === undefined ? minVal : (quantities[prodId] === '' ? minVal : quantities[prodId])
    setQuantities(prev => ({ ...prev, [prodId]: currentQty + 5 }))
  }

  const handleDecrement = (prodId) => {
    const minVal = buyerType === 'local' ? 5 : 10
    const currentQty = quantities[prodId] === undefined ? minVal : (quantities[prodId] === '' ? minVal : quantities[prodId])
    setQuantities(prev => ({ ...prev, [prodId]: Math.max(minVal, currentQty - 5) }))
  }

  const activeProducts = products.filter(p => p.active)

  return (
    <section className="products-section" id="products">
      <div className="container products-header">
        <span className="section-label">{text.label}</span>
        <h2 className="products-title">{text.title}</h2>
        <p className="products-intro">{text.intro}</p>
      </div>

      <div className="container products-grid">
        {activeProducts.map((p) => {
          const activeGradeIdx = activeGradeIndex[p.id] || 0
          const activeGrade = p.grades && p.grades.length > 0 ? p.grades[activeGradeIdx] : null
          
          // Calculate localized price
          const priceUSD = activeGrade ? activeGrade.basePriceUSD : 0
          const localizedPrice = Math.round(priceUSD * currencyRate)
          
          const qty = quantities[p.id] === undefined 
            ? (buyerType === 'local' ? 5 : 10) 
            : (quantities[p.id] === '' ? (buyerType === 'local' ? 5 : 10) : quantities[p.id])

          return (
            <article key={p.id} className="product-card-luxury" style={{ '--accent-color': p.color }}>
              <div className="product-card-visual">
                <img
                  src={p.image || p.imageUrl || ''}
                  alt={p.name}
                  className="product-card-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.style.background = 'rgba(197,157,95,0.08)'
                    e.target.style.objectFit = 'contain'
                    e.target.style.padding = '16px'
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23c59d5f" stroke-width="1.5"%3E%3Crect x="3" y="3" width="18" height="18" rx="2"/%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"/%3E%3Cpath d="M21 15l-5-5L5 21"/%3E%3C/svg%3E'
                  }}
                />
                <div className="product-badge-overlay">
                  {p.name.toLowerCase().includes('ginger') ? '100% True Ginger' : (p.name.toLowerCase().includes('miris') ? 'Dragon Heat Level' : 'Premium Reserve')}
                </div>
              </div>

              <div className="product-card-details">
                <div className="product-meta-header">
                  <div>
                    <h3 className="product-name">{p.name}</h3>
                    {p.sinhala && <span className="product-sinhala-name">{p.sinhala}</span>}
                  </div>
                  {p.certifications && (
                    <div className="product-certifications-badges">
                      {p.certifications.map((c) => (
                        <span key={c} className="cert-stamp">{c}</span>
                      ))}
                    </div>
                  )}
                </div>

                {p.tagline && <p className="product-tagline">{p.tagline}</p>}
                {p.description && <p className="product-description">{p.description[language]}</p>}

                {/* Grade Selection Tabs */}
                <div className="grade-selector-container">
                  <span className="grade-label-title">{text.gradeSelect}</span>
                  <div className="grade-tabs-list">
                    {p.grades && p.grades.map((grade, idx) => (
                      <button
                        key={grade.name}
                        className={`grade-tab-btn ${activeGradeIdx === idx ? 'grade-tab-btn--active' : ''}`}
                        onClick={() => setActiveGradeIndex(prev => ({ ...prev, [p.id]: idx }))}
                      >
                        {grade.name}
                      </button>
                    ))}
                  </div>
                  <div className="active-grade-description">
                    <p>{activeGrade ? activeGrade.desc[language] : ''}</p>
                  </div>
                </div>

                {/* Pricing & Add to Cart */}
                <div className="product-purchasing-box">
                  <div className="product-pricing">
                    <span className="price-label">{text.from}</span>
                    <div className="price-amount-wrapper">
                      <span className="price-currency">{currencySymbol}</span>
                      <strong className="price-value">{localizedPrice.toLocaleString()}</strong>
                      <span className="price-unit">/ {text.perKg}</span>
                    </div>
                  </div>

                  <div className="product-quantity-selector">
                    <span className="qty-label">{text.qtyLabel} (kg)</span>
                    <div className="qty-input-controls">
                      <button className="qty-btn" onClick={() => handleDecrement(p.id)}>-</button>
                      <input
                        type="number"
                        className="qty-input-field"
                        value={quantities[p.id] === undefined ? (buyerType === 'local' ? 5 : 10) : quantities[p.id]}
                        onChange={(e) => handleQtyChange(p.id, e.target.value)}
                        onBlur={() => {
                          if (quantities[p.id] === '') {
                            handleQtyChange(p.id, buyerType === 'local' ? 5 : 10)
                          }
                        }}
                      />
                      <button className="qty-btn" onClick={() => handleIncrement(p.id)}>+</button>
                    </div>
                  </div>
                </div>

                <div className="product-card-action-bar">
                  <button 
                    className="btn btn--primary btn-add-cart-full"
                    onClick={() => activeGrade && addToCart(p, activeGrade.name, qty, 'kg', localizedPrice)}
                    disabled={!activeGrade}
                  >
                    <span>🛒</span> {text.addCartBtn} — {currencySymbol}{(localizedPrice * qty).toLocaleString()}
                  </button>
                </div>
                
                <p className="moq-disclaimer">{text.moqMsg}</p>
              </div>
            </article>
          )
        })}
        {activeProducts.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--clr-muted)', fontFamily: 'var(--ff-ui)' }}>
            No products available at the moment.
          </div>
        )}
      </div>

      {/* Decorative running text strip */}
      <div className="running-text-banner">
        <div className="running-text-content">
          <span>🌿 SINGLE ORIGIN ESTATES</span>
          <span>•</span>
          <span>✈️ GLOBAL EXPORT COMPLIANT</span>
          <span>•</span>
          <span>🇱🇰 100% PURE CEYLON CHRONICLES</span>
          <span>•</span>
          <span>🛡️ ORGANICALLY CULTIVATED</span>
          <span>•</span>
          <span>📜 CERTIFIED PHYTOSANITARY DOCUMENTATION</span>
          <span>•</span>
          <span>📦 CUSTOM BULK RETAIL PRIVATE LABEL PACKAGING</span>
        </div>
      </div>
    </section>
  )
}
