import { Facebook, Instagram, Linkedin, Send } from 'lucide-react'
import './Footer.css'

// Import brand logo
import companyLogo from '../assets/images/company_logo.jpeg'

export default function Footer({ buyerType, language }) {
  const t = {
    EN: {
      tagline: "Connecting the world with Sri Lanka's finest ginger and hot dragon nai miris. Pure, ethical, and traceable from estate to shelf.",
      products: "Products",
      cinnamon: "Ceylon Ginger",
      pepper: "Hot Dragon Nai Miris",
      samples: "Sample Requests",
      bulk: "Bulk Export Quoting",
      company: "Company",
      story: "Our Story",
      certifications: "Certifications",
      reviews: "Client Testimonials",
      contact: "Contact Estate",
      contactTitle: "Get in Touch",
      address: "📍 Galle Fort Estate, Galle 80000, Sri Lanka",
      hours: "🕐 Mon–Sat 8:00 AM – 6:00 PM (IST)",
      newsletterTitle: "Estate Chronicles",
      newsletterPlaceholder: "Enter your email for spice tips...",
      subscribe: "Subscribe",
      rights: "© 2026 500 Labs. All rights reserved.",
      certOrganic: "USDA Organic",
      certSLS: "SLS Certified",
      certISO: "ISO 22000",
      certHACCP: "HACCP Certified",
      certFair: "Fair Trade Estate",
    },
    SI: {
      tagline: "ශ්‍රී ලංකාවේ විශිෂ්ටතම ඉඟුරු සහ සැර නයි මිරිස් ලොව පුරා සිටින පාරිභෝගිකයින් වෙත ගෙනයාම. 100% ක් පිරිසිදු, සදාචාරාත්මක සහ ගුණාත්මක නිෂ්පාදන.",
      products: "නිෂ්පාදන",
      cinnamon: "දේශීය ලංකා ඉඟුරු",
      pepper: "නයි මිරිස්",
      samples: "නියැදි ඇණවුම්",
      bulk: "තොග අපනයන මිල ගණන්",
      company: "ආයතනය",
      story: "අපේ කතාව",
      certifications: "ප්‍රමිති සහ සහතික",
      reviews: "පාරිභෝගික අදහස්",
      contact: "විමසීම්",
      contactTitle: "සම්බන්ධ වීමට",
      address: "📍 ගාලු කොටුව වතුයාය, ගාල්ල 80000, ශ්‍රී ලංකාව",
      hours: "🕐 සඳුදා-සෙනසුරාදා පෙ.ව. 8:00 - ප.ව. 6:00 (IST)",
      newsletterTitle: "කුළුබඩු තොරතුරු",
      newsletterPlaceholder: "ඔබේ විද්‍යුත් තැපෑල ඇතුළත් කරන්න...",
      subscribe: "ලියාපදිංචි වන්න",
      rights: "© 2026 500 Labs. All rights reserved.",
    },
  }[language]

  const handleSubscribe = (e) => {
    e.preventDefault()
    alert(language === 'SI' ? 'ලියාපදිංචි වීම සාර්ථකයි! ස්තූතියි.' : 'Subscription successful! Thank you.')
    e.target.reset()
  }

  return (
    <footer className="footer-premium">
      <div className="footer-top">
        <div className="container footer-top-inner">
          
          {/* Brand Info */}
          <div className="footer-col-brand">
            <div className="footer-brand-logo-container">
              <img src={companyLogo} alt="Shorewin Agri Logo" className="footer-brand-logo-img" />
              <div className="footer-brand-logo-text">
                Shorewin <span>Agri</span>
              </div>
            </div>
            <p className="footer-tagline-text">{t.tagline}</p>
            <div className="footer-social-icons">
              <a href="#" className="social-icon" aria-label="Facebook"><Facebook size={16} /></a>
              <a href="#" className="social-icon" aria-label="Instagram"><Instagram size={16} /></a>
              <a href="#" className="social-icon" aria-label="LinkedIn"><Linkedin size={16} /></a>
            </div>
          </div>

          {/* Column 2: Products Links */}
          <div className="footer-col-links">
            <h4 className="footer-col-title">{t.products}</h4>
            <a href="#products" className="footer-link">{t.cinnamon}</a>
            <a href="#products" className="footer-link">{t.pepper}</a>
            <a href="#order" className="footer-link">{t.samples}</a>
            <a href="#order" className="footer-link">{t.bulk}</a>
          </div>

          {/* Column 3: Company Links */}
          <div className="footer-col-links">
            <h4 className="footer-col-title">{t.company}</h4>
            <a href="#about" className="footer-link">{t.story}</a>
            <a href="#about" className="footer-link">{t.certifications}</a>
            <a href="#reviews" className="footer-link">{t.reviews}</a>
            <a href="#order" className="footer-link">{t.contact}</a>
          </div>

          {/* Column 4: Address / Newsletter */}
          <div className="footer-col-newsletter">
            <h4 className="footer-col-title">{t.newsletterTitle}</h4>
            <form onSubmit={handleSubscribe} className="footer-newsletter-form">
              <input 
                type="email" 
                required 
                placeholder={t.newsletterPlaceholder} 
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-submit-btn" aria-label="Subscribe">
                <Send size={16} />
              </button>
            </form>
            
            <div className="footer-contact-details">
              <strong>{t.contactTitle}</strong>
              <p>{t.address}</p>
              <p>📱 +94 71 234 5678</p>
              <p>✉️ orders@ceylonspicereserve.lk</p>
              <p>{t.hours}</p>
            </div>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copyright-text">{t.rights}</p>
        </div>
      </div>
    </footer>
  )
}
