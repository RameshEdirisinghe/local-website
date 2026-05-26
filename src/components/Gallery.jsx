import { useState } from 'react'
import './Gallery.css'

// Importing enhanced and raw assets
import gingerEnhanced from '../assets/images/ginger_enhanced.png'
import greenMirisPremium from '../assets/images/green_miris_premium.png'
import naimirisPlantEnhanced from '../assets/images/naimiris_plant_enhanced.png'
import gingerPlant from '../assets/images/ginger_plant.jpg'
import plantationHero from '../assets/images/plantation_hero.png'
import naimirisEnhanced from '../assets/images/naimiris_enhanced.png'

const GALLERY_IMAGES = [
  {
    id: 1,
    url: gingerEnhanced,
    title: { EN: 'Artisan Sliced Ceylon Ginger', SI: 'කපා සකස් කළ නැවුම් ලංකා ඉඟුරු' },
    desc: { EN: 'Sun-cured local ginger root, rich in [6]-gingerol active compound and low in fiber.', SI: 'තන්තු අඩු සහ ඉහළ ජින්ජරෝල් අඩංගු අතින් කපා වියළන ලද දේශීය ලංකා ඉඟුරු.' },
    aspect: 'portrait-tall'
  },
  {
    id: 2,
    url: greenMirisPremium,
    title: { EN: 'Fresh Ceylon Green Miris', SI: 'නැවුම් ලංකා අමු මිරිස්' },
    desc: { EN: 'Crisp and fiery Ceylon green chilies harvested fresh from domestic organic estates.', SI: 'දේශීය කාබනික වගා බිම් වලින් නැවුම්ව නෙළාගත් සැර සහ නැවුම් අමු මිරිස්.' },
    aspect: 'square-big'
  },
  {
    id: 3,
    url: naimirisPlantEnhanced,
    title: { EN: 'Pure Organic Nai Miris Shrub', SI: 'කාබනික නයි මිරිස් වගාව' },
    desc: { EN: 'Vibrant red cobra pods ripening naturally on healthy branches under rain-fed conditions.', SI: 'ස්වාභාවික වැසි ජලයෙන් පෝෂණය වී සාරවත් ලෙස පීදෙන නැවුම් නයි මිරිස් කරල්.' },
    aspect: 'landscape-wide'
  },
  {
    id: 4,
    url: gingerPlant,
    title: { EN: 'Ceylon Local Ginger Plant', SI: 'දේශීය ලංකා ඉඟුරු පැලෑටිය' },
    desc: { EN: 'Lush, spear-like leaves of high-pungency local ginger cultivars in Matale soil.', SI: 'මාතලේ සාරවත් පසෙහි වැඩෙන ඉහළ සැර සහ සුවඳැති දේශීය ඉඟුරු පත්‍ර.' },
    aspect: 'square-small'
  },
  {
    id: 5,
    url: plantationHero,
    title: { EN: 'Matale Misty Estate', SI: 'මාතලේ මීදුම් වතුයාය' },
    desc: { EN: 'Lush spice gardens growing under ideal rain conditions.', SI: 'මාතලේ සාරවත් කඳුකර පරිසරයේ වැඩෙන කුළුබඩු වගාවන්.' },
    aspect: 'landscape-medium'
  },
  {
    id: 6,
    url: naimirisEnhanced,
    title: { EN: 'Fiery Ceylon Nai Miris Pods', SI: 'සැර නයි මිරිස් කරල්' },
    desc: { EN: 'Deep crimson, deeply wrinkled export-grade Cobra pods packed with 150k–350k SHU heat.', SI: 'ඉහළම අපනයන තත්ත්වයේ පවතින දැඩි සැර සහ සුවඳැති නයි මිරිස් කරල්.' },
    aspect: 'portrait-medium'
  }
]

export default function Gallery({ language }) {
  const [activeImage, setActiveImage] = useState(null)

  const t = {
    EN: {
      label: 'Cinematic Chronicles',
      title: 'Our Estate Gallery',
      subtitle: 'Hover to pause the cinematic scroll. Click on any frame to view high-resolution heritage details.',
      close: 'Close View'
    },
    SI: {
      label: 'වතුයායේ දර්ශන',
      title: 'කුළුබඩු ඡායාරූප එකතුව',
      subtitle: 'ඡායාරූපය නැරඹීමට scroll එක මත මදක් නවතින්න. විශාලව දැකීමට ඡායාරූපය ක්ලික් කරන්න.',
      close: 'වසා දමන්න'
    }
  }[language]

  return (
    <section className="gallery-section">
      <div className="container gallery-header-block">
        <span className="section-label">{t.label}</span>
        <h2 className="gallery-title">{t.title}</h2>
        <p className="gallery-subtitle">{t.subtitle}</p>
      </div>

      {/* Infinite cinematic scrolling container */}
      <div className="gallery-scroll-ticker-outer">
        <div className="gallery-scroll-ticker-inner">
          {/* Double array elements to ensure seamless infinite looping marquee */}
          {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, index) => (
            <div
              key={`${img.id}-${index}`}
              className={`gallery-card-frame ${img.aspect}`}
              onClick={() => setActiveImage(img)}
            >
              <img src={img.url} alt={img.title[language]} className="gallery-card-img" />
              <div className="gallery-card-overlay-details">
                <span className="gallery-card-badge">🇱🇰 Ceylon Heritage</span>
                <h4>{img.title[language]}</h4>
                <p>{img.desc[language]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Luxury Lightbox Overlay Modal */}
      {activeImage && (
        <div className="gallery-lightbox-overlay" onClick={() => setActiveImage(null)}>
          <div className="gallery-lightbox-card glass animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button className="btn-close-lightbox" onClick={() => setActiveImage(null)}>
              ✕
            </button>
            <div className="lightbox-media-box">
              <img src={activeImage.url} alt={activeImage.title[language]} />
            </div>
            <div className="lightbox-details-panel">
              <span className="lightbox-country-badge">🌾 100% Sri Lankan Origin</span>
              <h3>{activeImage.title[language]}</h3>
              <p>{activeImage.desc[language]}</p>
              <button className="btn btn--gold" onClick={() => setActiveImage(null)} style={{ marginTop: '16px' }}>
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
