import React from 'react';

const brands = [
  { name: 'BMW', emoji: '🇩🇪' },
  { name: 'Mercedes-Benz', emoji: '⭐' },
  { name: 'Audi', emoji: '🔘' },
  { name: 'Toyota', emoji: '🇯🇵' },
  { name: 'Honda', emoji: '🏁' },
  { name: 'Ford', emoji: '🇺🇸' },
  { name: 'Tesla', emoji: '⚡' },
  { name: 'Porsche', emoji: '🏆' },
];

const CarFilters = ({ selectedMake, setSelectedMake }) => {
  return (
    <div style={{
      marginBottom: '2.5rem',
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      padding: '1.5rem',
      boxShadow: 'var(--shadow-card)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <div className="section-label" style={{ marginBottom: 0 }}>Manufacturer</div>
        <div style={{ height: '1px', flex: 1, background: 'var(--border)', minWidth: '40px' }} />
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
          SELECTED: <span style={{ color: 'var(--accent)' }}>{selectedMake.toUpperCase()}</span>
        </span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
        {brands.map((b) => {
          const isActive = selectedMake === b.name;
          return (
            <button
              key={b.name}
              onClick={() => setSelectedMake(b.name)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 1rem',
                borderRadius: '3px',
                border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                background: isActive ? 'var(--accent)' : 'var(--surface)',
                color: isActive ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontFamily: 'Rajdhani, sans-serif',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 0 16px var(--accent-glow)' : 'none',
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--text-primary)'; }}}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}}
            >
              <span style={{ fontSize: '0.9rem' }}>{b.emoji}</span>
              {b.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CarFilters;
