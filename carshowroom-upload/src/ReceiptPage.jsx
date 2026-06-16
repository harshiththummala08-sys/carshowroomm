import React from 'react';

const ReceiptPage = ({ cartItems, customerInfo, onHomeReturn }) => {
  const orderTotal = cartItems.reduce((acc, item) => acc + ((item.Model_ID % 30) + 25000), 0);
  const invoiceNumber = React.useRef(Math.floor(100000 + Math.random() * 900000)).current;
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', animation: 'fadeInUp 0.4s ease' }}>

      {/* Controls bar - hidden on print */}
      <div className="no-print" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '1rem 1.5rem',
        marginBottom: '1.5rem',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.1rem' }}>✅</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--green)', letterSpacing: '0.1em' }}>INVOICE GENERATED SUCCESSFULLY</span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={onHomeReturn} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', padding: '0.45rem 1rem', color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.2s' }}>
            ← New Order
          </button>
          <button onClick={() => window.print()} style={{ background: 'var(--accent)', border: 'none', borderRadius: '4px', padding: '0.45rem 1.25rem', color: '#fff', cursor: 'pointer', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', boxShadow: '0 4px 12px var(--accent-glow)', transition: 'all 0.2s' }}>
            🖨 Print Invoice
          </button>
        </div>
      </div>

      {/* Invoice document */}
      <div className="print-doc" style={{
        background: '#ffffff',
        color: '#000',
        borderRadius: '10px',
        padding: '3rem',
        boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
        border: '1px solid #e5e7eb',
        fontFamily: "'Rajdhani', sans-serif",
      }}>

        {/* Letterhead */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '3px solid #111', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.2rem', letterSpacing: '0.06em', color: '#dc2626', lineHeight: 1 }}>
              DRIVEX <span style={{ color: '#111' }}>SHOWROOM</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#6b7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '4px' }}>
              Authorized Premium Automotive Distribution
            </div>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '2px' }}>
              100 Premium Terminal Way, Suite A · www.drivex.auto
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.3rem', letterSpacing: '0.08em', color: '#374151' }}>
              Bill of Sale
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#6b7280', marginTop: '4px' }}>
              Invoice #{invoiceNumber}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{currentDate}</div>
          </div>
        </div>

        {/* Client info grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem', background: '#f9fafb', padding: '1rem 1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
          <div>
            <div style={{ fontSize: '0.6rem', fontFamily: 'monospace', color: '#9ca3af', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Purchaser</div>
            <div style={{ fontWeight: 700, color: '#111', fontSize: '1.05rem' }}>{customerInfo.name}</div>
            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{customerInfo.phone}</div>
            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{customerInfo.email}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.6rem', fontFamily: 'monospace', color: '#9ca3af', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Payment</div>
            <div style={{ fontWeight: 700, color: '#111', fontSize: '0.95rem' }}>{customerInfo.payment}</div>
            <span style={{ display: 'inline-block', background: '#dcfce7', color: '#166534', fontSize: '0.6rem', fontFamily: 'monospace', letterSpacing: '0.1em', padding: '2px 8px', borderRadius: '2px', marginTop: '4px', fontWeight: 700 }}>
              PENDING CLEARANCE
            </span>
          </div>
        </div>

        {/* Line items table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #111' }}>
              {['Vehicle Description', 'Qty', 'MSRP'].map(h => (
                <th key={h} style={{ padding: '0.6rem 0', textAlign: h === 'Qty' ? 'center' : h === 'MSRP' ? 'right' : 'left', fontFamily: 'monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b7280', fontWeight: 700 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, i) => {
              const itemPrice = (item.Model_ID % 30) + 25000;
              return (
                <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.8rem 0' }}>
                    <div style={{ fontWeight: 700, color: '#111' }}>{item.Model_Name}</div>
                    <div style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {item.Make_Name} · Model ID: {item.Model_ID}
                    </div>
                  </td>
                  <td style={{ textAlign: 'center', color: '#374151', fontWeight: 600 }}>1</td>
                  <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 700, color: '#111' }}>${itemPrice.toLocaleString()}.00</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Totals */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem' }}>
          <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280' }}>
              <span>Subtotal</span>
              <span style={{ fontFamily: 'monospace' }}>${orderTotal.toLocaleString()}.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280' }}>
              <span>Delivery & Logistics</span>
              <span style={{ fontFamily: 'monospace', color: '#059669', fontWeight: 700 }}>Waived</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem', color: '#111', borderTop: '2px solid #111', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
              <span>Grand Total</span>
              <span style={{ fontFamily: 'monospace', color: '#dc2626' }}>${orderTotal.toLocaleString()}.00</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '3rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.25rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.7rem', color: '#9ca3af' }}>
            Thank you for choosing DriveX Showroom. All vehicle transfers are subject to regional licensing regulations.
          </p>
          <p style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: '#d1d5db', marginTop: '0.3rem' }}>
            Computer-generated document — No physical signature required.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;
