import React from 'react';

const themes = [
  { id: 'dark', label: '◉ DARK', color: '#dc2626' },
  { id: 'light', label: '◎ LIGHT', color: '#b91c1c' },
  { id: 'midnight', label: '◉ MIDNIGHT', color: '#6366f1' },
];

const Header = ({ cartCount, onNavigate, currentPage, theme, setTheme }) => {
  return (
    <header style={{
      background: 'var(--nav-blur)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      transition: 'background 0.4s ease',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
        {/* Logo */}
        <div
          onClick={() => onNavigate('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'baseline', gap: '2px', userSelect: 'none', flexShrink: 0 }}
        >
          <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.8rem', letterSpacing: '0.08em', color: 'var(--accent)', lineHeight: 1 }}>DRIVE</span>
          <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.8rem', letterSpacing: '0.08em', color: 'var(--text-primary)', lineHeight: 1 }}>X</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--text-muted)', marginLeft: '6px', letterSpacing: '0.15em', fontWeight: 700 }}>SHOWROOM</span>
        </div>

        {/* Nav + Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Theme Switcher */}
          <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--surface)', borderRadius: '4px', padding: '3px', border: '1px solid var(--border)' }}>
            {themes.map(t => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                title={`Switch to ${t.label} theme`}
                style={{
                  padding: '0.25rem 0.6rem',
                  borderRadius: '3px',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.08em',
                  fontWeight: 700,
                  transition: 'all 0.2s ease',
                  background: theme === t.id ? t.color : 'transparent',
                  color: theme === t.id ? '#fff' : 'var(--text-secondary)',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Floor Nav */}
          <button
            onClick={() => onNavigate('home')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: currentPage === 'home' ? 'var(--accent)' : 'var(--text-secondary)',
              padding: '0.25rem 0.5rem',
              transition: 'color 0.2s',
              borderBottom: currentPage === 'home' ? '2px solid var(--accent)' : '2px solid transparent',
            }}
          >
            Showroom Floor
          </button>

          {/* Cart Button */}
          <button
            onClick={() => onNavigate('cart')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: cartCount > 0 ? 'var(--accent)' : 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: '0.4rem 0.9rem',
              cursor: 'pointer',
              fontFamily: 'Rajdhani, sans-serif',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.05em',
              color: cartCount > 0 ? '#fff' : 'var(--text-primary)',
              transition: 'all 0.25s ease',
            }}
          >
            <span>🏎</span>
            <span>Cart</span>
            {cartCount > 0 && (
              <span style={{
                background: 'rgba(255,255,255,0.25)',
                borderRadius: '2px',
                padding: '0 5px',
                fontSize: '0.7rem',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 700,
              }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Accent stripe */}
      <div style={{ height: '2px', background: 'linear-gradient(90deg, var(--accent) 0%, transparent 70%)', opacity: 0.6 }} />
    </header>
  );
};

export default Header;
