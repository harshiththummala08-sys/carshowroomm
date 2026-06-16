import React from 'react';
import { getCarImage } from './carImages';

const CarSpecsPage = ({ car, onBack, onAddToCart, inCart }) => {
  if (!car) return null;

  const price = ((car.Model_ID % 30) + 25) * 1000 + 900;
  const year = 2021 + (car.Model_ID % 5);
  const image = getCarImage(car.Model_ID);

  const specs = [
    { label: 'Make', value: car.Make_Name },
    { label: 'Model', value: car.Model_Name },
    { label: 'Year', value: year },
    { label: 'Status', value: 'In Stock', highlight: 'green' },
    { label: 'MSRP', value: `$${price.toLocaleString()}`, highlight: 'green' },
    { label: 'Inventory ID', value: `#${car.Model_ID}`, mono: true },
    { label: 'Transmission', value: car.Model_ID % 2 === 0 ? 'Automatic' : 'Manual' },
    { label: 'Drivetrain', value: car.Model_ID % 3 === 0 ? 'AWD' : car.Model_ID % 3 === 1 ? 'RWD' : 'FWD' },
    { label: 'Fuel Type', value: car.Model_ID % 4 === 0 ? 'Electric' : car.Model_ID % 4 === 1 ? 'Hybrid' : car.Model_ID % 4 === 2 ? 'Diesel' : 'Petrol' },
    { label: 'Warranty', value: '5 Years / 100,000 km' },
  ];

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <button
        onClick={onBack}
        style={{
          background: 'none',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          padding: '0.4rem 1rem',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          fontFamily: 'Rajdhani, sans-serif',
          fontWeight: 700,
          fontSize: '0.8rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
      >
        ← Back to Catalog
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
        {/* Image Panel */}
        <div style={{ position: 'relative', minHeight: '400px', background: 'var(--bg-secondary)' }}>
          <img src={image} alt={car.Model_Name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '400px' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem', background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}>
            <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.5rem', color: 'white', letterSpacing: '0.05em', lineHeight: 1, display: 'block' }}>
              {car.Model_Name}
            </span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em' }}>
              {car.Make_Name.toUpperCase()} · {year}
            </span>
          </div>
        </div>

        {/* Specs Panel */}
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <div className="section-label">Vehicle Specifications</div>
            <div className="divider" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {specs.map((s, i) => (
              <div key={s.label} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.6rem 0',
                borderBottom: i < specs.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {s.label}
                </span>
                <span style={{
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  fontFamily: s.mono ? 'JetBrains Mono, monospace' : 'Rajdhani, sans-serif',
                  color: s.highlight === 'green' ? 'var(--green)' : 'var(--text-primary)',
                  letterSpacing: s.mono ? '0.05em' : '0.02em',
                }}>
                  {String(s.value)}
                </span>
              </div>
            ))}
          </div>

          {/* Price display */}
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="section-label" style={{ marginBottom: '0.2rem' }}>Total MSRP</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '2rem', fontWeight: 700, color: 'var(--green)', lineHeight: 1 }}>
                ${price.toLocaleString()}
              </div>
            </div>
            <div className="badge badge-green">In Stock</div>
          </div>

          <button
            onClick={() => onAddToCart(car)}
            disabled={inCart}
            style={{
              background: inCart ? 'var(--surface)' : 'var(--accent)',
              border: `1px solid ${inCart ? 'var(--border)' : 'transparent'}`,
              borderRadius: '5px',
              padding: '0.9rem 1.5rem',
              color: inCart ? 'var(--text-muted)' : '#fff',
              cursor: inCart ? 'not-allowed' : 'pointer',
              fontFamily: 'Rajdhani, sans-serif',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              transition: 'all 0.25s ease',
              boxShadow: inCart ? 'none' : '0 4px 20px var(--accent-glow)',
            }}
          >
            {inCart ? '✓ Vehicle Reserved in Cart' : 'Reserve This Vehicle →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarSpecsPage;
