import React, { useEffect } from 'react'
import './Pages.css'

export default function ProductDetails({ language, products = [] }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const t = {
    EN: {
      title: "Technical & Market Specifications",
      subtitle: "The Science & Terroir of Ceylon Spice",
      intro: "Both Sri Lankan Ginger and Hot Dragon Nai Miris possess incredible, highly distinct chemical and sensory profiles due to Sri Lanka's unique soil chemistry and microclimates (terroir). Read below to explore what makes Ceylon products the ultimate premium choice for global buyers, along with our rigorous technical specifications.",
      specsHeader: "Technical Specifications"
    },
    SI: {
      title: "තාක්ෂණික සහ වෙළඳපල පිරිවිතර",
      subtitle: "ලංකා කුළුබඩු වල විද්‍යාව සහ භූගෝලීය වටිනාකම",
      intro: "ශ්‍රී ලංකාවේ සුවිශේෂී පාංශු රසායනය සහ ක්ෂුද්‍ර දේශගුණය (terroir) හේතුවෙන් ශ්‍රී ලාංකික ඉඟුරු සහ නයි මිරිස් ඉතා පැහැදිලි රසායනික හා සංවේදී පැතිකඩයන්ගෙන් යුක්ත වේ. ලෝක ව්‍යාප්ත ගැනුම්කරුවන් සඳහා ලංකා නිෂ්පාදන උසස්ම තේරීම වන්නේ ඇයිද යන්න සහ අපගේ තාක්ෂණික පිරිවිතර පහතින් දක්වා ඇත.",
      specsHeader: "තාක්ෂණික පිරිවිතර"
    }
  }[language]

  const activeProducts = products.filter(p => p.active)

  return (
    <div className="page-container animate-fade-in">
      <div className="container">
        <div className="page-header">
          <span className="section-label">{t.subtitle}</span>
          <h1 className="page-title">{t.title}</h1>
          <p className="page-intro">{t.intro}</p>
        </div>

        <div className="spec-grid">
          {activeProducts.map((p) => {
            const isNaimiris = p.id === 'naimiris'
            const isGinger = p.id === 'ginger'
            
            const titleClass = isNaimiris 
              ? 'spec-card-title-naimiris' 
              : (isGinger ? 'spec-card-title-ginger' : 'spec-card-title-generic')

            const customColorStyle = (isNaimiris || isGinger) 
              ? {} 
              : { color: p.color || 'var(--clr-gold)' }

            return (
              <div key={p.id} className="spec-card glass">
                <h2 className={titleClass} style={customColorStyle}>
                  {p.name} {p.sinhala ? `(${p.sinhala})` : ''}
                </h2>
                {p.description && <p className="spec-card-desc">{p.description[language]}</p>}
                
                {/* Persuasive Pitch Box */}
                {p.pitch && p.pitch.title && p.pitch.title[language] && (
                  <div className="spec-pitch-box">
                    <div className="spec-pitch-title">✨ {p.pitch.title[language]}</div>
                    <div className="spec-pitch-text">{p.pitch.text[language]}</div>
                  </div>
                )}

                <h3 style={{ color: 'var(--clr-forest)', fontSize: '1.2rem', marginBottom: '1rem', fontFamily: 'var(--ff-ui)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  📊 {t.specsHeader}
                </h3>
                
                {p.specifications && p.specifications.length > 0 ? (
                  <div className="spec-list">
                    {p.specifications.map((spec, i) => (
                      <div key={i} className="spec-item">
                        <span className="spec-label">{spec.label[language] || spec.label.EN}</span>
                        <span className="spec-value">{spec.value[language] || spec.value.EN}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontStyle: 'italic', color: 'var(--clr-muted)', fontSize: '0.9rem' }}>
                    No technical specifications provided yet.
                  </p>
                )}
              </div>
            )
          })}
          {activeProducts.length === 0 && (
            <div className="spec-card glass" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--clr-muted)' }}>
              No spice details available at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
