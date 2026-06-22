import { useState } from 'react'
import { X, CheckCircle, ArrowRight, Loader2, ClipboardList, ShoppingCart, Truck } from 'lucide-react'
import './CheckoutModal.css'

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  clearCart,
  buyerType,
  currency,
  language,
}) {
  const [step, setStep] = useState(1) // 1: Checkout Form, 2: Success Receipt, 3: WhatsApp Message Preview
  const [isProcessing, setIsProcessing] = useState(false)
  const [createdOrder, setCreatedOrder] = useState(null)
  const [whatsAppMessage, setWhatsAppMessage] = useState('')

  // Customer Form Details
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  })

  if (!isOpen) return null

  // Exchange details relative to USD (1), LKR (300), EUR (0.92)
  const currencySymbol = { USD: '$', LKR: 'Rs. ', EUR: '€' }[currency]
  const currencyRate = { USD: 1, LKR: 300, EUR: 0.92 }[currency]

  // Fixed Shipping Fee of 500 LKR, dynamically converted to current currency
  const shippingFeeLKR = 500
  const selectedShippingFee = currency === 'LKR' 
    ? 500 
    : Math.round((500 * (currencyRate / 300)) * 100) / 100

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const grandTotal = subtotal + selectedShippingFee

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Check if all mandatory fields are filled
  const isFormValid = formData.name.trim() !== '' && formData.address.trim() !== '' && formData.phone.trim() !== ''

  // Generate the formatted WhatsApp message
  const generateWhatsAppMessage = () => {
    const itemsList = cart.map(item => 
      `• ${item.name} (${item.grade}) - ${item.quantity} ${item.unit || 'kg'} @ ${currencySymbol}${item.price.toLocaleString()} (${currencySymbol}${(item.price * item.quantity).toLocaleString()})`
    ).join('\n')

    return `🌿 *Ceylon Spice Co. - New Order*
----------------------------------------
*Customer Details:*
• *Name:* ${formData.name.trim()}
• *Address:* ${formData.address.trim()}
• *Phone:* ${formData.phone.trim()}

*Order Details:*
${itemsList}

*Subtotal:* ${currencySymbol}${subtotal.toLocaleString()}
*Shipping Fee:* ${currencySymbol}${selectedShippingFee.toLocaleString()}
*Total Amount:* ${currencySymbol}${grandTotal.toLocaleString()}
----------------------------------------`
  }

  const handlePreviewWhatsApp = () => {
    if (!isFormValid) return
    const msg = generateWhatsAppMessage()
    setWhatsAppMessage(msg)
    setStep(3) // Go to WhatsApp Message Preview screen
  }

  const handleSendWhatsApp = async () => {
    if (isProcessing) return

    setIsProcessing(true)
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

    try {
      const orderPayload = {
        userDetails: {
          name: formData.name.trim(),
          address: formData.address.trim(),
          phone: formData.phone.trim(),
        },
        items: cart.map((item) => ({
          id: item.id,
          key: item.key || `${item.id}-${item.grade}`,
          name: item.name,
          sinhala: item.sinhala || '',
          grade: item.grade,
          quantity: item.quantity,
          unit: item.unit || 'kg',
          price: item.price,
        })),
        subtotal,
        shipping: selectedShippingFee,
        total: grandTotal,
        currency,
      }

      const res = await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      })

      if (!res.ok) {
        throw new Error('Failed to create order in database')
      }

      const data = await res.json()
      setCreatedOrder(data)
      
      // Open WhatsApp in a new tab with the prefilled message
      const waUrl = `https://wa.me/qr/SFAUXWBPOKAYE1?text=${encodeURIComponent(whatsAppMessage)}`
      window.open(waUrl, '_blank')
      
      setStep(2) // Move to success page
    } catch (err) {
      console.error(err)
      alert('⚠️ Database saving failed, opening WhatsApp order directly...')
      const waUrl = `https://wa.me/qr/SFAUXWBPOKAYE1?text=${encodeURIComponent(whatsAppMessage)}`
      window.open(waUrl, '_blank')
      setStep(2)
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    if (!isFormValid || isProcessing) return

    setIsProcessing(true)
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

    try {
      const orderPayload = {
        userDetails: {
          name: formData.name.trim(),
          address: formData.address.trim(),
          phone: formData.phone.trim(),
        },
        items: cart.map((item) => ({
          id: item.id,
          key: item.key || `${item.id}-${item.grade}`,
          name: item.name,
          sinhala: item.sinhala || '',
          grade: item.grade,
          quantity: item.quantity,
          unit: item.unit || 'kg',
          price: item.price,
        })),
        subtotal,
        shipping: selectedShippingFee,
        total: grandTotal,
        currency,
      }

      const res = await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      })

      if (!res.ok) {
        throw new Error('Failed to create order in database')
      }

      const data = await res.json()
      setCreatedOrder(data)
      setStep(2) // Move to success page
    } catch (err) {
      console.error(err)
      alert('❌ Failed to place order. Please check network connection and try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCloseReceipt = () => {
    clearCart()
    setStep(1)
    setFormData({
      name: '',
      phone: '',
      address: '',
    })
    setCreatedOrder(null)
    setWhatsAppMessage('')
    onClose()
  }

  return (
    <div className="checkout-overlay" onClick={(step === 2) ? handleCloseReceipt : onClose}>
      <div className="checkout-modal glass animate-fade-up" style={{ maxWidth: (step === 2 || step === 3) ? '540px' : '900px' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="checkout-modal-header">
          <div className="checkout-header-branding">
            <span>🌿</span>
            <h3>
              {step === 2 ? 'Order Received' : (step === 3 ? 'Review WhatsApp Message' : 'Direct Checkout')}
            </h3>
          </div>
          {step !== 2 && (
            <button className="btn-close-checkout" onClick={onClose}>
              ✕
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="checkout-body-content">
          {isProcessing ? (
            <div className="checkout-loading-screen">
              <Loader2 className="spinner-spice animate-spin" size={44} style={{ color: 'var(--clr-gold-dark)' }} />
              <h4>Storing your order...</h4>
              <p>Please wait, sending order details to our database.</p>
            </div>
          ) : (
            <>
              {/* Step 1: Checkout Form and Cart Review */}
              {step === 1 && (
                <div className="direct-checkout-grid">
                  
                  {/* Left Column: Cart items with Subtotal & Total */}
                  <div className="cart-items-summary-card">
                    <h4 className="cart-summary-title">
                      <ShoppingCart size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                      Cart Summary
                    </h4>
                    
                    <div className="cart-items-list-scroll">
                      {cart.map((item) => (
                        <div key={item.key} className="cart-summary-item-row">
                          <img
                            src={item.image || item.imageUrl || ''}
                            alt={item.name}
                            className="cart-summary-item-img"
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23c59d5f" stroke-width="1.5"%3E%3Crect x="3" y="3" width="18" height="18" rx="2"/%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"/%3E%3Cpath d="M21 15l-5-5L5 21"/%3E%3C/svg%3E'
                            }}
                          />
                          <div className="cart-summary-item-details">
                            <span className="cart-summary-item-name">{item.name}</span>
                            <span className="cart-summary-item-grade">{item.grade}</span>
                            <span className="cart-summary-item-qty">{item.quantity} {item.unit || 'kg'}</span>
                          </div>
                          <span className="cart-summary-item-price">
                            {currencySymbol}{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="cart-totals-breakdown">
                      <div className="cart-total-line">
                        <span>Cart Subtotal</span>
                        <span>{currencySymbol}{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="cart-total-line">
                        <span>
                          <Truck size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                          Fixed Shipping Fee
                        </span>
                        <span>{currencySymbol}{selectedShippingFee.toLocaleString()}</span>
                      </div>
                      <div className="cart-total-line cart-total-line--grand">
                        <span>Final Total</span>
                        <span>{currencySymbol}{grandTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Customer shipping details */}
                  <div className="checkout-step-panel" style={{ border: 'none', padding: 0 }}>
                    <h4 style={{ fontSize: '1.25rem', marginTop: 0, paddingBottom: '8px' }}>
                      <ClipboardList size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                      Customer Details
                    </h4>
                    
                    <form onSubmit={handlePlaceOrder} className="checkout-form-grid">
                      <div className="form-group-checkout">
                        <label htmlFor="checkout-name">Full Name *</label>
                        <input
                          id="checkout-name"
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="form-group-checkout">
                        <label htmlFor="checkout-phone">WhatsApp / Phone Number *</label>
                        <input
                          id="checkout-phone"
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. +94 77 123 4567"
                        />
                      </div>

                      <div className="form-group-checkout">
                        <label htmlFor="checkout-address">Delivery Address *</label>
                        <input
                          id="checkout-address"
                          type="text"
                          name="address"
                          required
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Enter street, city, and province"
                        />
                      </div>

                      <div className="checkout-step-actions" style={{ marginTop: '10px', paddingTop: '12px', flexDirection: 'column', gap: '10px' }}>
                        <button 
                          type="submit" 
                          className="btn btn--primary" 
                          style={{ width: '100%', justifyContent: 'center' }} 
                          disabled={!isFormValid}
                        >
                          <span>Place Order</span>
                          <ArrowRight size={16} />
                        </button>
                        
                        <button 
                          type="button" 
                          className="btn" 
                          style={{ width: '100%', justifyContent: 'center', background: '#25D366', color: '#fff', border: 'none' }} 
                          disabled={!isFormValid}
                          onClick={handlePreviewWhatsApp}
                        >
                          <span>💬 Send Order via WhatsApp</span>
                        </button>
                      </div>
                    </form>
                  </div>

                </div>
              )}

              {/* Step 2: Success Message and Receipt */}
              {step === 2 && createdOrder && (
                <div className="checkout-step-panel invoice-panel" style={{ border: 'none', padding: 0 }}>
                  <div className="invoice-success-stamp">
                    <CheckCircle size={48} className="icon-success-check" style={{ color: 'var(--clr-forest-light)' }} />
                    <h4 style={{ fontSize: '1.5rem', margin: '8px 0 2px 0', border: 'none' }}>Order Successfully Placed!</h4>
                    <span className="invoice-id">Order ID: {createdOrder.id}</span>
                  </div>

                  <div className="invoice-summary-sheet" style={{ margin: '0 0 20px 0' }}>
                    <div className="invoice-details-block" style={{ gridTemplateColumns: '1fr', gap: '8px', paddingBottom: '12px', marginBottom: '12px' }}>
                      <div>
                        <strong>Customer Information:</strong>
                        <p style={{ margin: '2px 0' }}><strong>Name:</strong> {createdOrder.userDetails.name}</p>
                        <p style={{ margin: '2px 0' }}><strong>Phone:</strong> {createdOrder.userDetails.phone}</p>
                        <p style={{ margin: '2px 0' }}><strong>Address:</strong> {createdOrder.userDetails.address}</p>
                      </div>
                    </div>

                    <div className="invoice-items-table">
                      <div className="inv-table-header">
                        <span>Items Purchased</span>
                        <span className="text-center">Qty</span>
                        <span className="text-right">Price</span>
                      </div>
                      <div className="inv-table-body" style={{ paddingBottom: '8px', marginBottom: '8px' }}>
                        {createdOrder.items.map((item) => (
                          <div key={item.key || item.id} className="inv-table-row">
                            <span>
                              {item.name} <small>({item.grade})</small>
                            </span>
                            <span className="text-center">
                              {item.quantity} {item.unit || 'kg'}
                            </span>
                            <span className="text-right">
                              {currencySymbol}{(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                        <div className="inv-table-row inv-table-row--shipping">
                          <span>Shipping Fee</span>
                          <span>-</span>
                          <span className="text-right">
                            {currencySymbol}{createdOrder.shipping.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="inv-table-footer">
                        <span>Total Paid</span>
                        <strong className="text-right">
                          {currencySymbol}{createdOrder.total.toLocaleString()}
                        </strong>
                      </div>
                    </div>

                    {/* Prominent confirmation notification box */}
                    <div className="payment-instructions-box" style={{ background: 'rgba(10,31,17,0.04)', borderColor: 'var(--clr-gold)', marginTop: '16px', textAlign: 'center' }}>
                      <p style={{ margin: 0, fontSize: '13px', fontWeight: '500', color: 'var(--clr-forest)' }}>
                        💬 <strong>Next Steps:</strong> Our employee will contact you within 24 hours to confirm your order. Delivery within 5 working days.
                      </p>
                    </div>
                  </div>

                  <div className="receipt-next-actions">
                    <button className="btn btn--gold btn-close-checkout-receipt" style={{ width: '100%' }} onClick={handleCloseReceipt}>
                      Close & Finish
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: WhatsApp Message Preview */}
              {step === 3 && (
                <div className="checkout-step-panel" style={{ border: 'none', padding: 0 }}>
                  <h4 style={{ fontSize: '1.25rem', marginTop: 0, paddingBottom: '8px' }}>
                    Review WhatsApp Message
                  </h4>
                  <p style={{ fontSize: '13.5px', color: 'var(--clr-muted)', marginBottom: '12px' }}>
                    Review the formatted order message below. Clicking **Confirm & Send** will submit your order details and open WhatsApp.
                  </p>
                  
                  <textarea
                    readOnly
                    value={whatsAppMessage}
                    style={{ 
                      width: '100%', 
                      height: '240px', 
                      padding: '12px', 
                      border: '1px solid var(--clr-border)', 
                      borderRadius: 'var(--radius-sm)', 
                      background: 'var(--clr-cream-light)', 
                      fontFamily: 'monospace', 
                      fontSize: '13px', 
                      color: 'var(--clr-text)', 
                      resize: 'none', 
                      lineHeight: '1.4',
                      marginBottom: '16px' 
                    }}
                  />
                  
                  <div className="checkout-step-actions checkout-step-actions--double">
                    <button type="button" className="btn btn--ghost" onClick={() => setStep(1)}>
                      <span>Back to Form</span>
                    </button>
                    <button 
                      type="button" 
                      className="btn" 
                      style={{ background: '#25D366', borderColor: '#25D366', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }} 
                      onClick={handleSendWhatsApp}
                    >
                      <span>Confirm & Send</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
