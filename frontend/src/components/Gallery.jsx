import { useState } from 'react'
import './Gallery.css'

// Importing enhanced and raw assets
import gingerEnhanced from '../assets/images/ginger_enhanced.png'
import greenMirisPremium from '../assets/images/green_miris_premium.png'
import naimirisPlantEnhanced from '../assets/images/naimiris_plant_enhanced.png'
import gingerPlant from '../assets/images/ginger_plant.jpg'
import plantationHero from '../assets/images/plantation_hero.png'
import naimirisEnhanced from '../assets/images/naimiris_enhanced.png'

// Importing local premium videos
import naiMirisVid1 from '../assets/images/nai_miris.mp4'
import naiMirisVid2 from '../assets/images/nai_miris (2).mp4'
import naiMirisVid3 from '../assets/images/nai_miris3.mp4'

// Importing local premium images
import naiMirisImg1 from '../assets/images/nai_miris.jpeg'
import naiMirisImg2 from '../assets/images/nai_miris2.jpeg'
import naiMirisImg3 from '../assets/images/nai_miris3.jpeg'

const GALLERY_MEDIA = [
  {
    id: 1,
    type: 'image',
    url: gingerEnhanced,
    title: { EN: 'Artisan Sliced Ceylon Ginger', SI: 'කපා සකස් කළ නැවුම් ලංකා ඉඟුරු' },
    desc: { EN: 'Sun-cured local ginger root, rich in [6]-gingerol active compound and low in fiber.', SI: 'තන්තු අඩු සහ ඉහළ ජින්ජරෝල් අඩංගු අතින් කපා වියළන ලද දේශීය ලංකා ඉඟුරු.' },
    aspect: 'portrait-tall'
  },
  {
    id: 'vid-1',
    type: 'video',
    url: naiMirisVid1,
    title: { EN: 'High-Heat Spice Extraction', SI: 'ඉහළ සැර සහ කුළුබඩු නිස්සාරණය' },
    desc: { EN: 'Meticulous processing of fiery red cobra pods, releasing deep capsaicin oils.', SI: 'ගැඹුරු කැප්සයිසින් තෙල් නිකුත් කරන, දැවෙන රතු නයි මිරිස් කරල් ඉතා සූක්ෂ්ම ලෙස සැකසීම.' },
    aspect: 'square-big'
  },
  {
    id: 'nai-img-1',
    type: 'image',
    url: naiMirisImg1,
    title: { EN: 'Flame-Red Cobra Pepper', SI: 'තද රතු නයි මිරිස් කරල්' },
    desc: { EN: 'Sun-ripened organic pods bursting with natural heat and vibrant color.', SI: 'කාබනික වතුයායෙන් නෙළාගත් සූර්ය රශ්මියෙන් ඉදුණු නැවුම් නයි මිරිස් කරල්.' },
    aspect: 'square-small'
  },
  {
    id: 'vid-2',
    type: 'video',
    url: naiMirisVid2,
    title: { EN: 'Cinematic Farm Harvesting', SI: 'නයි මිරිස් අස්වනු නෙලීමේ දර්ශන' },
    desc: { EN: 'Hand-picking glossy red Cobra pods from the morning-mist highland plantations.', SI: 'උදෑසන මීදුම සහිත කඳුකර වතුයායෙන් දිලිසෙන රතු නයි මිරිස් අතින් නෙලීම.' },
    aspect: 'landscape-wide'
  },
  {
    id: 'nai-img-2',
    type: 'image',
    url: naiMirisImg2,
    title: { EN: 'Fiery Harvest Pile', SI: 'කුළුබඩු අස්වැන්නේ එකතුව' },
    desc: { EN: 'Freshly sorted export-quality Cobra chillies, direct from highland growers.', SI: 'කඳුකරයේ ගොවීන්ගෙන් සෘජුවම ලබාගත් අපනයන මට්ටමේ නයි මිරිස් අස්වැන්න.' },
    aspect: 'landscape-medium'
  },
  {
    id: 3,
    type: 'image',
    url: naimirisPlantEnhanced,
    title: { EN: 'Pure Organic Nai Miris Shrub', SI: 'කාබනික නයි මිරිස් වගාව' },
    desc: { EN: 'Vibrant red cobra pods ripening naturally on healthy branches under rain-fed conditions.', SI: 'ස්වාභාවික වැසි ජලයෙන් පෝෂණය වී සාරවත් ලෙස පීදෙන නැවුම් නයි මිරිස් කරල්.' },
    aspect: 'landscape-medium'
  },
  {
    id: 'vid-3',
    type: 'video',
    url: naiMirisVid3,
    title: { EN: 'Artisanal Hot Sauce Crafting', SI: 'දේශීය හොට් සෝස් නිෂ්පාදනය' },
    desc: { EN: 'Slow-simmering matured Cobra chilies into our premium spicy liquid essence.', SI: 'පරිණත නයි මිරිස් අපගේ සුවිශේෂී සැර ද්‍රව සාරය බවට සෙමින් පිසීම.' },
    aspect: 'portrait-medium'
  },
  {
    id: 'nai-img-3',
    type: 'image',
    url: naiMirisImg3,
    title: { EN: 'Premium Crinkled Skin', SI: 'වියළි නයි මිරිස් කරල්' },
    desc: { EN: 'Highly pungent pods showing off their characteristic deep-wrinkled texture.', SI: 'සුවිශේෂී රැළි සහිත හැඩය සහ උපරිම සැර පෙන්වන උසස් තත්ත්වයේ නයි මිරිස් කරල්.' },
    aspect: 'portrait-tall'
  },
  {
    id: 4,
    type: 'image',
    url: gingerPlant,
    title: { EN: 'Ceylon Local Ginger Plant', SI: 'දේශීය ලංකා ඉඟුරු පැලෑටිය' },
    desc: { EN: 'Lush, spear-like leaves of high-pungency local ginger cultivars in Matale soil.', SI: 'මාතලේ සාරවත් පසෙහි වැඩෙන ඉහළ සැර සහ සුවඳැති දේශීය ඉඟුරු පත්‍ර.' },
    aspect: 'square-small'
  },
  {
    id: 6,
    type: 'image',
    url: naimirisEnhanced,
    title: { EN: 'Fiery Ceylon Nai Miris Pods', SI: 'සැර නයි මිරිස් කරල්' },
    desc: { EN: 'Deep crimson, deeply wrinkled export-grade Cobra pods packed with 150k–350k SHU heat.', SI: 'ඉහළම අපනයන තත්ත්වයේ පවතින දැඩි සැර සහ සුවඳැති නයි මිරිස් කරල්.' },
    aspect: 'portrait-medium'
  }
]

export default function Gallery({ language }) {
  const [activeMedia, setActiveMedia] = useState(null)
  const [filter, setFilter] = useState('all') // 'all', 'video', 'image'

  const t = {
    EN: {
      label: 'Cinematic Chronicles',
      title: 'Our Estate Gallery',
      subtitle: 'Hover to pause the cinematic scroll. Click on any frame to view high-resolution heritage details.',
      close: 'Close View',
      filterAll: 'All Media',
      filterVideo: 'Cinematic Reels 🎥',
      filterImage: 'Heritage Photos 📷'
    },
    SI: {
      label: 'වතුයායේ දර්ශන',
      title: 'කුළුබඩු ඡායාරූප එකතුව',
      subtitle: 'ඡායාරූපය නැරඹීමට scroll එක මත මදක් නවතින්න. විශාලව දැකීමට ඡායාරූපය ක්ලික් කරන්න.',
      close: 'වසා දමන්න',
      filterAll: 'සියලුම මාධ්‍ය',
      filterVideo: 'සිනමා පට 🎥',
      filterImage: 'ඡායාරූප 📷'
    }
  }[language]

  // Filter media based on tab state
  const filteredMedia = GALLERY_MEDIA.filter(item => {
    if (filter === 'all') return true
    return item.type === filter
  })

  // Duplicate elements to ensure smooth seamless scrolling ticker regardless of item count
  const repeatedMedia = []
  const targetCount = Math.max(12, filteredMedia.length * 2)
  while (repeatedMedia.length < targetCount && filteredMedia.length > 0) {
    repeatedMedia.push(...filteredMedia)
  }

  return (
    <section className="gallery-section">
      <div className="container gallery-header-block">
        <span className="section-label">{t.label}</span>
        <h2 className="gallery-title">{t.title}</h2>
        <p className="gallery-subtitle">{t.subtitle}</p>

        {/* Filter Navigation controls */}
        {/* <div className="gallery-filter-tabs glass">
          <button 
            className={`filter-tab-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            {t.filterAll}
          </button>
          <button 
            className={`filter-tab-btn ${filter === 'video' ? 'active' : ''}`}
            onClick={() => setFilter('video')}
          >
            {t.filterVideo}
          </button>
          <button 
            className={`filter-tab-btn ${filter === 'image' ? 'active' : ''}`}
            onClick={() => setFilter('image')}
          >
            {t.filterImage}
          </button>
        </div> */}
      </div>

      {/* Infinite cinematic scrolling container */}
      <div className="gallery-scroll-ticker-outer">
        <div className="gallery-scroll-ticker-inner">
          {repeatedMedia.map((img, index) => (
            <div
              key={`${img.id}-${index}`}
              className={`gallery-card-frame ${img.aspect} ${img.type === 'video' ? 'video-frame' : 'image-frame'}`}
              onClick={() => setActiveMedia(img)}
            >
              {img.type === 'video' ? (
                <div className="gallery-video-preview-wrapper">
                  <video 
                    src={img.url} 
                    className="gallery-card-img" 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                  />
                  <div className="video-play-indicator">
                    <span className="play-pulse"></span>
                    <span className="play-icon">▶</span>
                  </div>
                </div>
              ) : (
                <img src={img.url} alt={img.title[language]} className="gallery-card-img" loading="lazy" />
              )}
              <div className="gallery-card-overlay-details">
                <span className="gallery-card-badge">
                  {img.type === 'video' ? '🎥 Cinematic Reel' : '🇱🇰 Ceylon Heritage'}
                </span>
                <h4>{img.title[language]}</h4>
                <p>{img.desc[language]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Luxury Lightbox Overlay Modal */}
      {activeMedia && (
        <div className="gallery-lightbox-overlay" onClick={() => setActiveMedia(null)}>
          <div 
            className={`gallery-lightbox-card glass-dark animate-fade-in ${activeMedia.type === 'video' ? 'lightbox-video-mode' : ''}`} 
            onClick={(e) => e.stopPropagation()}
          >
            <button className="btn-close-lightbox" onClick={() => setActiveMedia(null)}>
              ✕
            </button>
            <div className="lightbox-media-box">
              {activeMedia.type === 'video' ? (
                <video 
                  src={activeMedia.url} 
                  controls 
                  autoPlay 
                  loop 
                  playsInline 
                  className="lightbox-video-element" 
                />
              ) : (
                <img src={activeMedia.url} alt={activeMedia.title[language]} />
              )}
            </div>
            <div className="lightbox-details-panel">
              <span className="lightbox-country-badge">
                {activeMedia.type === 'video' ? '🎥 Ambient Slow-Mo Reel' : '🌾 100% Sri Lankan Origin'}
              </span>
              <h3>{activeMedia.title[language]}</h3>
              <p>{activeMedia.desc[language]}</p>
              <button 
                className="btn btn--gold" 
                onClick={() => setActiveMedia(null)} 
                style={{ marginTop: '24px' }}
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

