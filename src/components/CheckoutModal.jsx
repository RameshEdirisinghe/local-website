import { useState } from 'react'
import { X, Lock, CheckCircle, ArrowRight, ArrowLeft, CreditCard, ShieldCheck } from 'lucide-react'
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
  const [step, setStep] = useState(1) // 1: Shipping, 2: Payment Mode, 3: Card Details, 4: OTP, 5: Receipt
  const [isProcessing, setIsProcessing] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  
  // Virtual Card States
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [isCardFlipped, setIsCardFlipped] = useState(false)

  // Form Details
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: buyerType === 'local' ? 'Sri Lanka' : '',
    shippingMethod: buyerType === 'local' ? 'local' : 'sea',
    paymentMode: 'card', // 'card', 'bank', 'cod'
  })

  const [formErrors, setFormErrors] = useState({})

  if (!isOpen) return null

  // Exchange details
  const currencySymbol = { USD: '$', LKR: 'Rs. ', EUR: '€' }[currency]
  const currencyRate = { USD: 1, LKR: 300, EUR: 0.92 }[currency]

  // Shipping Fees
  const shippingFees = {
    sea: 0, // Free
    air: Math.round(25 * currencyRate), // $25 equivalent
    local: Math.round(2 * currencyRate), // $2 equivalent (approx Rs 600)
  }

  const selectedShippingFee = shippingFees[formData.shippingMethod] || 0
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const grandTotal = subtotal + selectedShippingFee

  // Calculations
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setFormErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validateStep1 = () => {
    const errors = {}
    if (!formData.name.trim()) errors.name = 'Full name is required'
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email is required'
    if (!formData.phone.trim()) errors.phone = 'Phone number is required'
    if (!formData.address.trim()) errors.address = 'Delivery address is required'
    if (!formData.city.trim()) errors.city = 'City is required'
    if (buyerType === 'foreign' && !formData.country.trim()) errors.country = 'Country is required'
    return errors
  }

  const handleNextStep1 = () => {
    const errs = validateStep1()
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs)
      return
    }
    setStep(2)
  }

  const handleNextStep2 = () => {
    if (formData.paymentMode === 'card') {
      setStep(3)
    } else {
      // Simulate direct checkout success (Bank Transfer/COD)
      simulateCheckoutCompletion()
    }
  }

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 16) value = value.slice(0, 16)
    // Format card number with spaces (e.g. 1111 2222 3333 4444)
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value
    setCardNumber(formatted)
  }

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 4) value = value.slice(0, 4)
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`
    }
    setCardExpiry(value)
  }

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 3) value = value.slice(0, 3)
    setCardCvv(value)
  }

  const handlePayNow = (e) => {
    e.preventDefault()
    if (cardNumber.length < 19 || cardExpiry.length < 5 || cardCvv.length < 3 || !cardName.trim()) {
      alert('Please fill in complete credit card credentials.')
      return
    }
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setStep(4) // Trigger OTP SMS screen
    }, 1800)
  }

  const handleVerifyOtp = (e) => {
    e.preventDefault()
    if (otpCode.length < 4) {
      alert('Please enter a valid OTP code.')
      return
    }
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setStep(5) // Show receipt/invoice screen
    }, 1200)
  }

  const simulateCheckoutCompletion = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setStep(5)
    }, 1500)
  }

  const handleCloseReceipt = () => {
    clearCart()
    setStep(1)
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: buyerType === 'local' ? 'Sri Lanka' : '',
      shippingMethod: buyerType === 'local' ? 'local' : 'sea',
      paymentMode: 'card',
    })
    onClose()
  }

  return (
    <div className="checkout-overlay" onClick={step === 5 ? handleCloseReceipt : onClose}>
      <div className="checkout-modal glass animate-fade-up" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="checkout-modal-header">
          <div className="checkout-header-branding">
            <span>🌿</span>
            <h3>Checkout</h3>
          </div>
          {step !== 5 && (
            <button className="btn-close-checkout" onClick={onClose}>
              ✕
            </button>
          )}
        </div>

        {/* Progress Tracker (Steps 1-4) */}
        {step < 5 && (
          <div className="checkout-progress-bar">
            <div className={`progress-step ${step >= 1 ? 'progress-step--active' : ''}`}>
              <span className="step-num">1</span>
              <span className="step-txt">Shipping</span>
            </div>
            <div className="progress-connector" />
            <div className={`progress-step ${step >= 2 ? 'progress-step--active' : ''}`}>
              <span className="step-num">2</span>
              <span className="step-txt">Payment</span>
            </div>
            {formData.paymentMode === 'card' && (
              <>
                <div className="progress-connector" />
                <div className={`progress-step ${step >= 3 ? 'progress-step--active' : ''}`}>
                  <span className="step-num">3</span>
                  <span className="step-txt">Card</span>
                </div>
                <div className="progress-connector" />
                <div className={`progress-step ${step >= 4 ? 'progress-step--active' : ''}`}>
                  <span className="step-num">4</span>
                  <span className="step-txt">OTP</span>
                </div>
              </>
            )}
          </div>
        )}

        {/* Content Columns */}
        <div className="checkout-body-content">
          {isProcessing ? (
            <div className="checkout-loading-screen">
              <div className="spinner-spice"></div>
              <h4>Securing your connection...</h4>
              <p>Please wait, simulating encryption with payment gateway.</p>
            </div>
          ) : (
            <>
              {/* Step 1: Shipping Details */}
              {step === 1 && (
                <div className="checkout-step-panel">
                  <h4>Delivery Address</h4>
                  <div className="checkout-form-grid">
                    <div className="form-group-checkout">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Kasun Silva"
                      />
                      {formErrors.name && <span className="field-error">{formErrors.name}</span>}
                    </div>

                    <div className="form-row-half">
                      <div className="form-group-checkout">
                        <label>Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="you@domain.com"
                        />
                        {formErrors.email && <span className="field-error">{formErrors.email}</span>}
                      </div>

                      <div className="form-group-checkout">
                        <label>WhatsApp / Phone *</label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+94 7X XXX XXXX"
                        />
                        {formErrors.phone && <span className="field-error">{formErrors.phone}</span>}
                      </div>
                    </div>

                    <div className="form-group-checkout">
                      <label>Street Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="House No, Street, Road"
                      />
                      {formErrors.address && <span className="field-error">{formErrors.address}</span>}
                    </div>

                    <div className="form-row-half">
                      <div className="form-group-checkout">
                        <label>City *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="e.g. Colombo or Galle"
                        />
                        {formErrors.city && <span className="field-error">{formErrors.city}</span>}
                      </div>

                      {buyerType === 'foreign' ? (
                        <div className="form-group-checkout">
                          <label>Country *</label>
                          <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            placeholder="e.g. Germany"
                          />
                          {formErrors.country && <span className="field-error">{formErrors.country}</span>}
                        </div>
                      ) : (
                        <div className="form-group-checkout">
                          <label>Country</label>
                          <input type="text" readOnly value="Sri Lanka (Local Delivery)" className="input-readonly" />
                        </div>
                      )}
                    </div>

                    {/* Shipping Method Selector */}
                    <div className="shipping-method-selector-box">
                      <label className="selector-title-lbl">Preferred Transport Method</label>
                      <div className="shipping-radio-options">
                        {buyerType === 'local' ? (
                          <label className="shipping-radio-lbl active">
                            <input
                              type="radio"
                              name="shippingMethod"
                              value="local"
                              checked={formData.shippingMethod === 'local'}
                              onChange={handleInputChange}
                            />
                            <div>
                              <strong>🏪 Local Delivery / Courier Pickup</strong>
                              <span>Delivered inside Sri Lanka (3-5 Days)</span>
                            </div>
                            <span className="ship-price">{currencySymbol}{shippingFees.local}</span>
                          </label>
                        ) : (
                          <>
                            <label className={`shipping-radio-lbl ${formData.shippingMethod === 'sea' ? 'active' : ''}`}>
                              <input
                                type="radio"
                                name="shippingMethod"
                                value="sea"
                                checked={formData.shippingMethod === 'sea'}
                                onChange={handleInputChange}
                              />
                              <div>
                                <strong>🚢 Sea Freight Export</strong>
                                <span>Most economical for bulk, delivered in 25–40 days</span>
                              </div>
                              <span className="ship-price">FREE</span>
                            </label>

                            <label className={`shipping-radio-lbl ${formData.shippingMethod === 'air' ? 'active' : ''}`}>
                              <input
                                type="radio"
                                name="shippingMethod"
                                value="air"
                                checked={formData.shippingMethod === 'air'}
                                onChange={handleInputChange}
                              />
                              <div>
                                <strong>✈️ Express Air Cargo</strong>
                                <span>Fast delivery, perfect for samples (5–10 days)</span>
                              </div>
                              <span className="ship-price">{currencySymbol}{shippingFees.air}</span>
                            </label>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="checkout-step-actions">
                    <button className="btn btn--primary" onClick={handleNextStep1}>
                      <span>Select Payment Method</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Method */}
              {step === 2 && (
                <div className="checkout-step-panel">
                  <h4>Choose Payment Option</h4>
                  <p className="payment-guide-info">
                    Select your preferred transaction channel. Gateway interactions are fully simulated in this demo.
                  </p>

                  <div className="payment-mode-list">
                    <label className={`payment-mode-card-lbl ${formData.paymentMode === 'card' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMode"
                        value="card"
                        checked={formData.paymentMode === 'card'}
                        onChange={handleInputChange}
                      />
                      <span className="payment-icon">💳</span>
                      <div>
                        <strong>Online Card Payment (Visa, Mastercard, AMEX)</strong>
                        <span>Secure simulated connection. Instant receipt.</span>
                      </div>
                    </label>

                    <label className={`payment-mode-card-lbl ${formData.paymentMode === 'bank' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMode"
                        value="bank"
                        checked={formData.paymentMode === 'bank'}
                        onChange={handleInputChange}
                      />
                      <span className="payment-icon">🏦</span>
                      <div>
                        <strong>Direct Bank Transfer / Wire Transfer (T/T)</strong>
                        <span>Receive bank instructions in receipt to transfer manually.</span>
                      </div>
                    </label>

                    {buyerType === 'local' && (
                      <label className={`payment-mode-card-lbl ${formData.paymentMode === 'cod' ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="paymentMode"
                          value="cod"
                          checked={formData.paymentMode === 'cod'}
                          onChange={handleInputChange}
                        />
                        <span className="payment-icon">💵</span>
                        <div>
                          <strong>Cash on Delivery (COD)</strong>
                          <span>Pay in LKR currency when delivery agent arrives.</span>
                        </div>
                      </label>
                    )}
                  </div>

                  <div className="checkout-step-actions checkout-step-actions--double">
                    <button className="btn btn--ghost" onClick={() => setStep(1)}>
                      <ArrowLeft size={16} />
                      <span>Back to Address</span>
                    </button>
                    <button className="btn btn--primary" onClick={handleNextStep2}>
                      <span>
                        {formData.paymentMode === 'card' ? 'Enter Card Details' : 'Place Order'}
                      </span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Virtual Card Details */}
              {step === 3 && (
                <div className="checkout-step-panel">
                  <h4>Simulated Card Credentials</h4>
                  
                  {/* Virtual card illustration */}
                  <div className="virtual-card-perspective">
                    <div className={`virtual-card-face ${isCardFlipped ? 'virtual-card-face--flipped' : ''}`}>
                      {/* Front */}
                      <div className="virtual-card-front">
                        <div className="card-logo-overlay">🌿 Lanka Spice Reserve</div>
                        <div className="card-chip"></div>
                        <strong className="card-number-display">
                          {cardNumber || '•••• •••• •••• ••••'}
                        </strong>
                        <div className="card-details-row">
                          <div className="card-holder-label-box">
                            <span>CARDHOLDER NAME</span>
                            <strong>{cardName.toUpperCase() || 'YOUR NAME'}</strong>
                          </div>
                          <div className="card-expiry-label-box">
                            <span>EXPIRES</span>
                            <strong>{cardExpiry || 'MM/YY'}</strong>
                          </div>
                        </div>
                        <div className="card-type-mark">VISA</div>
                      </div>

                      {/* Back */}
                      <div className="virtual-card-back">
                        <div className="card-magnetic-strip"></div>
                        <div className="card-signature-box">
                          <div className="signature-area"></div>
                          <span className="cvv-display-tag">{cardCvv || '•••'}</span>
                        </div>
                        <p className="card-legal-disclaimer">
                          This is a fully simulated secure sandboxed card for Ceylon Spice Reserve web development.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Input Card Form Fields */}
                  <form onSubmit={handlePayNow} className="card-details-form">
                    <div className="form-group-checkout">
                      <label>Cardholder Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kasun Silva"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        onFocus={() => setIsCardFlipped(false)}
                      />
                    </div>

                    <div className="form-group-checkout">
                      <label>Card Number</label>
                      <div className="card-input-with-icon">
                        <CreditCard className="icon-card-input" size={16} />
                        <input
                          type="text"
                          required
                          placeholder="4111 2222 3333 4444"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          onFocus={() => setIsCardFlipped(false)}
                        />
                      </div>
                    </div>

                    <div className="form-row-half">
                      <div className="form-group-checkout">
                        <label>Expiration Date</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          onFocus={() => setIsCardFlipped(false)}
                        />
                      </div>

                      <div className="form-group-checkout">
                        <label>CVV Code</label>
                        <input
                          type="password"
                          required
                          placeholder="•••"
                          value={cardCvv}
                          onChange={handleCvvChange}
                          onFocus={() => setIsCardFlipped(true)}
                          onBlur={() => setIsCardFlipped(false)}
                        />
                      </div>
                    </div>

                    <div className="checkout-step-actions checkout-step-actions--double">
                      <button type="button" className="btn btn--ghost" onClick={() => setStep(2)}>
                        <ArrowLeft size={16} />
                        <span>Back</span>
                      </button>
                      <button type="submit" className="btn btn--gold">
                        <Lock size={14} />
                        <span>Pay {currencySymbol}{grandTotal.toLocaleString()}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 4: SMS OTP Verification */}
              {step === 4 && (
                <div className="checkout-step-panel checkout-otp-panel">
                  <ShieldCheck size={48} className="icon-otp-shield animate-float" />
                  <h4>Simulated SMS Verification</h4>
                  <p>
                    A simulated verification message with a 6-digit OTP code was sent to{' '}
                    <strong>{formData.phone}</strong>.
                  </p>

                  <form onSubmit={handleVerifyOtp} className="otp-verification-form">
                    <div className="form-group-checkout">
                      <label>Enter SMS OTP Code</label>
                      <input
                        type="text"
                        required
                        className="otp-code-input"
                        placeholder="123456"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      />
                    </div>
                    <small className="otp-help-text">Try entering <strong>123456</strong> to complete.</small>

                    <div className="checkout-step-actions checkout-step-actions--double">
                      <button type="button" className="btn btn--ghost" onClick={() => setStep(3)}>
                        <span>Back</span>
                      </button>
                      <button type="submit" className="btn btn--gold">
                        <span>Verify & Complete</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 5: Receipt Screen */}
              {step === 5 && (
                <div className="checkout-step-panel invoice-panel">
                  <div className="invoice-success-stamp">
                    <CheckCircle size={44} className="icon-success-check" />
                    <h4>Order Placed Successfully!</h4>
                    <span className="invoice-id">Invoice ID: #LSR-{Math.floor(10000 + Math.random() * 90000)}</span>
                  </div>

                  <div className="invoice-summary-sheet">
                    <div className="invoice-details-block">
                      <div>
                        <strong>Billed To:</strong>
                        <p>{formData.name}</p>
                        <p>{formData.email}</p>
                        <p>{formData.phone}</p>
                      </div>
                      <div className="text-right">
                        <strong>Shipping Address:</strong>
                        <p>{formData.address}</p>
                        <p>{formData.city}, {formData.country || 'Sri Lanka'}</p>
                        <p>Method: {formData.shippingMethod === 'sea' ? 'Sea Freight' : formData.shippingMethod === 'air' ? 'Air Freight' : 'Local Courier'}</p>
                      </div>
                    </div>

                    <div className="invoice-items-table">
                      <div className="inv-table-header">
                        <span>Product Grade</span>
                        <span className="text-center">Qty</span>
                        <span className="text-right">Total</span>
                      </div>
                      <div className="inv-table-body">
                        {cart.map((item) => (
                          <div key={item.key} className="inv-table-row">
                            <span>
                              {item.name} <small>({item.grade})</small>
                            </span>
                            <span className="text-center">
                              {item.quantity} {item.unit}
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
                            {selectedShippingFee === 0 ? 'FREE' : `${currencySymbol}${selectedShippingFee.toLocaleString()}`}
                          </span>
                        </div>
                      </div>
                      <div className="inv-table-footer">
                        <span>Grand Total Paid</span>
                        <strong className="text-right">
                          {currencySymbol}{grandTotal.toLocaleString()}
                        </strong>
                      </div>
                    </div>

                    {/* Step instruction depending on payment type */}
                    <div className="payment-instructions-box">
                      {formData.paymentMode === 'card' ? (
                        <p>
                          ✅ <strong>Payment Verified:</strong> Your card transaction has been completed successfully via our secure simulated gateway.
                        </p>
                      ) : formData.paymentMode === 'bank' ? (
                        <div className="bank-details-instructions">
                          <p>⚠️ <strong>Manual Bank Transfer Required:</strong> Please transfer the total amount to the account below:</p>
                          <ul>
                            <li><strong>Bank Name:</strong> Bank of Ceylon (BOC)</li>
                            <li><strong>Branch Name:</strong> Galle Fort Branch</li>
                            <li><strong>Account Number:</strong> 0087-2009-4112</li>
                            <li><strong>Account Name:</strong> Ceylon Spice Reserve Estates</li>
                            <li><strong>Wise Transfer Details:</strong> wise@ceylonspicereserve.lk</li>
                          </ul>
                        </div>
                      ) : (
                        <p>
                          💵 <strong>Cash on Delivery (COD) Registered:</strong> Our logistics partner will collect <strong>{currencySymbol}{grandTotal.toLocaleString()}</strong> in cash upon delivery.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="receipt-next-actions">
                    <p className="invoice-final-notice">
                      📧 A confirmation email with receipt and tracking details has been sent to <strong>{formData.email}</strong>.
                    </p>
                    <button className="btn btn--gold btn-close-checkout-receipt" onClick={handleCloseReceipt}>
                      Close & Finish
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
