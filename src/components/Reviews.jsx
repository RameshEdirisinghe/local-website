import { useState, useEffect } from 'react'
import './Reviews.css'

const DEFAULT_REVIEWS = [
  {
    id: 1,
    name: 'Hiroshi Tanaka',
    role: 'Executive Chef & Beverage Director, Tokyo',
    country: '🇯🇵',
    type: 'foreign',
    product: 'Ceylon Ginger — Premium Dried Root',
    rating: 5,
    text: 'I have been sourcing ginger from various suppliers across Asia for 12 years. Nothing comes close to this premium dried root. The aroma is extraordinary — sharp, zesty, and genuinely complex. My pastry and beverage team refuses to use anything else now.',
    avatar: 'HT',
    avatarBg: '#d8b990',
  },
  {
    id: 2,
    name: 'Kamal Perera',
    role: 'Spice Exporter, Colombo',
    country: '🇱🇰',
    type: 'local',
    product: 'Hot Dragon Nai Miris — Fresh Cobra Pods',
    rating: 5,
    text: 'නියම ගුණාත්මක බවින් ඉහළ ඉඟුරු සහ නයි මිරිස්! දේශීය ගැනුම්කරුවන්ටත් ඉතා සාධාරණ මිලකට ලබා දෙනවා. ඇසුරුම්කරණය ඉතාමත් උසස් වන අතර සේවාව ඉතා විශිෂ්ටයි.',
    avatar: 'KP',
    avatarBg: '#adc3a5',
  },
  {
    id: 3,
    name: 'Amelia Rossi',
    role: 'Wellness Brand Owner, Milan',
    country: '🇮🇹',
    type: 'foreign',
    product: 'Ceylon Ginger — Organic Ginger Powder',
    rating: 5,
    text: 'We use their organic ginger powder to produce premium wellness extracts. Lab results consistently show high gingerol content and zero chemical additives. Perfect export documents.',
    avatar: 'AR',
    avatarBg: '#c3a5d8',
  },
  {
    id: 4,
    name: 'Nilusha Fernando',
    role: 'Home Bakery Owner, Galle',
    country: '🇱🇰',
    type: 'local',
    product: 'Ceylon Ginger — Organic Ginger Powder',
    rating: 5,
    text: 'මම බේකරි නිෂ්පාදන සඳහා හැම මාසෙම ඉඟුරු කුඩු ඇණවුම් කරනවා. නැවුම් සුවඳ සහ රස වෙනස් වෙන්නේ නෑ. පාරිභෝගික සේවාවත් ඉතා ඉහළයි. ඉඟුරු ඇඟටත් ගොඩක් ගුණ නිසා බය නැතුව පාවිච්චි කරන්න පුළුවන්.',
    avatar: 'NF',
    avatarBg: '#d8a5a5',
  },
]

function Stars({ count, onClick = null, interactive = false }) {
  return (
    <div className={`stars-display ${interactive ? 'stars-display--interactive' : ''}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < count ? 'star-char star-char--filled' : 'star-char'}
          onClick={() => onClick && onClick(i + 1)}
          style={{ cursor: interactive ? 'pointer' : 'default' }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default function Reviews({ buyerType, language }) {
  const [reviewsList, setReviewsList] = useState([])
  const [filter, setFilter] = useState('all')
  const [formOpen, setFormOpen] = useState(false)
  
  // Review form states
  const [newName, setNewName] = useState('')
  const [newRole, setNewRole] = useState('')
  const [newCountry, setNewCountry] = useState('🇱🇰')
  const [newProduct, setNewProduct] = useState('Ceylon Ginger — Premium Dried Root')
  const [newRating, setNewRating] = useState(5)
  const [newText, setNewText] = useState('')

  // Load reviews from localStorage or defaults
  useEffect(() => {
    const saved = localStorage.getItem('ceylon_spice_reviews')
    if (saved) {
      try {
        setReviewsList(JSON.parse(saved))
      } catch (e) {
        setReviewsList(DEFAULT_REVIEWS)
      }
    } else {
      setReviewsList(DEFAULT_REVIEWS)
    }
  }, [])

  // Translations
  const t = {
    EN: {
      label: 'Customer Stories',
      title: 'Trusted by Chefs & Importers Globally',
      filterAll: 'All Reviews',
      filterLocal: '🇱🇰 Local Buyers',
      filterForeign: '🌐 International',
      addReviewBtn: 'Write a Review',
      averageText: 'from verified buyers',
      modalTitle: 'Share Your Experience',
      nameLabel: 'Your Name *',
      roleLabel: 'Your Role / Occupation (e.g. Home Chef) *',
      countryLabel: 'Country Flag/Emoji',
      productLabel: 'Product Purchased',
      ratingLabel: 'Your Rating',
      commentLabel: 'Review Comments *',
      submitBtn: 'Submit Review',
      cancelBtn: 'Cancel',
      validationError: 'Please fill in all starred (*) fields.',
      thankYouMsg: 'Thank you! Your review has been added.',
    },
    SI: {
      label: 'පාරිභෝගික හඬ',
      title: 'ලොව පුරා පාරිභෝගිකයින්ගේ විශ්වාසය',
      filterAll: 'සියලුම අදහස්',
      filterLocal: '🇱🇰 දේශීය පාරිභෝගිකයින්',
      filterForeign: '🌐 විදේශීය ගැනුම්කරුවන්',
      addReviewBtn: 'අදහසක් එක් කරන්න',
      averageText: 'තහවුරු කරන ලද ඇණවුම්',
      modalTitle: 'ඔබේ අත්දැකීම අප සමඟ බෙදාගන්න',
      nameLabel: 'ඔබේ නම *',
      roleLabel: 'ඔබ කවුද? (උදා: ගෘහණියක් / සූපවේදියෙක්) *',
      countryLabel: 'රට සංකේතය (කනිටු)',
      productLabel: 'මිලදී ගත් නිෂ්පාදනය',
      ratingLabel: 'තරු ප්‍රමාණය',
      commentLabel: 'ඔබේ අදහස *',
      submitBtn: 'ඇතුළත් කරන්න',
      cancelBtn: 'අවලංගු කරන්න',
      validationError: 'කරුණාකර තරුව (*) යෙදූ සියලුම කොටස් පුරවන්න.',
      thankYouMsg: 'ස්තූතියි! ඔබේ අදහස සාර්ථකව එක් කරන ලදී.',
    },
  }[language]

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!newName.trim() || !newRole.trim() || !newText.trim()) {
      alert(t.validationError)
      return
    }

    const type = newCountry === '🇱🇰' ? 'local' : 'foreign'
    const initials = newName.trim().substring(0, 2).toUpperCase()
    
    // Choose random color for avatar
    const colors = ['#d8b990', '#adc3a5', '#c3a5d8', '#d8a5a5', '#a5c3d8', '#c9c3a5']
    const avatarBg = colors[Math.floor(Math.random() * colors.length)]

    const newReview = {
      id: Date.now(),
      name: newName.trim(),
      role: newRole.trim(),
      country: newCountry,
      type,
      product: newProduct,
      rating: newRating,
      text: newText.trim(),
      avatar: initials,
      avatarBg,
    }

    const updated = [newReview, ...reviewsList]
    setReviewsList(updated)
    localStorage.setItem('ceylon_spice_reviews', JSON.stringify(updated))
    
    // Reset form
    setNewName('')
    setNewRole('')
    setNewCountry('🇱🇰')
    setNewProduct('Ceylon Ginger — Premium Dried Root')
    setNewRating(5)
    setNewText('')
    setFormOpen(false)

    // Trigger local page alert/toast (App.jsx toast runs on context, here we can alert or let the user see it update immediately)
  }

  // Calculate aggregates
  const reviewsCount = reviewsList.length
  const ratingSum = reviewsList.reduce((acc, r) => acc + r.rating, 0)
  const averageRating = reviewsCount > 0 ? (ratingSum / reviewsCount).toFixed(1) : '5.0'

  const filteredReviews = reviewsList.filter((r) => {
    if (filter === 'all') return true
    return r.type === filter
  })

  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        {/* Header with aggregate score and write button */}
        <div className="reviews-section-header">
          <div>
            <span className="section-label">{t.label}</span>
            <h2 className="reviews-title-text">{t.title}</h2>
          </div>

          <div className="reviews-scoring-block">
            <div className="aggregate-score-wrapper">
              <span className="aggregate-stars">★★★★★</span>
              <strong className="score-value">{averageRating} / 5.0</strong>
              <span className="score-count">
                {reviewsCount} {t.averageText}
              </span>
            </div>

            <button className="btn btn--gold" onClick={() => setFormOpen(true)}>
              ✍️ {t.addReviewBtn}
            </button>
          </div>
        </div>

        {/* Filters bar */}
        <div className="reviews-filter-bar">
          <button
            className={`filter-tab ${filter === 'all' ? 'filter-tab--active' : ''}`}
            onClick={() => setFilter('all')}
          >
            {t.filterAll}
          </button>
          <button
            className={`filter-tab ${filter === 'local' ? 'filter-tab--active' : ''}`}
            onClick={() => setFilter('local')}
          >
            {t.filterLocal}
          </button>
          <button
            className={`filter-tab ${filter === 'foreign' ? 'filter-tab--active' : ''}`}
            onClick={() => setFilter('foreign')}
          >
            {t.filterForeign}
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-cards-grid">
          {filteredReviews.map((r) => (
            <article key={r.id} className="review-card-premium glass">
              <div className="review-card-top">
                <Stars count={r.rating} />
                <span className="review-product-tag">{r.product}</span>
              </div>

              <blockquote className="review-quote-text">"{r.text}"</blockquote>

              <div className="review-author-info">
                <div className="review-avatar-sphere" style={{ backgroundColor: r.avatarBg }}>
                  {r.avatar}
                </div>
                <div className="review-author-meta">
                  <strong>
                    {r.name} <span className="author-country-flag">{r.country}</span>
                  </strong>
                  <p>{r.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Review Submission Modal Dialog */}
      {formOpen && (
        <div className="review-modal-overlay">
          <div className="review-modal-card glass animate-fade-in">
            <div className="modal-header-section">
              <h3>{t.modalTitle}</h3>
              <button className="btn-close-modal" onClick={() => setFormOpen(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="review-submission-form">
              <div className="form-field-item">
                <label>{t.nameLabel}</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kasun Silva or John Doe"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>

              <div className="form-field-item">
                <label>{t.roleLabel}</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Home Chef, Hotel Pastry Lead"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                />
              </div>

              <div className="form-row-double">
                <div className="form-field-item">
                  <label>{t.countryLabel}</label>
                  <select value={newCountry} onChange={(e) => setNewCountry(e.target.value)}>
                    <option value="🇱🇰">Sri Lanka (🇱🇰)</option>
                    <option value="🇺🇸">United States (🇺🇸)</option>
                    <option value="🇬🇧">United Kingdom (🇬🇧)</option>
                    <option value="🇩🇪">Germany (🇩🇪)</option>
                    <option value="🇯🇵">Japan (🇯🇵)</option>
                    <option value="🇮🇹">Italy (🇮🇹)</option>
                    <option value="🇦🇺">Australia (🇦🇺)</option>
                    <option value="🇨🇦">Canada (🇨🇦)</option>
                  </select>
                </div>

                <div className="form-field-item">
                  <label>{t.productLabel}</label>
                  <select value={newProduct} onChange={(e) => setNewProduct(e.target.value)}>
                    <option value="Ceylon Ginger — Premium Dried Root">Ceylon Ginger — Premium Dried Root</option>
                    <option value="Ceylon Ginger — Organic Ginger Powder">Ceylon Ginger — Organic Ginger Powder</option>
                    <option value="Ceylon Ginger — Ginger Essential Oil">Ceylon Ginger — Ginger Essential Oil</option>
                    <option value="Ceylon Ginger — Fresh Green Ginger">Ceylon Ginger — Fresh Green Ginger</option>
                    <option value="Hot Dragon Nai Miris — Fresh Cobra Pods">Hot Dragon Nai Miris — Fresh Cobra Pods</option>
                    <option value="Hot Dragon Nai Miris — Dragon Fire Flakes">Hot Dragon Nai Miris — Dragon Fire Flakes</option>
                    <option value="Hot Dragon Nai Miris — Cobra Chili Powder">Hot Dragon Nai Miris — Cobra Chili Powder</option>
                    <option value="Hot Dragon Nai Miris — Dragon Sauce Base">Hot Dragon Nai Miris — Dragon Sauce Base</option>
                  </select>
                </div>
              </div>

              <div className="form-field-item">
                <label>{t.ratingLabel}</label>
                <Stars count={newRating} onClick={setNewRating} interactive={true} />
              </div>

              <div className="form-field-item">
                <label>{t.commentLabel}</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write your review comments..."
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                />
              </div>

              <div className="form-action-buttons">
                <button type="button" className="btn btn--ghost" onClick={() => setFormOpen(false)}>
                  {t.cancelBtn}
                </button>
                <button type="submit" className="btn btn--gold">
                  {t.submitBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
