import React, { useState } from 'react';
import { getCarImage } from './carImages';

const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric', 'Petrol', 'Hybrid', 'Diesel', 'Electric'];
const transmissions = ['Automatic', 'Manual', 'CVT', 'DCT', 'Automatic', 'PDK', 'Manual', 'Automatic'];

const CarCard = ({ car, index, onViewSpecs, onAddToCart, inCart }) => {
  const [hovered, setHovered] = useState(false);
  const price = ((car.Model_ID % 30) + 25) * 1000 + 900;
  const year = 2021 + (car.Model_ID % 5);
  const fuel = fuelTypes[index % fuelTypes.length];
  const trans = transmissions[index % transmissions.length];
  const image = getCarImage(car.Model_ID);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${hovered ? 'var(--border-accent)' : 'var(--border)'}`,
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: hovered ? `var(--shadow-card), var(--shadow-glow)` : 'var(--shadow-card)',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        animation: `fadeInUp 0.5s ease ${index * 0.05}s both`,
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '180px', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
        <img
          src={image}
          alt={car.Model_Name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />
        {/* Overlay gradient */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(to top, var(--bg-card), transparent)' }} />
        {/* Year badge */}
        <div style={{ position: 'absolute', top: '10px', left: '10px' }} className="badge badge-accent">
          {year}
        </div>
        {inCart && (
          <div style={{ position: 'absolute', top: '10px', right: '10px' }} className="badge badge-green">
            ✓ IN CART
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1.1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
        <div>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            {car.Make_Name}
          </p>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, letterSpacing: '0.02em', lineHeight: 1.2, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {car.Model_Name}
          </h3>
        </div>

        {/* Specs row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          {[
            { label: 'Fuel', value: fuel },
            { label: 'Trans.', value: trans },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--bg-elevated)', borderRadius: '4px', padding: '0.4rem 0.6rem', border: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '2px' }}>{s.label.toUpperCase()}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--text-muted)' }}>FROM</span>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.2rem', fontWeight: 700, color: 'var(--green)' }}>
              ${price.toLocaleString()}
            </div>
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--text-muted)' }}>
            ID: {car.Model_ID}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
          <button
            onClick={() => onViewSpecs(car)}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: '0.55rem',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontFamily: 'Rajdhani, sans-serif',
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
          >
            View Specifications
          </button>
          <button
            onClick={() => onAddToCart(car)}
            disabled={inCart}
            style={{
              background: inCart ? 'var(--surface)' : 'var(--accent)',
              border: `1px solid ${inCart ? 'var(--border)' : 'var(--accent)'}`,
              borderRadius: '4px',
              padding: '0.55rem',
              color: inCart ? 'var(--text-muted)' : '#fff',
              cursor: inCart ? 'not-allowed' : 'pointer',
              fontFamily: 'Rajdhani, sans-serif',
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              transition: 'all 0.2s ease',
              boxShadow: inCart ? 'none' : '0 0 12px var(--accent-glow)',
            }}
          >
            {inCart ? '✓ Added to Cart' : 'Reserve Vehicle'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
