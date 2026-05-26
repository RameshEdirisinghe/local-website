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
      intro: "Both Nai Miris (Sri Lankan Habanero) and Sri Lankan Ginger possess incredible, highly distinct chemical and sensory profiles due to Sri Lanka’s unique soil chemistry and microclimates (terroir). However, their positions in the global export market are vastly different. While ginger acts as a boutique competitor to massive producers like China, Nai Miris serves a high-value niche market targeting extreme heat and premium organic processing.",
      naiMirisTitle: "1. Sri Lankan Nai Miris (Capsicum chinense / Habanero)",
      naiMirisDesc: "Locally renowned for its blistering heat and deep aroma, Nai Miris is biologically classified as a local morphotype of the Habanero family. Recent agronomic screenings in Sri Lanka have begun isolating specific unnamed local strains to formalize them for international trade.",
      naiMirisSpecs: [
        { label: "Heat Level (SHU)", value: "150,000 – 350,000 Scoville Heat Units" },
        { label: "Sensory Profile", value: "Intense, delayed heat with distinct fruity, citrus, and slightly smoky undertones." },
        { label: "Morphology", value: "Folded, slightly wrinkled pods, turning vibrant red, orange, or sometimes chocolate when mature." },
        { label: "Average Export Weight", value: "8.4g – 8.56g per pod" }
      ],
      gingerTitle: "2. Sri Lankan Ginger (Zingiber officinale)",
      gingerDesc: "Unlike bulk-produced ginger, Sri Lankan ginger thrives in specific agro-ecological zones (like Kurunegala and Kandy) and offers superior pungency and oleoresin yields.",
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
      intro: "ශ්‍රී ලංකාවේ සුවිශේෂී පාංශු රසායනය සහ ක්ෂුද්‍ර දේශගුණය (terroir) හේතුවෙන් නයි මිරිස් සහ දේශීය ඉඟුරු යන දෙකම ඉතා පැහැදිලි රසායනික හා සංවේදී පැතිකඩයන්ගෙන් යුක්ත වේ. ඉඟුරු චීනය වැනි දැවැන්ත නිෂ්පාදකයින්ට එරෙහිව තරඟ කරන අතර, නයි මිරිස් ඉහළ වටිනාකමකින් යුත් කාබනික වෙළඳපල ඉලක්ක කරයි.",
      naiMirisTitle: "1. ශ්‍රී ලාංකික නයි මිරිස්",
      naiMirisDesc: "එහි දැඩි සැර සහ ගැඹුරු සුවඳ සඳහා දේශීයව ප්‍රසිද්ධ නයි මිරිස්, ජාත්‍යන්තර වෙළඳාම සඳහා විධිමත් කිරීම ආරම්භ කර ඇත.",
      naiMirisSpecs: [
        { label: "සැර මට්ටම (SHU)", value: "150,000 – 350,000" },
        { label: "සංවේදී පැතිකඩ", value: "පලතුරු, පැඟිරි සහ මඳ දුම් සුවඳක් සහිත දැඩි සැර." },
        { label: "ස්වභාවය", value: "රැලි සහිත, පරිණත වූ විට දීප්තිමත් රතු හෝ තැඹිලි පැහැයට හැරෙන කරල්." },
        { label: "සාමාන්‍ය බර", value: "කරලක් ග්‍රෑම් 8.4 – 8.56" }
      ],
      gingerTitle: "2. ශ්‍රී ලාංකික ඉඟුරු",
      gingerDesc: "තොග වශයෙන් නිපදවන ඉඟුරු මෙන් නොව, ශ්‍රී ලාංකික ඉඟුරු කුරුණෑගල සහ මහනුවර වැනි කෘෂි පාරිසරික කලාපවල ඉතා හොඳින් වැඩෙන අතර ඉහළ ගුණාත්මක බවින් යුක්ත වේ.",
      gingerSpecs: [
        { label: "ප්‍රභේද", value: "දේශීය (ඉහළ සැර, තන්තුමය), චීන (විශාල, අඩු තන්තු), රන්ගූන් (මධ්‍යම)." },
        { label: "ප්‍රධාන වාසිය", value: "'දේශීය ඉඟුරු' වල ඉතා ඉහළ [6]-ජින්ජරෝල් අන්තර්ගතය." },
        { label: "තෙතමනය ඉලක්කය", value: "අපනයන මට්ටමේ වියළි ඉඟුරු සඳහා 12% පමණ." },
        { label: "වෙළඳපල ස්ථානය", value: "ඉහළ වටිනාකමක් එකතු කළ (flakes, අත්‍යවශ්‍ය තෙල්, කාබනික කුඩු)." }
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
          
          <div className="spec-card glass">
            <h2 className="spec-card-title-naimiris">
              {t.naiMirisTitle}
            </h2>
            <p className="spec-card-desc">{t.naiMirisDesc}</p>
            <div className="spec-list">
              {t.naiMirisSpecs.map((spec, i) => (
                <div key={i} className="spec-item">
                  <span className="spec-label">{spec.label}</span>
                  <span className="spec-value">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="spec-card glass">
            <h2 className="spec-card-title-ginger">
              {t.gingerTitle}
            </h2>
            <p className="spec-card-desc">{t.gingerDesc}</p>
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
