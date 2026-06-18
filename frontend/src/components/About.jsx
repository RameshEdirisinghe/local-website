import { useState } from 'react'
import './About.css'

export default function About({ buyerType, language }) {
  const [activeTab, setActiveTab] = useState('ceylon') // 'ceylon' or 'chinese'

  const t = {
    EN: {
      label: 'Our Story & Heritage',
      title: 'Rooted in the Spice Island',
      lead: "For generations, the fertile soil and tropical rains of southern Sri Lanka have nurtured the world's most exquisite spices. We carry forward this centuries-old legacy.",
      body1: 'Ceylon Ginger (Zingiber officinale) is prized globally for its rich flavor and higher concentration of active gingerols. Hand-harvested by local farming collectives, our ginger represents the pinnacle of premium, soil-to-shelf traceability.',
      body2: 'Our Hot Dragon Nai Miris is cultivated in agroforestry forest-gardens alongside organic tea and coffee, utilizing traditional polyculture methods. This unique ecosystem yields an unmatched heat combined with a signature sweet, fruity aroma.',
      vsTitle: 'Why Ceylon Ginger Matters',
      vsSubtitle: 'Click tabs to compare Ceylon Ginger with cheaper imported Chinese Ginger.',
      tabCeylon: 'True Ceylon Ginger',
      tabCassia: 'Common Chinese Ginger',
      origin: 'Origin',
      originValCey: 'Sri Lanka (100% Native)',
      originValCas: 'China, India, Peru',
      coumarin: 'Bioactive Compounds',
      coumarinValCey: 'Extremely high gingerol & shogaol content',
      coumarinValCas: 'Lower active compounds, often chemically treated',
      texture: 'Fiber & Texture',
      textureValCey: 'High fiber, small dense roots with intense oil sacs',
      textureValCas: 'Low fiber, large watery rhizomes with high water ratio',
      flavor: 'Flavor Profile',
      flavorValCey: 'Highly pungent, sweet, with hints of citrus and spice',
      flavorValCas: 'Mild, watery, flat flavor profile',
    },
    SI: {
      label: 'අපේ ඉතිහාසය සහ උරුමය',
      title: 'කුළුබඩු දූපතේ සැබෑ උරුමය',
      lead: 'පරම්පරා ගණනාවක් තිස්සේ දකුණු ලංකාවේ සාරවත් පස සහ නිවර්තන වර්ෂාව ලොව විශිෂ්ටතම කුළුබඩු වර්ධනයට මඟ පාදා ඇත. අපි එම උරුමය ඉදිරියට ගෙන යන්නෙමු.',
      body1: 'දේශීය ඉඟුරු (Zingiber officinale) එහි ඇති ඉහළ ජින්ජරෝල් සහ ෂෝගෝල් ප්‍රතිශතය නිසා සුවිශේෂී ගුණාත්මක බවින් ඉහළය. මෙය දේශීය ගොවි ජනතාව විසින් සාම්ප්‍රදායික ක්‍රම මඟින් වගා කරනු ලබයි.',
      body2: 'අපේ නයි මිරිස් වගා කරන්නේ තේ සහ කෝපි වැනි බෝග සමඟ මිශ්‍ර වගාවන් ලෙස වන අතර, එමඟින් ශ්‍රී ලංකාවේ නයි මිරිස්වලට ආවේණික වූ සුවිශේෂී සුවඳ සහ ප්‍රබල සැර (Scoville 350,000+) ලැබී ඇත.',
      vsTitle: 'දේශීය ඉඟුරු වල සැබෑ වටිනාකම',
      vsSubtitle: 'ලංකා ඉඟුරු සහ සාමාන්‍ය චීන ඉඟුරු අතර වෙනස පහතින් බලන්න.',
      tabCeylon: 'දේශීය ලංකා ඉඟුරු',
      tabCassia: 'සාමාන්‍ය චීන ඉඟුරු',
      origin: 'නිෂ්පාදිත රට',
      originValCey: 'ශ්‍රී ලංකාව (100% ආවේණික)',
      originValCas: 'චීනය, ඉන්දියාව, පේරු',
      coumarin: 'ඖෂධීය ගුණය',
      coumarinValCey: 'ඉහළ ජින්ජරෝල් ප්‍රතිශතය - දිනපතා භාවිතයට 100% සුදුසුයි',
      coumarinValCas: 'ඉතා අවම ඖෂධීය ගුණය, රසායනික ද්‍රව්‍ය අඩංගු විය හැක',
      texture: 'ව්‍යුහය සහ පෙනුම',
      textureValCey: 'සිහින්, කෙඳි සහිත, තෙල් ග්‍රන්ථි බහුල කුඩා අල',
      textureValCas: 'ඝන, විශාල ජල අධික කෙඳි රහිත අල',
      flavor: 'රසය සහ සුවඳ',
      flavorValCey: 'මිහිරි, තියුණු සැර සුවඳ, ලෙමන් රසයක් සහිතයි',
      flavorValCas: 'මෘදු, ජල අධික සරල රසය',
    },
  }[language]

  return (
    <section className="about-section" id="about">
      <div className="container about-grid">
        {/* Story Text Column */}
        <div className="about-text-col">
          <span className="section-label">{t.label}</span>
          <h2 className="about-title-large">{t.title}</h2>
          <p className="about-lead-text">{t.lead}</p>
          <div className="about-story-paragraphs">
            <p>{t.body1}</p>
            <p>{t.body2}</p>
          </div>

          <div className="heritage-stats-strip">
            <div className="heritage-badge">
              <span className="h-badge-icon">🇱🇰</span>
              <div>
                <strong>Ceylon Origin</strong>
                <p>100% Authenticity Guarantee</p>
              </div>
            </div>
            <div className="heritage-badge">
              <span className="h-badge-icon">🤝</span>
              <div>
                <strong>Ethical Sourcing</strong>
                <p>Fair Trade with Local Smallholder Farmers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Comparison Column */}
        <div className="about-comparison-col">
          <div className="comparison-card glass">
            <div className="comparison-header">
              <h3>{t.vsTitle}</h3>
              <p>{t.vsSubtitle}</p>
            </div>

            {/* Tabs */}
            <div className="comparison-tabs">
              <button
                className={`comp-tab-btn ${activeTab === 'ceylon' ? 'comp-tab-btn--ceylon' : ''}`}
                onClick={() => setActiveTab('ceylon')}
              >
                {t.tabCeylon}
              </button>
              <button
                className={`comp-tab-btn ${activeTab === 'chinese' ? 'comp-tab-btn--chinese' : ''}`}
                onClick={() => setActiveTab('chinese')}
              >
                {t.tabCassia}
              </button>
            </div>

            {/* Comparison Details Panel */}
            <div className="comparison-panel animate-fade-in" key={activeTab}>
              <div className="comp-row">
                <span className="comp-property">{t.origin}</span>
                <span className="comp-val">
                  {activeTab === 'ceylon' ? t.originValCey : t.originValCas}
                </span>
              </div>
              <div className="comp-row">
                <span className="comp-property">{t.coumarin}</span>
                <span className={`comp-val ${activeTab === 'ceylon' ? 'val-safe' : 'val-unsafe'}`}>
                  {activeTab === 'ceylon' ? t.coumarinValCey : t.coumarinValCas}
                </span>
              </div>
              <div className="comp-row">
                <span className="comp-property">{t.texture}</span>
                <span className="comp-val">
                  {activeTab === 'ceylon' ? t.textureValCey : t.textureValCas}
                </span>
              </div>
              <div className="comp-row">
                <span className="comp-property">{t.flavor}</span>
                <span className="comp-val">
                  {activeTab === 'ceylon' ? t.flavorValCey : t.flavorValCas}
                </span>
              </div>
            </div>

            {/* Sticky warning warning badge for chinese */}
            {activeTab === 'chinese' ? (
              <div className="alert-box alert-box--warning">
                <strong>⚠️ Consumer Tip:</strong> Chinese or imported ginger is often grown in mass industrial soils with chemical fertilizers, resulting in high water content and a diluted, flat flavor.
              </div>
            ) : (
              <div className="alert-box alert-box--success">
                <strong>🌿 Health Tip:</strong> Ceylon Ginger contains significantly higher concentrations of active gingerols, which act as powerful anti-inflammatory and digestive aids with zero chemical enhancers.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
