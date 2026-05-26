import React, { useEffect } from 'react'
import './Pages.css'

export default function ProductDetails({ language }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const t = {
    EN: {
      title: "Technical & Market Specifications",
      subtitle: "The Science & Terroir of Ceylon Spice",
      intro: "Both Sri Lankan Ginger and Hot Dragon Nai Miris possess incredible, highly distinct chemical and sensory profiles due to Sri Lanka’s unique soil chemistry and microclimates (terroir). Read below to explore what makes Ceylon products the ultimate premium choice for global buyers, along with our rigorous technical specifications.",
      
      naiMirisTitle: "1. Sri Lankan Nai Miris (Capsicum chinense / Habanero)",
      naiMirisDesc: "Locally renowned for its blistering heat and deep aroma, Nai Miris is biologically classified as a local morphotype of the Habanero family. Recent agronomic screenings in Sri Lanka have begun isolating specific unnamed local strains to formalize them for international trade.",
      naiMirisPitchTitle: "Why Choose Ceylon Nai Miris?",
      naiMirisPitch: "Unlike mass-market chillies that deliver flat, stinging heat, Ceylon Nai Miris offers a complex sensory explosion. It pairs its intense, high-concentration capsaicin (150k–350k SHU) with delicate, delayed undertones of tropical citrus and smoky fruitiness. Grown in Matale's unique microclimates and certified organic collectives, our Nai Miris provides exceptional oil extraction yields and clean, pesticide-free profiles that pass the strictest global food standards. It is the ultimate differentiator for premium hot sauces, spice blends, and luxury culinary applications.",
      
      gingerTitle: "2. Sri Lankan Ginger (Zingiber officinale)",
      gingerDesc: "Unlike bulk-produced ginger, Sri Lankan ginger thrives in specific agro-ecological zones (like Kurunegala and Kandy) and offers superior pungency and oleoresin yields.",
      gingerPitchTitle: "Why Choose Ceylon Local Ginger?",
      gingerPitch: "Ceylon Local Ginger is the crown jewel of ginger cultivars. Physically smaller and highly concentrated, it contains a significantly higher ratio of natural oleoresin and active [6]-gingerol compared to bulky water-rich Chinese or Indian varieties. This yields an intensely fiery, aromatic, and woody flavor with deep therapeutic value. Cultivated sustainably by smallholder farmer collectives under GlobalG.A.P. standards, our ginger guarantees maximum flavor extraction with absolute pesticide-free purity. A perfect fit for gourmet food formulation, high-end confectionery, organic teas, and premium botanical brewing.",

      specsHeader: "Technical Specifications",
      naiMirisSpecs: [
        { label: "Heat Level (SHU)", value: "150,000 – 350,000 Scoville Heat Units" },
        { label: "Sensory Profile", value: "Intense, delayed heat with distinct fruity, citrus, and slightly smoky undertones." },
        { label: "Morphology", value: "Folded, slightly wrinkled pods, turning vibrant red, orange, or sometimes chocolate when mature." },
        { label: "Average Export Weight", value: "8.4g – 8.56g per pod" }
      ],
      gingerSpecs: [
        { label: "Cultivars", value: "Local (highly pungent, fibrous), Chinese (large, low fiber), Rangoon (medium)." },
        { label: "Key Advantage", value: "Extremely high [6]-gingerol content in 'Local Ginger'." },
        { label: "Moisture Target", value: "Around 12% for export-grade dried ginger." },
        { label: "Market Position", value: "Premium value-added (flakes, essential oils, organic powders)." }
      ]
    },
    SI: {
      title: "තාක්ෂණික සහ වෙළඳපල පිරිවිතර",
      subtitle: "ලංකා කුළුබඩු වල විද්‍යාව සහ භූගෝලීය වටිනාකම",
      intro: "ශ්‍රී ලංකාවේ සුවිශේෂී පාංශු රසායනය සහ ක්ෂුද්‍ර දේශගුණය (terroir) හේතුවෙන් ශ්‍රී ලාංකික ඉඟුරු සහ නයි මිරිස් ඉතා පැහැදිලි රසායනික හා සංවේදී පැතිකඩයන්ගෙන් යුක්ත වේ. ලෝක ව්‍යාප්ත ගැනුම්කරුවන් සඳහා ලංකා නිෂ්පාදන උසස්ම තේරීම වන්නේ ඇයිද යන්න සහ අපගේ තාක්ෂණික පිරිවිතර පහතින් දක්වා ඇත.",
      
      naiMirisTitle: "1. ශ්‍රී ලාංකික නයි මිරිස් (Capsicum chinense / Habanero)",
      naiMirisDesc: "එහි දැඩි සැර සහ ගැඹුරු සුවඳ සඳහා දේශීයව ප්‍රසිද්ධ නයි මිරිස්, ජාත්‍යන්තර වෙළඳාම සඳහා විධිමත් කිරීම ආරම්භ කර ඇති හබනෙරෝ පවුලට අයත් දේශීය විශේෂයකි.",
      naiMirisPitchTitle: "ලංකා නයි මිරිස් තෝරාගත යුත්තේ ඇයි?",
      naiMirisPitch: "සාමාන්‍ය වෙළඳපල මිරිස් මෙන් නොව, ලංකා නයි මිරිස් දැඩි සැර (150k–350k SHU) සමඟ පැඟිරි සහ පලතුරු සුවඳක් එක් කරයි. මාතලේ සුවිශේෂී දේශගුණය තුළ වගා කර ඇති අපගේ නයි මිරිස්, ගෝලීය ආහාර ප්‍රමිතීන්ට ගැලපෙන ලෙස පලිබෝධනාශක වලින් තොරව සකසා ඇත. එය උසස් තත්ත්වයේ හොට් සෝස් සහ කුළුබඩු මිශ්‍රණ සඳහා අත්‍යවශ්‍ය වේ.",
      
      gingerTitle: "2. ශ්‍රී ලාංකික ඉඟුරු (Zingiber officinale)",
      gingerDesc: "තොග වශයෙන් නිපදවන ඉඟුරු මෙන් නොව, ශ්‍රී ලාංකික ඉඟුරු කුරුණෑගල සහ මහනුවර වැනි කෘෂි පාරිසරික කලාපවල ඉතා හොඳින් වැඩෙන අතර ඉහළ සැර සහ ගුණාත්මක බවින් යුක්ත වේ.",
      gingerPitchTitle: "දේශීය ලංකා ඉඟුරු තෝරාගත යුත්තේ ඇයි?",
      gingerPitch: "දේශීය ලංකා ඉඟුරු යනු ඉඟුරු ප්‍රභේද අතර ඇති විශිෂ්ටතම ප්‍රභේදයයි. ප්‍රමාණයෙන් කුඩා වුවද, චීන හෝ ඉන්දියානු ප්‍රභේදවලට වඩා ඉහළ ක්‍රියාකාරී [6]-ජින්ජරෝල් ප්‍රමාණයක් මෙහි අඩංගු වේ. මෙය සුවිශේෂී සුවඳක් සහ සෞඛ්‍යමය වටිනාකමක් ගෙනදෙයි. GlobalG.A.P. ප්‍රමිතීන්ට අනුව කාබනිකව වගා කරන අපගේ ඉඟුරු, වෛද්‍ය සහ රසකැවිලි නිෂ්පාදන සඳහා ඉහළම ගුණාත්මක බව සහතික කරයි.",

      specsHeader: "තාක්ෂණික පිරිවිතර",
      naiMirisSpecs: [
        { label: "සැර මට්ටම (SHU)", value: "150,000 – 350,000" },
        { label: "සංවේදී පැතිකඩ", value: "පලතුරු, පැඟිරි සහ මඳ දුම් සුවඳක් සහිත දැඩි සැර." },
        { label: "ස්වභාවය", value: "රැලි සහිත, පරිණත වූ විට දීප්තිමත් රතු හෝ තැඹිලි පැහැයට හැරෙන කරල්." },
        { label: "සාමාන්‍ය බර", value: "කරලක් ග්‍රෑම් 8.4 – 8.56" }
      ],
      gingerSpecs: [
        { label: "ප්‍රභේද", value: "දේශීය (ඉහළ සැර, තන්තුමය), චීන (විශාල, අඩු තන්තු), රන්ගූන් (මධ්‍යම)." },
        { label: "ප්‍රධාන වාසිය", value: "'දේශීය ඉඟුරු' වල ඉතා ඉහළ [6]-ජින්ජරෝල් අන්තර්ගතය." },
        { label: "තෙතමනය ඉලක්කය", value: "අපනයන මට්ටමේ වියළි ඉඟුරු සඳහා 12% පමණ." },
        { label: "වෙඳපොළ ස්ථානය", value: "ඉහළ වටිනාකමක් එකතු කළ (flakes, අත්‍යවශ්‍ය තෙල්, කාබනික කුඩු)." }
      ]
    }
  }[language]

  return (
    <div className="page-container animate-fade-in">
      <div className="container">
        <div className="page-header">
          <span className="section-label">{t.subtitle}</span>
          <h1 className="page-title">{t.title}</h1>
          <p className="page-intro">{t.intro}</p>
        </div>

        <div className="spec-grid">
          
          {/* Nai Miris Card */}
          <div className="spec-card glass">
            <h2 className="spec-card-title-naimiris">
              {t.naiMirisTitle}
            </h2>
            <p className="spec-card-desc">{t.naiMirisDesc}</p>
            
            {/* Persuasive Pitch Box */}
            <div className="spec-pitch-box">
              <div className="spec-pitch-title">✨ {t.naiMirisPitchTitle}</div>
              <div className="spec-pitch-text">{t.naiMirisPitch}</div>
            </div>

            <h3 style={{ color: 'var(--clr-forest)', fontSize: '1.2rem', marginBottom: '1rem', fontFamily: 'var(--ff-ui)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              📊 {t.specsHeader}
            </h3>
            <div className="spec-list">
              {t.naiMirisSpecs.map((spec, i) => (
                <div key={i} className="spec-item">
                  <span className="spec-label">{spec.label}</span>
                  <span className="spec-value">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ginger Card */}
          <div className="spec-card glass">
            <h2 className="spec-card-title-ginger">
              {t.gingerTitle}
            </h2>
            <p className="spec-card-desc">{t.gingerDesc}</p>
            
            {/* Persuasive Pitch Box */}
            <div className="spec-pitch-box">
              <div className="spec-pitch-title">✨ {t.gingerPitchTitle}</div>
              <div className="spec-pitch-text">{t.gingerPitch}</div>
            </div>

            <h3 style={{ color: 'var(--clr-forest)', fontSize: '1.2rem', marginBottom: '1rem', fontFamily: 'var(--ff-ui)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              📊 {t.specsHeader}
            </h3>
            <div className="spec-list">
              {t.gingerSpecs.map((spec, i) => (
                <div key={i} className="spec-item">
                  <span className="spec-label">{spec.label}</span>
                  <span className="spec-value">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
