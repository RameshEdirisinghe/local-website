import { useState } from 'react'
import './About.css'

export default function About({ buyerType, language }) {
  const [activeTab, setActiveTab] = useState('ceylon') // 'ceylon' or 'cassia'

  const t = {
    EN: {
      label: 'Our Story & Heritage',
      title: 'Rooted in the Spice Island',
      lead: "For generations, the fertile soil and tropical rains of southern Sri Lanka have nurtured the world's most exquisite spices. We carry forward this centuries-old legacy.",
      body1: 'Ceylon cinnamon (Cinnamomum verum) is the only true cinnamon. Discovered and traded by early Arab merchants and later fought over by European colonial powers, it remains the gold standard of culinary spices.',
      body2: 'Our pepper is grown in forest-gardens alongside tea, coffee, and cocoa, using traditional agroforestry methods. This polyculture method gives Ceylon Black Pepper its uniquely intense, complex piperine heat.',
      vsTitle: 'Why "True" Ceylon Cinnamon Matters',
      vsSubtitle: 'Click tabs to compare Ceylon Cinnamon with cheaper Cassia Cinnamon.',
      tabCeylon: 'True Ceylon Cinnamon',
      tabCassia: 'Common Cassia Cinnamon',
      origin: 'Origin',
      originValCey: 'Sri Lanka (100% Native)',
      originValCas: 'China, Indonesia, Vietnam',
      coumarin: 'Coumarin Content (Toxicity)',
      coumarinValCey: 'Trace levels (<0.004%) - Safe for daily health use',
      coumarinValCas: 'High levels (up to 5%) - Potentially toxic to liver',
      texture: 'Texture & Quill Structure',
      textureValCey: 'Soft, multi-layered paper quills, hand-rolled',
      textureValCas: 'Thick, hard bark quills, hollow inside',
      flavor: 'Flavor Profile',
      flavorValCey: 'Sweet, delicate, complex, with citrus notes',
      flavorValCas: 'Sharp, spicy, direct, flat flavor',
    },
    SI: {
      label: 'අපේ ඉතිහාසය සහ උරුමය',
      title: 'කුළුබඩු දූපතේ සැබෑ උරුමය',
      lead: 'පරම්පරා ගණනාවක් තිස්සේ දකුණු ලංකාවේ සාරවත් පස සහ නිවර්තන වර්ෂාව ලොව විශිෂ්ටතම කුළුබඩු වර්ධනයට මඟ පාදා ඇත. අපි එම උරුමය ඉදිරියට ගෙන යන්නෙමු.',
      body1: 'සැබෑ කුරුඳු (Cinnamomum verum) ලෙස හඳුන්වන්නේ ලංකාවේ කුරුඳු පමණි. පැරණි අරාබි වෙළඳුන් සහ යුරෝපීය ජාතීන් මෙරටට ආකර්ෂණය වූ ප්‍රධාන හේතුව ද මෙයයි.',
      body2: 'අපේ ගම්මිරිස් වගා කරන්නේ තේ, කෝපි සහ කොකෝවා වැනි බෝග සමඟ මිශ්‍ර වගාවන් ලෙස වන අතර, එමඟින් ශ්‍රී ලංකාවේ ගම්මිරිස්වලට ආවේණික වූ ප්‍රබල සැර සහ ගුණාත්මක බව ලැබී ඇත.',
      vsTitle: 'සැබෑ ලංකා කුරුඳුවල වටිනාකම',
      vsSubtitle: 'ලංකා කුරුඳු සහ සාමාන්‍ය කැසියා කුරුඳු අතර වෙනස පහතින් බලන්න.',
      tabCeylon: 'සැබෑ ලංකා කුරුඳු',
      tabCassia: 'සාමාන්‍ය කැසියා කුරුඳු',
      origin: 'නිෂ්පාදිත රට',
      originValCey: 'ශ්‍රී ලංකාව (100% ආවේණික)',
      originValCas: 'චීනය, ඉන්දුනීසියාව, වියට්නාමය',
      coumarin: 'කූමරින් ප්‍රතිශතය (විෂ සහිත බව)',
      coumarinValCey: 'ඉතා අවම (<0.004%) - දිනපතා භාවිතයට 100% සුරක්ෂිතයි',
      coumarinValCas: 'ඉතා අධිකයි (5% දක්වා) - අක්මාවට අහිතකර විය හැක',
      texture: 'ව්‍යුහය සහ පෙනුම',
      textureValCey: 'සිහින්, බහු-ස්ථර කඩදාසි මෙන් අතින් රෝල් කරන ලද කූරු',
      textureValCas: 'ඝන, ඉතා දැඩි, මැද හිස් තනි පොත්තක් වැනි කූරු',
      flavor: 'රසය සහ සුවඳ',
      flavorValCey: 'මිහිරි, මෘදු, සුවඳවත්, පළතුරු රසයක් සහිතයි',
      flavorValCas: 'තියුණු, තද සැර සහිත, සරල රසය',
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
                <p>Fair Trade with Local Peeler Families</p>
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
                className={`comp-tab-btn ${activeTab === 'cassia' ? 'comp-tab-btn--cassia' : ''}`}
                onClick={() => setActiveTab('cassia')}
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

            {/* Sticky warning warning badge for cassia */}
            {activeTab === 'cassia' ? (
              <div className="alert-box alert-box--warning">
                <strong>⚠️ Consumer Tip:</strong> Cassia is often mislabeled as "cinnamon" in supermarkets because it is cheaper, but it does not have the health benefits of true Ceylon cinnamon and can be toxic in large amounts due to high Coumarin content.
              </div>
            ) : (
              <div className="alert-box alert-box--success">
                <strong>🌿 Health Tip:</strong> True Ceylon Cinnamon contains compounds that aid blood sugar regulation and are packed with rich antioxidants, with absolutely zero toxicity risks.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
