import './MobileBlock.css'

export default function MobileBlock() {
  return (
    <div className="mobile-block-wrapper">
      <div className="mobile-block-card">
        <div className="mobile-block-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
            <line x1="12" y1="18" x2="12.01" y2="18"/>
          </svg>
        </div>
        <div className="mobile-block-content">
          <h1 className="mobile-block-title">Desktop Required</h1>
          <p className="mobile-block-message">
            For the best experience, the Admin Dashboard is available only on
            <strong> Desktop or Tablet</strong> devices.
          </p>
          <p className="mobile-block-sub">
            Please log in using a laptop, desktop, or tablet to access the Admin Panel.
          </p>
        </div>
        <div className="mobile-block-devices">
          <div className="device-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            <span>Desktop</span>
          </div>
          <div className="device-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
              <line x1="8" y1="6" x2="16" y2="6"/>
              <line x1="12" y1="18" x2="12.01" y2="18"/>
            </svg>
            <span>Tablet</span>
          </div>
          <div className="device-item device-item--laptop">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0l1.28 2.55A1 1 0 0 1 20.37 20H3.63a1 1 0 0 1-.91-1.45L4 16"/>
            </svg>
            <span>Laptop</span>
          </div>
        </div>
        <div className="mobile-block-brand">
          <span>🌿</span>
          <span>Ceylon Spice Admin Portal</span>
        </div>
      </div>
    </div>
  )
}
