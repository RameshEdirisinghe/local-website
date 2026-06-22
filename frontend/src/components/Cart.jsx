import { X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import './Cart.css'

export default function Cart({
  isOpen,
  onClose,
  cart,
  updateCartQuantity,
  removeFromCart,
  checkout,
  currency,
}) {
  const currencySymbol = {
    USD: '$',
    LKR: 'Rs. ',
    EUR: '€',
  }[currency]

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  if (!isOpen) return null

  return (
    <div className="cart-overlay animate-fade-in" onClick={onClose}>
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-title">
            <span>🌿</span>
            <h3>Your Cart</h3>
            <span className="cart-total-badge">{cart.length}</span>
          </div>
          <button className="btn-close-cart" onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="cart-content">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <span className="empty-cart-icon">🛒</span>
              <h4>Your cart is empty</h4>
              <p>Explore our premium estate ginger and hot dragon nai miris products to add them here.</p>
              <button className="btn btn--primary" onClick={onClose}>
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.key} className="cart-item-card">
                  <div className="cart-item-img-container">
                    <img
                      src={item.image || item.imageUrl || ''}
                      alt={item.name}
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23c59d5f" stroke-width="1.5"%3E%3Crect x="3" y="3" width="18" height="18" rx="2"/%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"/%3E%3Cpath d="M21 15l-5-5L5 21"/%3E%3C/svg%3E'
                      }}
                    />
                  </div>

                  <div className="cart-item-info">
                    <div className="cart-item-meta">
                      <div>
                        <h4>{item.name}</h4>
                        <span className="cart-item-grade">{item.grade}</span>
                      </div>
                      <button
                        className="btn-remove-item"
                        onClick={() => removeFromCart(item.key)}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="cart-item-pricing-row">
                      <div className="cart-qty-spinner">
                        <button
                          className="qty-spin-btn"
                          onClick={() => updateCartQuantity(item.key, item.quantity - 5)}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="qty-spin-value">{item.quantity}</span>
                        <button
                          className="qty-spin-btn"
                          onClick={() => updateCartQuantity(item.key, item.quantity + 5)}
                        >
                          <Plus size={12} />
                        </button>
                        <span className="qty-spin-unit">{item.unit}</span>
                      </div>

                      <div className="cart-item-totals">
                        <span className="cart-item-unit-price">
                          {currencySymbol}{item.price}/{item.unit}
                        </span>
                        <strong className="cart-item-total-price">
                          {currencySymbol}{(item.price * item.quantity).toLocaleString()}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer actions */}
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal-row">
              <span>Subtotal:</span>
              <strong className="subtotal-amount">
                {currencySymbol}{subtotal.toLocaleString()}
              </strong>
            </div>
            
            <p className="cart-disclaimer">
              Shipping rates and local delivery estimates are calculated at the next step.
            </p>

            <button className="btn btn--gold btn-checkout-action" onClick={checkout}>
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
