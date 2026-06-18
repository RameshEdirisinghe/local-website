import React, { useEffect } from 'react'
import './Pages.css'
import companyLogo from '../assets/images/company_logo.jpeg'

export default function AboutCompany({ language }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const t = {
    EN: {
      overline: 'B2B Spice Exporter · Est. 2008',
      title: 'Our Company',
      subtitle: 'Boutique Heritage & Global Vision',
      tagline:
        "Bridging Sri Lanka's high-pungency spice collectives with global B2B culinary & medicinal markets since 2008.",

      visionTitle: 'Our Vision',
      visionText:
        "To elevate Sri Lanka's premium agricultural heritage to the pinnacle of the global luxury spice market, defining new standards in terroir preservation, ethical sourcing, and bio-active purity.",
      missionTitle: 'Our Mission',
      missionText:
        'To build transparent, high-value supply lines directly connecting highland organic smallholder collectives with global B2B culinary and therapeutic innovators, ensuring fair compensation and zero chemical footprint.',

      stats: [
        { val: 'Est. 2008', lbl: 'Heritage Cultivation' },
        { val: '100%',      lbl: 'Traceable Farm to Shelf' },
        { val: 'G.A.P.',   lbl: 'GlobalG.A.P. Certified' },
        { val: 'Organic',  lbl: 'Zero Chemical Footprint' },
      ],

      timelineTitle: 'The Farm-to-Export B2B Journey',
      timelineSubtitle: 'Meticulous quality tracking at every micro-phase',
      timelineSteps: [
        { phase: 'Terroir Selection',  icon: '🗻', metric: 'Matale Terroir Map',    desc: 'We select microclimates in Matale and Kandy highlands featuring optimal mountain rain and iron-rich volcanic soils.' },
        { phase: 'Ethical Harvest',    icon: '🤝', metric: 'Fair-Trade Direct',     desc: 'Collectives of smallholder families hand-pick matured red Cobra pods and fresh ginger roots at dawn.' },
        { phase: 'Phytosanitary Sort', icon: '🔬', metric: 'Zero Pesticides (EU)', desc: 'Sterile facilities wash and grade spices to pass strict North American and EU microbiological tests.' },
        { phase: 'Value-Added Prep',   icon: '⚙️', metric: 'High Oleoresin Yield', desc: 'Slow-dehydration, high-yield active oil extractions, or custom sauce mashing tailored to B2B specs.' },
        { phase: 'Cold Chain Export',  icon: '📦', metric: 'Traceable Logistics',  desc: 'Airtight, temperature-monitored vacuum packing preserves maximum capsaicin and volatile oils during ocean export.' },
      ],

      contentTitle: 'Our B2B Value Proposition',
      content: [
        {
          heading: 'A Boutique Export Competitor',
          icon: '🏆',
          text: 'While global giants dominate bulk spice markets, Shorewin Agri positions itself as a boutique competitor. We do not chase immense volumes; instead, we target high-value niche markets that demand extreme quality, unique terroir profiles, and premium organic processing.',
        },
        {
          heading: 'GlobalG.A.P. & Certified Organic Sourcing',
          icon: '🌿',
          text: 'For B2B contracts, particularly in European and North American markets, adhering to GlobalG.A.P. and Certified Organic standards is practically mandatory. We source strictly from collectives that meet these rigorous certifications, ensuring every shipment passes strict phytosanitary hurdles with zero synthetic pesticide residues.',
        },
        {
          heading: 'Value-Added Processing',
          icon: '✨',
          text: 'To maximize the inherent value of Sri Lankan spices like our Local Ginger and Nai Miris, our facilities focus on value-added formats. This includes meticulously dehydrated flakes, specialized hot sauces, oleoresin extractions, and premium organic powders designed for culinary and medicinal industries worldwide.',
        },
      ],
    },

    SI: {
      overline: 'B2B අපනයනකරු · ඇරඹුම 2008',
      title: 'අපේ සමාගම',
      subtitle: 'දේශීය උරුමය සහ ගෝලීය දැක්ම',
      tagline:
        '2008 වසරේ සිට ශ්‍රී ලංකාවේ ඉහළම සැර කුළුබඩු වගාවන් ගෝලීය B2B සූපශාස්ත්‍ර හා ඖෂධ වෙළඳපොල සමඟ සම්බන්ධ කිරීම.',

      visionTitle: 'අපේ දැක්ම',
      visionText:
        'ශ්‍රී ලංකාවේ විශිෂ්ටතම කෘෂිකාර්මික උරුමය ගෝලීය සුඛෝපභෝගී කුළුබඩු වෙළඳපොළේ ඉහළම තලයට ඔසවා තැබීම සහ කාබනික පිරිසිදුභාවය සඳහා නව ප්‍රමිතීන් බිහි කිරීම.',
      missionTitle: 'අපේ මෙහෙවර',
      missionText:
        'කඳුකරයේ කාබනික ගොවි එකමුතුවන් ගෝලීය B2B වෙළඳපොල සමඟ සෘජුව සම්බන්ධ කරන විනිවිද පෙනෙන සැපයුම් දාමයක් ගොඩනැගීම සහ ගොවීන්ට සාධාරණ මිලක් ලබා දීම.',

      stats: [
        { val: '2008',    lbl: 'කුළුබඩු උරුමය' },
        { val: '100%',    lbl: 'නිරීක්ෂණය කළ හැකි' },
        { val: 'G.A.P.',  lbl: 'යුරෝපීය B2B ප්‍රමිති' },
        { val: 'කාබනික', lbl: 'රසායනික නොමැති' },
      ],

      timelineTitle: 'වතුයායේ සිට අපනයනය දක්වා B2B ගමන',
      timelineSubtitle: 'සෑම සියුම් පියවරකදීම දැඩි ගුණාත්මක තත්ත්ව පරීක්ෂාවන්',
      timelineSteps: [
        { phase: 'භූමි තේරීම',         icon: '🗻', metric: 'මාතලේ භූමිය',       desc: 'මාතලේ සහ මහනුවර කඳුකර ප්‍රදේශ වල පවතින සාරවත් පස සහ ස්වාභාවික වැසි ජලයෙන් පෝෂණය වන වතුයායන් තෝරා ගැනීම.' },
        { phase: 'සාධාරණ අස්වැන්න',    icon: '🤝', metric: 'සෘජු වෙළඳ',         desc: 'කුඩා පරිමාණ ගොවි පවුල් එකමුතුව මගින් අලුයම් කාලයේදී නැවුම් නයි මිරිස් කරල් සහ ඉඟුරු අතින් නෙලා ගැනීම.' },
        { phase: 'සෞඛ්‍යාරක්ෂිත වර්ග', icon: '🔬', metric: 'කෘමිනාශක නැත',      desc: 'යුරෝපීය සහ උතුරු ඇමරිකානු සෞඛ්‍ය ප්‍රමිතීන්ට අනුව බැක්ටීරියා සහ අපද්‍රව්‍ය වලින් තොරව පිරිසිදු කර වර්ග කිරීම.' },
        { phase: 'සැකසුම් ක්‍රම',       icon: '⚙️', metric: 'ඔලියෝරෙසින් ඉහළ',   desc: 'B2B අවශ්‍යතාවයන්ට අනුව වියළන ලද කැබලි, ඉහළ සාරවත් තෙල් වර්ග හෝ සෝස් වර්ග ලෙස සකස් කිරීම.' },
        { phase: 'ශීතල අපනයන',         icon: '📦', metric: 'නිරීක්ෂිත සැපයුම',  desc: 'අපනයනය කිරීමේදී උපරිම සැර සහ සුවඳ ආරක්ෂා වන පරිදි වාතය රහිතව උෂ්ණත්ව පාලනය යටතේ ඇසුරුම් කිරීම.' },
      ],

      contentTitle: 'අපගේ B2B සේවා වටිනාකම',
      content: [
        {
          heading: 'සුවිශේෂී අපනයනකරුවෙක්',
          icon: '🏆',
          text: 'ගෝලීය දැවැන්තයින් තොග කුළුබඩු වෙළඳපොලවල් ආධිපත්‍යය දරන අතර, අපගේ සමාගම සුවිශේෂී තරඟකරුවෙකු ලෙස ස්ථානගත වේ. අපි ඉහළ වටිනාකමකින් යුත් කාබනික වෙළඳපල ඉලක්ක කරමු.',
        },
        {
          heading: 'කාබනික ප්‍රමිතිකරණය (GlobalG.A.P.)',
          icon: '🌿',
          text: 'B2B ගිවිසුම් සඳහා, විශේෂයෙන්ම යුරෝපීය සහ උතුරු ඇමරිකානු වෙළෙඳපොළ තුළ, GlobalG.A.P. සහ කාබනික ප්‍රමිතීන් පිළිපැදීම අනිවාර්ය වේ. අපි මෙම දැඩි සහතික සපුරාලන ගොවීන්ගෙන් පමණක් අපගේ නිෂ්පාදන ලබා ගනිමු.',
        },
        {
          heading: 'අගය එකතු කළ නිෂ්පාදන සැකසුම්',
          icon: '✨',
          text: 'ශ්‍රී ලාංකික කුළුබඩුවල සහජ වටිනාකම උපරිම කිරීම සඳහා, අපගේ පහසුකම් අගය එකතු කළ ආකෘති කෙරෙහි අවධානය යොමු කරයි. ලොව පුරා සූපශාස්ත්‍ර හා ඖෂධ කර්මාන්ත සඳහා නිර්මාණය කර ඇති කාබනික කුඩු සහ සාරය මෙයට ඇතුළත් වේ.',
        },
      ],
    },
  }[language]

  return (
    <div className="page-container animate-fade-in">
      <div className="container">

        {/* ── HERO HEADER CARD ── */}
        <div className="ac-hero">
          {/* Left column: logo + cert badges */}
          <div className="ac-hero__left">
            <div className="ac-hero__logo-ring">
              <img src={companyLogo} alt="Shorewin Agri" className="ac-hero__logo" />
            </div>
            <div className="ac-hero__badges">
              <span className="ac-hero__badge">GlobalG.A.P.</span>
              <span className="ac-hero__badge">100% Organic</span>
              <span className="ac-hero__badge">EU Compliant</span>
            </div>
          </div>

          {/* Right column: text content */}
          <div className="ac-hero__right">
            <span className="ac-hero__overline">{t.overline}</span>
            <h1 className="ac-hero__title">{t.title}</h1>
            <p className="ac-hero__subtitle">{t.subtitle}</p>
            <p className="ac-hero__tagline">{t.tagline}</p>
          </div>

          {/* Decorative corner ornament */}
          <div className="ac-hero__ornament" aria-hidden="true">✦</div>
        </div>

        {/* ── KEY METRICS ── */}
        <div className="about-metrics-row">
          {t.stats.map((s, i) => (
            <div key={i} className="metric-cell">
              <span className="metric-val">{s.val}</span>
              <span className="metric-lbl">{s.lbl}</span>
            </div>
          ))}
        </div>

        {/* ── VISION & MISSION ── */}
        <div className="about-vm-section">
          <div className="about-vm-header">
            <span className="section-label">Core Principles</span>
            <h2 className="about-section-title">Where We Stand</h2>
          </div>
          <div className="about-vm-grid">

            <div className="vm-card vm-card--vision">
              <div className="vm-card__icon-wrap">
                <span className="vm-card__icon">👁️‍🗨️</span>
              </div>
              <div className="vm-card__body">
                <span className="vm-card__overline">Vision</span>
                <h3 className="vm-card__title">{t.visionTitle}</h3>
                <p className="vm-card__text">{t.visionText}</p>
              </div>
              <div className="vm-card__accent" />
            </div>

            <div className="vm-card vm-card--mission">
              <div className="vm-card__icon-wrap">
                <span className="vm-card__icon">🎯</span>
              </div>
              <div className="vm-card__body">
                <span className="vm-card__overline">Mission</span>
                <h3 className="vm-card__title">{t.missionTitle}</h3>
                <p className="vm-card__text">{t.missionText}</p>
              </div>
              <div className="vm-card__accent" />
            </div>

          </div>
        </div>

        {/* ── B2B PIPELINE ── */}
        <div className="about-pipeline-section">
          <div className="about-pipeline-header">
            <span className="section-label">B2B Supply Chain Purity</span>
            <h2 className="about-section-title">{t.timelineTitle}</h2>
            <p className="about-pipeline-sub">{t.timelineSubtitle}</p>
          </div>

          <div className="pipeline-track">
            {t.timelineSteps.map((step, idx) => (
              <div key={idx} className="pipeline-node">
                <div className="pipeline-node__card glass">
                  <div className="pipeline-node__top">
                    <span className="pipeline-node__num">0{idx + 1}</span>
                    <span className="pipeline-node__icon">{step.icon}</span>
                  </div>
                  <h4 className="pipeline-node__title">{step.phase}</h4>
                  <p className="pipeline-node__desc">{step.desc}</p>
                  <span className="pipeline-node__pill">{step.metric}</span>
                </div>
                {idx < t.timelineSteps.length - 1 && (
                  <div className="pipeline-connector">
                    <span className="pipeline-connector__line" />
                    <span className="pipeline-connector__arrow">›</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── VALUE PROPOSITIONS ── */}
        <div className="about-value-section">
          <div className="about-value-header">
            <span className="section-label">Boutique Stature</span>
            <h2 className="about-section-title">{t.contentTitle}</h2>
          </div>
          <div className="about-value-grid">
            {t.content.map((item, idx) => (
              <div key={idx} className="value-prop-card glass">
                <div className="value-prop-card__iconrow">
                  <span className="value-prop-card__icon">{item.icon}</span>
                  <span className="value-prop-card__num">0{idx + 1}</span>
                </div>
                <h3 className="value-prop-card__title">{item.heading}</h3>
                <p className="value-prop-card__text">{item.text}</p>
                <div className="value-prop-card__bar" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
