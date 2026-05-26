import { useState } from 'react'
import './Products.css'
import gingerProduct from '../assets/images/ginger_product.png'
import naimirisProduct from '../assets/images/naimiris_premium.png'

const PRODUCTS_DATA = [
  {
    id: 'ginger',
    name: 'Ceylon Ginger',
    sinhala: 'ඉඟුරු',
    tagline: 'Zesty, Warm & Intensely Aromatic',
    description: {
      EN: 'Ceylon Ginger (Zingiber officinale) is renowned for its high fiber content and intense gingerol concentration, delivering a sharper, sweeter, and more pungent kick than mass-produced Chinese ginger. Grown organically in wet-zone forest gardens, it is a staple in wellness remedies and culinary masterpieces alike.',
      SI: 'ශ්‍රී ලංකාවට ආවේණික දේශීය ඉඟුරු (Zingiber officinale) එහි ඇති ඉහළ කෙඳි ප්‍රමාණය සහ අධික ජින්ජරෝල් ප්‍රතිශතය හේතුවෙන් සුවිශේෂී ප්‍රබල සැරකින් සහ සුවඳකින් යුක්ත වේ. දේශීය වෙදකමට මෙන්ම ආහාර රසවත් කිරීමටද බහුලව භාවිත කෙරේ.'
    },
    image: gingerProduct,
    color: 'var(--clr-ginger)',
    grades: [
      { 
        name: 'Premium Dried Root', 
        desc: {
          EN: 'Premium dried whole ginger roots. Carefully washed, sun-dried, and hand-sorted. Highly concentrated flavor, ideal for brewing and culinary applications.',
          SI: 'ප්‍රමිතියෙන් උසස් වියළි ඉඟුරු අල. හොඳින් සෝදා, අව්වේ වියළා පිරිසිදු කර ඇති අතර, තේ සහ ආහාර රසවත් කිරීමට කදිම වේ.'
        }, 
        basePriceUSD: 16 
      },
      { 
        name: 'Organic Ginger Powder', 
        desc: {
          EN: 'Finely milled from select organic ginger. Sharp, warming spice with no additives. Perfect for baking, smoothies, and herbal tea blends.',
          SI: 'උසස්ම තත්ත්වයේ කාබනික ඉඟුරු කුඩු. කිසිදු රසායනික ද්‍රව්‍යයක් අඩංගු නොවන අතර, රසකැවිලි සහ ඖෂධීය පාන වර්ග සඳහා සෑදීමට සුදුසුය.'
        }, 
        basePriceUSD: 12 
      },
      { 
        name: 'Ginger Essential Oil', 
        desc: {
          EN: 'Pure steam-distilled ginger root essential oil. Rich in bioactive gingerols. Heavily used in aroma therapies, cosmetics, and wellness supplements.',
          SI: 'හුමාල ආසවනයෙන් නිස්සාරණය කරන ලද 100% පිරිසිදු ඉඟුරු තෙල්. ආලේපන සහ සුවඳ විලවුන් නිෂ්පාදනය සඳහා බහුලව යොදාගනී.'
        }, 
        basePriceUSD: 35 
      },
      { 
        name: 'Fresh Green Ginger', 
        desc: {
          EN: 'Freshly harvested local ginger rhizomes. Juicy, fibrous, and packed with zesty flavor. Best for immediate kitchen prep and juice extracts.',
          SI: 'අලුතින්ම නෙලාගත් නැවුම් අමු ඉඟුරු. යුෂ පිරුණු, ප්‍රබල සැර සහ ගුණාත්මක බවින් ඉහළම දේශීය ඉඟුරු වේ.'
        }, 
        basePriceUSD: 6 
      },
    ],
    certifications: ['USDA Organic', 'SLS Certified', 'ISO 22000'],
  },
  {
    id: 'naimiris',
    name: 'Hot Dragon Nai Miris',
    sinhala: 'නයි මිරිස්',
    tagline: 'Fierce Cobra Heat & Exotic Fruity Aroma',
    description: {
      EN: 'Known as the "Cobra Chilli" (Capsicum chinense), Sri Lankan Nai Miris delivers a legendary slow-burning sting ranging between 100,000 and 350,000+ SHU. Beyond its fiery heat, it carries a signature sweet, fruity aroma that makes it irreplaceable in authentic island sambols and hot sauces.',
      SI: 'ශ්‍රී ලංකාවේ වඩාත්ම සැරැති මිරිස් වර්ගයක් වන නයි මිරිස් (Capsicum chinense) එහි ඇති සුවිශේෂී පළතුරු සුවඳ සහ දිව දවනා සැර (Scoville Heat: 100,000 - 350,000+) නිසා ලොව පුරා ප්‍රසිද්ධය. මෙය සාම්ප්‍රදායික සම්බෝල සහ සැර සෝස් වර්ග සඳහා අත්‍යවශ්‍ය වේ.'
    },
    image: naimirisProduct,
    color: 'var(--clr-naimiris)',
    grades: [
      { 
        name: 'Fresh Cobra Pods', 
        desc: {
          EN: 'Hand-picked ripe red Nai Miris pods. Extremely hot, juicy, and packed with fruity aroma. Shipped under cold chain to preserve freshness.',
          SI: 'නැවුම්ව අතින් නෙලාගත් රතු පැහැති නයි මිරිස් කරල්. ඉතා සැර වන අතර නැවුම් බව සුරක්ෂිත වන සේ ඇසුරුම් කර ඇත.'
        }, 
        basePriceUSD: 24 
      },
      { 
        name: 'Dragon Fire Flakes', 
        desc: {
          EN: 'Coarsely crushed sun-dried red chilies. Adds a high-impact heat and deep aroma to pizza, curries, and dry rubs.',
          SI: 'වියළන ලද නයි මිරිස් කෑලි. ඕනෑම ආහාරයකට ඉහළ සැරක් සහ රසයක් එක් කර ගැනීම සඳහා කදිම වේ.'
        }, 
        basePriceUSD: 18 
      },
      { 
        name: 'Cobra Chili Powder', 
        desc: {
          EN: 'Pure ground red Nai Miris. Fine texture, fiery orange-red color. Extremely potent — handle with care.',
          SI: 'වියළා අඹරන ලද පිරිසිදු නයි මිරිස් කුඩු. අධික සැරකින් යුක්ත වන බැවින් භාවිතයේදී ප්‍රවේශම් වන්න.'
        }, 
        basePriceUSD: 14 
      },
      { 
        name: 'Dragon Sauce Base', 
        desc: {
          EN: 'Concentrated mash of red Nai Miris and organic sea salt. The perfect high-heat ingredient for artisanal hot sauce manufacturers.',
          SI: 'නයි මිරිස් සහ කාබනික මුහුදු ලුණු මිශ්‍ර කර සාදන ලද පේස්ට් වර්ගයක්. සැර සෝස් වර්ග නිෂ්පාදනය සඳහා කදිම අමුද්‍රව්‍යයකි.'
        }, 
        basePriceUSD: 20 
      },
    ],
    certifications: ['Organic Cert', 'HACCP', 'GMP Approved'],
  },
]

export default function Products({ buyerType, currency, language, addToCart }) {
  const [activeGradeIndex, setActiveGradeIndex] = useState({ ginger: 0, naimiris: 0 })
  const [quantities, setQuantities] = useState({ ginger: 10, naimiris: 10 }) // Default starting quantities in kg/Rs

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
                <div className="product-badge-overlay">{p.name === 'Ceylon Ginger' ? '100% True Ginger' : 'Dragon Heat Level'}</div>
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
