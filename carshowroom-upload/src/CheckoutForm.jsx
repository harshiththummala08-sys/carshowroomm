import React from 'react';

const inputStyle = {
  width: '100%',
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border)',
  borderRadius: '4px',
  padding: '0.7rem 0.9rem',
  color: 'var(--text-primary)',
  fontFamily: 'Rajdhani, sans-serif',
  fontSize: '1rem',
  fontWeight: 500,
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
};

const labelStyle = {
  display: 'block',
  fontFamily: 'JetBrains Mono, monospace',
  fontSize: '0.6rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  marginBottom: '0.4rem',
};

const CheckoutForm = ({ customerInfo, setCustomerInfo, onBack, onOrderSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      alert('Please fill in all required fields.');
      return;
    }
    onOrderSubmit();
  };

  return (
    <div style={{ maxWidth: '580px', margin: '0 auto', animation: 'fadeInUp 0.4s ease' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div className="section-label">Secure Checkout</div>
        <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.5rem', letterSpacing: '0.05em', lineHeight: 1 }}>
          Buyer Information
        </h2>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', padding: '2rem', boxShadow: 'var(--shadow-card)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          <div>
            <label style={labelStyle}>Full Legal Name *</label>
            <input type="text" name="name" value={customerInfo.name} onChange={handleChange} placeholder="John Doe" style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          <div>
            <label style={labelStyle}>Email Address *</label>
            <input type="email" name="email" value={customerInfo.email} onChange={handleChange} placeholder="john@example.com" style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          <div>
            <label style={labelStyle}>Contact Phone *</label>
            <input type="tel" name="phone" value={customerInfo.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          <div>
            <label style={labelStyle}>Payment Method</label>
            <select name="payment" value={customerInfo.payment} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            >
              <option value="Bank Wire Transfer">Bank Wire Transfer</option>
              <option value="Cash / Financing">Cash / Financing</option>
              <option value="Crypto Asset Remittance">Crypto Asset Remittance</option>
              <option value="Corporate Fleet Account">Corporate Fleet Account</option>
            </select>
          </div>

          <div style={{ height: '1px', background: 'var(--border)', margin: '0.5rem 0' }} />

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="button" onClick={onBack} style={{
              flex: 1, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px',
              padding: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer',
              fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.2s'
            }}>
              ← Back
            </button>
            <button type="submit" style={{
              flex: 2, background: 'var(--accent)', border: 'none', borderRadius: '4px',
              padding: '0.75rem', color: '#fff', cursor: 'pointer',
              fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              boxShadow: '0 4px 16px var(--accent-glow)', transition: 'all 0.25s ease'
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-hover)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Generate Invoice →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
