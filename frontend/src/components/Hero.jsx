import './Hero.css'
import plantationHero from '../assets/images/plantation_hero.png'

export default function Hero({ buyerType, language }) {
  // Translations
  const t = {
    EN: {
      label: "Sri Lanka's Finest · Est. 2008",
      titlePre: "The World's",
      titleItalic: "Purest",
      titlePost: "Ceylon Spices",
      subtitle:
        "Hand-harvested ginger & hot dragon nai miris from the lush highlands of Sri Lanka — shipped fresh to your door, anywhere on earth.",
      badgeOrganic: "100% Organic",
      badgeCertified: "Export Certified",
      btnProducts: "Explore Products",
      btnQuote: "Place Order / Quote",
      statYears: "Years of Export",
      statCountries: "Countries Served",
      statClients: "Happy Clients",
      scroll: "Scroll to explore",
    },
    SI: {
      label: "ශ්‍රී ලංකාවේ විශිෂ්ටතම · ඇරඹුම 2008",
      titlePre: "ලොව",
      titleItalic: "පිරිසිදුම",
      titlePost: "සෙලෝන් කුළුබඩු",
      subtitle:
        "ශ්‍රී ලංකාවේ සාරවත් කඳුකරයෙන් නෙලාගත් නැවුම් ඉඟුරු සහ සැර නයි මිරිස් - ලොව ඕනෑම තැනකට ඔබේ නිවසටම නැවුම්ව ගෙන්වා ගන්න.",
      badgeOrganic: "100% කාබනික",
      badgeCertified: "අපනයන සහතික",
      btnProducts: "නිෂ්පාදන බලන්න",
      btnQuote: "මිලදී ගන්න / ඇණවුම් කරන්න",
      statYears: "අපනයන වසර",
      statCountries: "රටවල් 40+",
      statClients: "පාරිභෝගිකයින්",
      scroll: "පහළට යන්න",
    },
  }[language]

  return (
    <section className="hero-section" id="hero">
      {/* Background Layer with generated asset */}
      <div className="hero-bg">
        <img
          src={plantationHero}
          alt="Ceylon spice plantation landscape"
          className="hero-bg-img animate-fade-in"
        />
        <div className="hero-overlay" />
        <div className="hero-grid-lines" />
      </div>

      {/* Floating Badges */}
      <div className="hero-badge hero-badge--organic animate-float">
        <div className="badge-content">
          <span className="badge-icon">🌿</span>
          <p dangerouslySetInnerHTML={{ __html: t.badgeOrganic.replace(' ', '<br /><strong>') + '</strong>' }} />
        </div>
      </div>
      <div className="hero-badge hero-badge--certified">
        <div className="badge-content">
          <span className="badge-icon">🏆</span>
          <p dangerouslySetInnerHTML={{ __html: t.badgeCertified.replace(' ', '<br /><strong>') + '</strong>' }} />
        </div>
      </div>

      <div className="container hero-content-wrapper">
        <div className="hero-text-block">
          <span className="section-label animate-fade-up">{t.label}</span>
          
          <h1 className="hero-title animate-fade-up">
            {t.titlePre} <br />
            <span className="hero-italic">{t.titleItalic}</span> <br />
            {t.titlePost}
          </h1>

          <p className="hero-subtitle animate-fade-up">
            {t.subtitle}
          </p>

          <div className="hero-actions animate-fade-up">
            <a href="#products" className="btn btn--gold">{t.btnProducts}</a>
            <a href="#order" className="btn btn--ghost-white">{t.btnQuote}</a>
          </div>

          <div className="hero-stats animate-fade-up">
            <div className="stat-card">
              <strong>15+</strong>
              <span>{t.statYears}</span>
            </div>
            <div className="stat-card-divider" />
            <div className="stat-card">
              <strong>40+</strong>
              <span>{t.statCountries}</span>
            </div>
            <div className="stat-card-divider" />
            <div className="stat-card">
              <strong>500+</strong>
              <span>{t.statClients}</span>
            </div>
          </div>
        </div>
      </div>

      <a href="#products" className="hero-scroll-indicator">
        <div className="mouse-wheel"></div>
        <p>{t.scroll}</p>
      </a>
    </section>
  )
}
