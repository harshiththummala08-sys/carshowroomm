import React from 'react';
import { getCarImage } from './carImages';

const CartView = ({ cartItems, onRemove, onBack, onCheckout }) => {
  const orderTotal = cartItems.reduce((acc, item) => acc + ((item.Model_ID % 30) + 25000), 0);

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <div className="section-label">Your Selection</div>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.5rem', letterSpacing: '0.05em', lineHeight: 1 }}>
            Order Cart
          </h2>
        </div>
        <button onClick={onBack} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '4px', padding: '0.4rem 1rem', color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}>
          ← Back
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '4rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏎</div>
          <p style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', letterSpacing: '0.1em' }}>NO VEHICLES SELECTED</p>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Browse the showroom floor to add vehicles to your order.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cartItems.map((item) => {
            const price = (item.Model_ID % 30) + 25000;
            return (
              <div key={item.Model_ID} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                boxShadow: 'var(--shadow-card)',
              }}>
                <img src={getCarImage(item.Model_ID)} alt={item.Model_Name} style={{ width: '100px', height: '68px', objectFit: 'cover', borderRadius: '5px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{item.Make_Name}</p>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{item.Model_Name}</h4>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.1rem', fontWeight: 700, color: 'var(--green)', marginBottom: '0.35rem' }}>
                    ${price.toLocaleString()}
                  </div>
                  <button
                    onClick={() => onRemove(item.Model_ID)}
                    style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '3px', padding: '0.2rem 0.6rem', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                  >REMOVE</button>
                </div>
              </div>
            );
          })}

          {/* Total + Checkout */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-accent)',
            borderRadius: '8px',
            padding: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '0.5rem',
            boxShadow: '0 0 24px var(--accent-glow)',
          }}>
            <div>
              <div className="section-label">Total Invoice</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '2.2rem', fontWeight: 700, color: 'var(--green)', lineHeight: 1 }}>
                ${orderTotal.toLocaleString()}
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                {cartItems.length} vehicle{cartItems.length !== 1 ? 's' : ''} · Delivery included
              </div>
            </div>
            <button
              onClick={onCheckout}
              style={{ background: 'var(--accent)', border: 'none', borderRadius: '5px', padding: '0.85rem 2rem', color: '#fff', cursor: 'pointer', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: '0 4px 20px var(--accent-glow)', transition: 'all 0.25s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-hover)'; e.currentTarget.style.transform = 'scale(1.03)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;
