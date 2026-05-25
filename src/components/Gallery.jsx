import { useState } from 'react'
import './Gallery.css'

// Importing images
import peelingGallery from '../assets/images/peeling_gallery.png'
import matDryingGallery from '../assets/images/mat_drying_gallery.png'
import marketGallery from '../assets/images/market_gallery.png'
import cinnamonProduct from '../assets/images/cinnamon_product.png'
import pepperProduct from '../assets/images/pepper_product.png'
import plantationHero from '../assets/images/plantation_hero.png'

const GALLERY_IMAGES = [
  {
    id: 1,
    url: peelingGallery,
    title: { EN: 'Artisan Quill Peeling', SI: 'කුරුඳු පීලි සකස් කිරීම' },
    desc: { EN: 'Traditional hand-peeling passed down generations in Galle.', SI: 'ගාල්ලේ සාම්ප්‍රදායික ශිල්පීන් විසින් අතින්ම සකස් කරන සැබෑ කුරුඳු පීලි.' },
    aspect: 'portrait-tall'
  },
  {
    id: 2,
    url: matDryingGallery,
    title: { EN: 'Sun Drying Spices', SI: 'අව්වේ වියළන කුළුබඩු' },
    desc: { EN: 'Pepper and cinnamon drying naturally under the tropical sun.', SI: 'නිවර්තන සූර්ය රශ්මියෙන් ස්වාභාවිකව වියළන ගම්මිරිස් සහ කුරුඳු.' },
    aspect: 'square-big'
  },
  {
    id: 3,
    url: marketGallery,
    title: { EN: 'Clay Pot Curing', SI: 'මැටි බඳුන්වල කුළුබඩු' },
    desc: { EN: 'Aromatic cured whole spices stored organically.', SI: 'මැටි බඳුන්වල අසුරා ඇති නැවුම් සුවඳවත් ලංකා කුළුබඩු.' },
    aspect: 'landscape-wide'
  },
  {
    id: 4,
    url: cinnamonProduct,
    title: { EN: 'Pure Cinnamon Quills', SI: 'පිරිසිදු කුරුඳු කූරු' },
    desc: { EN: 'Premium Alba grade golden layers closely rolled.', SI: 'ඉහළම ප්‍රමිතියේ Alba කාණ්ඩයේ රන්වන් කුරුඳු කූරු.' },
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
    url: pepperProduct,
    title: { EN: 'Ceylon Peppercorns', SI: 'ගම්මිරිස් ඇට' },
    desc: { EN: 'High piperine concentration delivering rich heat.', SI: 'ඉහළම සැර සහ සුවඳ ගෙනදෙන වියළි ගම්මිරිස්.' },
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
