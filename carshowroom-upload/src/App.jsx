import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import CarFilters from './CarFilters';
import CarCard from './CarCard';
import CarSpecsPage from './CarSpecsPage';
import CartView from './CartView';
import CheckoutForm from './CheckoutForm';
import ReceiptPage from './ReceiptPage';

const App = () => {
  const [cars, setCars] = useState([]);
  const [selectedMake, setSelectedMake] = useState('BMW');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCar, setSelectedCar] = useState(null);
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '', payment: 'Bank Wire Transfer' });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? '' : theme);
  }, [theme]);

  useEffect(() => {
    const fetchCarData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${selectedMake}?format=json`
        );
        const data = await response.json();
        setCars(data.Results.slice(0, 8));
      } catch (error) {
        console.error('Error loading vehicle API:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCarData();
  }, [selectedMake]);

  const addToCart = (carItem) => {
    if (!cart.find(item => item.Model_ID === carItem.Model_ID)) {
      setCart([...cart, carItem]);
    }
  };

  const removeFromCart = (modelId) => {
    setCart(cart.filter(item => item.Model_ID !== modelId));
  };

  const clearCart = () => setCart([]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', transition: 'all 0.4s ease' }}>
      <div className="no-print">
        <Header
          cartCount={cart.length}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
          theme={theme}
          setTheme={setTheme}
        />
      </div>

      <div className="page-wrapper">
        <div className="container">
          {currentPage === 'home' && (
            <div style={{ animation: 'fadeInUp 0.5s ease' }}>
              {/* Hero */}
              <div style={{ marginBottom: '3rem', paddingTop: '1rem' }}>
                <div className="section-label">Premium Automotive Collection</div>
                <h1 className="display-font" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 1, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Find Your <span style={{ color: 'var(--accent)' }}>Drive</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '480px', fontWeight: 500 }}>
                  Browse our curated collection of premium vehicles. Configure, inspect, and reserve your next automobile.
                </p>
              </div>

              <CarFilters selectedMake={selectedMake} setSelectedMake={setSelectedMake} />

              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', border: '3px solid var(--surface)', borderTopColor: 'var(--accent)', borderRadius: '50%' }} className="animate-spin" />
                  <span className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>LOADING VEHICLES...</span>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {cars.map((car, index) => (
                    <CarCard
                      key={index}
                      car={car}
                      index={index}
                      onViewSpecs={(chosen) => { setSelectedCar(chosen); setCurrentPage('specs'); }}
                      onAddToCart={addToCart}
                      inCart={!!cart.find(c => c.Model_ID === car.Model_ID)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {currentPage === 'specs' && (
            <CarSpecsPage car={selectedCar} onBack={() => setCurrentPage('home')} onAddToCart={addToCart} inCart={!!cart.find(c => c.Model_ID === selectedCar?.Model_ID)} />
          )}

          {currentPage === 'cart' && (
            <CartView cartItems={cart} onRemove={removeFromCart} onBack={() => setCurrentPage('home')} onCheckout={() => setCurrentPage('checkout')} />
          )}

          {currentPage === 'checkout' && (
            <CheckoutForm customerInfo={customerInfo} setCustomerInfo={setCustomerInfo} onBack={() => setCurrentPage('cart')} onOrderSubmit={() => setCurrentPage('receipt')} />
          )}

          {currentPage === 'receipt' && (
            <ReceiptPage cartItems={cart} customerInfo={customerInfo} onHomeReturn={() => { clearCart(); setCurrentPage('home'); }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
