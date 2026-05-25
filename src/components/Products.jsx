import { useState } from 'react'
import './Products.css'
import cinnamonProduct from '../assets/images/cinnamon_product.png'
import pepperProduct from '../assets/images/pepper_product.png'

const PRODUCTS_DATA = [
  {
    id: 'cinnamon',
    name: 'Ceylon Cinnamon',
    sinhala: 'කුරුඳු',
    tagline: 'True Cinnamon — Soft, Sweet & Complex',
    description: {
      EN: 'Known as the "true cinnamon," Ceylon cinnamon (Cinnamomum verum) is native to Sri Lanka. Extremely low in coumarin (unlike Cassia), making it safe for daily consumption. It features thin, paper-like golden layers rolled together, giving a sweet, delicate aroma.',
      SI: 'ලොව සැබෑ කුරුඳු (Cinnamomum verum) ශ්‍රී ලංකාවට ආවේණික වේ. කැසියා මෙන් නොව මෙහි කූමරින් ප්‍රතිශතය ඉතා අවම නිසා දිනපතා භාවිතයට ඉතා සුදුසුය. සිහින් ස්ථර රැසක් එක්ව සාදා ඇති මෙම කුරුඳු පොතු මිහිරි, සුවඳවත් රසයකින් යුක්ත වේ.'
    },
    image: cinnamonProduct,
    color: 'var(--clr-cinnamon)',
    grades: [
      { 
        name: 'Alba', 
        desc: {
          EN: 'The absolute premium grade. The thinnest quills, hand-rolled with extreme precision. Floral aroma, sweet taste, prized by top gourmet pastry chefs worldwide.',
          SI: 'ඉහළම සහ වටිනාම කුරුඳු ශ්‍රේණිය. ඉතාමත් සිහින්ව අතින් සකස් කරන ලද, ලොව සුපිරි හෝටල් සහ රසකැවිලි නිෂ්පාදනයට බහුලවම යොදාගන්නා වර්ගයයි.'
        }, 
        basePriceUSD: 25 
      },
      { 
        name: 'C5 Special', 
        desc: {
          EN: 'Exquisite retail grade. Golden color, compact quills, perfect for packaging, gifting, and premium spice shops.',
          SI: 'සුවිශේෂී සිල්ලර වෙළඳපල ශ්‍රේණිය. රන්වන් පැහැයෙන් යුතු අතර, තෑගි දීමට සහ උසස් තත්ත්වයේ කුළුබඩු සැකසුම් සඳහා කදිම වේ.'
        }, 
        basePriceUSD: 20 
      },
      { 
        name: 'C5 / M5', 
        desc: {
          EN: 'Standard export grade. Great combination of aroma and look. Excellent for culinary use and bulk blenders.',
          SI: 'සාමාන්‍ය අපනයන මට්ටමේ ශ්‍රේණිය. සුවඳ සහ පෙනුම අතින් ඉතා උසස් වන අතර, ආහාර පිසීමට සහ කුළුබඩු මිශ්‍රණ සැකසීමට යොදාගනී.'
        }, 
        basePriceUSD: 15 
      },
      { 
        name: 'Quillings', 
        desc: {
          EN: 'Broken cinnamon pieces. Concentrated oils. Highly cost-effective for grinding into powder or extracting essential oils.',
          SI: 'කුඩු සහ තෙල් නිස්සාරණයට යොදාගන්නා, කැඩුණු කුරුඳු කැබලි. මිල අතින් ඉතා වාසිදායක වන අතර ගුණාත්මක බවින් ඉහළය.'
        }, 
        basePriceUSD: 8 
      },
    ],
    certifications: ['USDA Organic', 'SLS Certified', 'ISO 22000'],
  },
  {
    id: 'pepper',
    name: 'Ceylon Black Pepper',
    sinhala: 'ගම්මිරිස්',
    tagline: 'Bold, Pungent & Richly Aromatic',
    description: {
      EN: 'Sri Lankan black pepper contains double the piperine compared to other origins, delivering sharp, clean heat. Grown in organic mid-country home gardens and harvested at perfect maturity for maximum essential oils.',
      SI: 'ශ්‍රී ලංකාවේ ගම්මිරිස්වල අඩංගු ඉහළ පයිපරීන් ප්‍රතිශතය නිසා ප්‍රබල සැර සහ සුවඳක් ගෙනදෙයි. ස්වාභාවික වගාවන්ගෙන් නෙලාගෙන නිසි ලෙස වියළා සකස් කර ඇත.'
    },
    image: pepperProduct,
    color: 'var(--clr-pepper)',
    grades: [
      { 
        name: 'ASTA 570+', 
        desc: {
          EN: 'Supreme export grade. Heavy, dense corns, fully sorted and cleaned. Highest piperine content and rich pungency.',
          SI: 'උසස්ම අපනයන ශ්‍රේණිය. පිරිසිදු කරන ලද, බරින් සහ සැරෙන් වැඩිම ගම්මිරිස් ඇට වර්ගයයි.'
        }, 
        basePriceUSD: 18 
      },
      { 
        name: 'FAQ Grade', 
        desc: {
          EN: 'Fair Average Quality. Standard export pepper, widely used in industrial food service and general retail packaging.',
          SI: 'සාමාන්‍ය අපනයන මට්ටම. ආහාර කර්මාන්තයේදී සහ සාමාන්‍ය පරිභෝජනය සඳහා බහුලවම යොදාගනී.'
        }, 
        basePriceUSD: 12 
      },
      { 
        name: 'White Pepper', 
        desc: {
          EN: 'Fully ripened peppercorns with the outer skin removed. Delicate, creamy flavor, perfect for light-colored sauces.',
          SI: 'ලෙල්ල ඉවත් කරන ලද සම්පූර්ණයෙන්ම ඉදුණු ගම්මිරිස් ඇට. මෘදු සැරකින් යුක්ත වන අතර සුදු පැහැති සෝස් වර්ග සඳහා යොදාගනී.'
        }, 
        basePriceUSD: 22 
      },
      { 
        name: 'Ground Black Pepper', 
        desc: {
          EN: 'Freshly milled to order. Medium coarse or fine grind, capturing the volatile oils in an airtight package.',
          SI: 'ඇණවුම පරිදි අලුතින්ම අඹරා සකස් කර දෙනු ලැබේ. සුවඳ සහ රසය ආරක්ෂා වන පරිදි ඇසුරුම් කර ඇත.'
        }, 
        basePriceUSD: 10 
      },
    ],
    certifications: ['Organic Cert', 'HACCP', 'GMP Approved'],
  },
]

export default function Products({ buyerType, currency, language, addToCart }) {
  const [activeGradeIndex, setActiveGradeIndex] = useState({ cinnamon: 0, pepper: 0 })
  const [quantities, setQuantities] = useState({ cinnamon: 10, pepper: 10 }) // Default starting quantities in kg/Rs

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
    setQuantities(prev => ({ ...prev, [prodId]: (prev[prodId] || 0) + 5 }))
  }

  const handleDecrement = (prodId) => {
    const minVal = buyerType === 'local' ? 5 : 10
    setQuantities(prev => ({ ...prev, [prodId]: Math.max(minVal, (prev[prodId] || 0) - 5) }))
  }

  return (
    <section className="products-section" id="products">
      <div className="container products-header">
        <span className="section-label">{text.label}</span>
        <h2 className="products-title">{text.title}</h2>
        <p className="products-intro">{text.intro}</p>
      </div>

      <div className="container products-grid">
        {PRODUCTS_DATA.map((p) => {
          const activeGradeIdx = activeGradeIndex[p.id]
          const activeGrade = p.grades[activeGradeIdx]
          
          // Calculate localized price
          const priceUSD = activeGrade.basePriceUSD
          const localizedPrice = Math.round(priceUSD * currencyRate)
          
          const qty = quantities[p.id] === '' ? 5 : quantities[p.id]

          return (
            <article key={p.id} className="product-card-luxury" style={{ '--accent-color': p.color }}>
              <div className="product-card-visual">
                <img src={p.image} alt={p.name} className="product-card-img" />
                <div className="product-badge-overlay">{p.name === 'Ceylon Cinnamon' ? '100% True Cinnamon' : 'ASTA Quality'}</div>
              </div>

              <div className="product-card-details">
                <div className="product-meta-header">
                  <div>
                    <h3 className="product-name">{p.name}</h3>
                    <span className="product-sinhala-name">{p.sinhala}</span>
                  </div>
                  <div className="product-certifications-badges">
                    {p.certifications.map((c) => (
                      <span key={c} className="cert-stamp">{c}</span>
                    ))}
                  </div>
                </div>

                <p className="product-tagline">{p.tagline}</p>
                <p className="product-description">{p.description[language]}</p>

                {/* Grade Selection Tabs */}
                <div className="grade-selector-container">
                  <span className="grade-label-title">{text.gradeSelect}</span>
                  <div className="grade-tabs-list">
                    {p.grades.map((grade, idx) => (
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
                    <p>{activeGrade.desc[language]}</p>
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
                        value={quantities[p.id]}
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
                    onClick={() => addToCart(p, activeGrade.name, qty, 'kg', localizedPrice)}
                  >
                    <span>🛒</span> {text.addCartBtn} — {currencySymbol}{(localizedPrice * qty).toLocaleString()}
                  </button>
                </div>
                
                <p className="moq-disclaimer">{text.moqMsg}</p>
              </div>
            </article>
          )
        })}
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
