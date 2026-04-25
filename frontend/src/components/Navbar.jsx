import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [navSearchQuery, setNavSearchQuery] = useState('');
  const { 
    totalItems, 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    totalPrice,
    isCartOpen,
    setIsCartOpen,
    isNotifyOpen,
    setIsNotifyOpen 
  } = useCart();

  const isActive = (path) => location.pathname === path;

  const handleNavSearch = (e) => {
    if (e.key === 'Enter' && navSearchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(navSearchQuery.trim())}`);
      setNavSearchQuery('');
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl shadow-[0_0_15px_rgba(0,229,255,0.1)]">
        <div className="flex justify-between items-center px-8 py-4 w-full max-w-none">
          <div className="flex items-center gap-12">
            <Link to="/home" className="text-2xl font-bold bg-gradient-to-r from-cyan-200 to-cyan-400 bg-clip-text text-transparent font-headline tracking-tight">
              TrustCart
            </Link>
            <div className="hidden md:flex gap-8 items-center">
              <NavLink to="/home" label="Home" active={isActive('/home') || isActive('/')} />
              <NavLink to="/verify" label="Verify" active={isActive('/verify')} />
              <NavLink to="/stores" label="Stores" active={isActive('/stores')} />
              <NavLink to="/account" label="Account" active={isActive('/account')} />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center bg-surface-container-low rounded-full px-4 py-1.5 border border-outline-variant/20">
              <span className="material-symbols-outlined text-sm text-slate-400">search</span>
              <input 
                className="bg-transparent border-none focus:ring-0 outline-none text-sm text-on-surface w-48 font-label" 
                placeholder="Search catalog..." 
                type="text" 
                value={navSearchQuery}
                onChange={(e) => setNavSearchQuery(e.target.value)}
                onKeyDown={handleNavSearch}
              />
            </div>
            <div className="flex gap-4 items-center relative">
              <NavIconButton 
                icon="notifications" 
                badge={2} 
                onClick={() => {
                  setIsNotifyOpen(!isNotifyOpen);
                  setIsCartOpen(false);
                }}
              />
              <NavIconButton 
                icon="shopping_cart" 
                badge={totalItems} 
                onClick={() => {
                  setIsCartOpen(!isCartOpen);
                  setIsNotifyOpen(false);
                }}
              />

              {/* Notification Dropdown */}
              {isNotifyOpen && (
                <div className="absolute top-full right-10 mt-4 w-80 glass-panel rounded-2xl shadow-2xl z-[60] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="p-4 border-b border-outline-variant/20 flex justify-between items-center">
                    <h3 className="font-headline font-bold text-sm text-on-surface">Neural Alerts</h3>
                    <span className="text-[10px] font-label text-primary uppercase">2 New</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <NotificationItem 
                      title="Authentication Success" 
                      time="2m ago" 
                      desc="Your AeroVance Obsidian v1 was verified on-chain."
                      icon="verified"
                      color="text-primary"
                    />
                    <NotificationItem 
                      title="Price Flux Alert" 
                      time="15m ago" 
                      desc="NeuralWatch Nexus price dropped by 5% in your sector."
                      icon="trending_down"
                      color="text-secondary"
                    />
                  </div>
                  <div className="p-3 bg-surface-variant/30 text-center">
                    <button className="text-[10px] font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest">Clear All Terminals</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100] transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Cart Drawer */}
      <aside className={`fixed top-0 right-0 h-full w-full md:w-[400px] z-[110] bg-surface/90 backdrop-blur-2xl border-l border-outline-variant/20 shadow-2xl transition-transform duration-500 ease-out transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-headline font-bold text-on-surface">Secure Cart</h2>
              <p className="text-xs text-slate-500 font-label uppercase tracking-tighter">{totalItems} Verified Items</p>
            </div>
            <button onClick={() => setIsCartOpen(false)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors text-on-surface">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                <span className="material-symbols-outlined text-6xl">shopping_basket</span>
                <p className="font-headline text-lg">Your cargo bay is empty.</p>
                <button onClick={() => setIsCartOpen(false)} className="text-primary text-sm font-bold uppercase tracking-widest hover:underline">Scan for products</button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-20 h-20 rounded-lg bg-surface-container-high overflow-hidden border border-outline-variant/10">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex justify-between items-start">
                      <h4 className="font-headline font-bold text-sm text-on-surface leading-tight">{item.title}</h4>
                      <button onClick={() => removeFromCart(item.id)} className="text-slate-500 hover:text-error transition-colors">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                    <p className="text-[10px] text-primary font-label uppercase mb-2">{item.category}</p>
                    <div className="flex justify-between items-center mt-2">
                       <div className="flex items-center gap-3 bg-surface-container-low rounded-lg px-2 py-1 border border-outline-variant/10">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-slate-400 hover:text-primary transition-colors text-xs disabled:opacity-30" disabled={item.quantity <= 1}>
                            <span className="material-symbols-outlined text-sm">remove</span>
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-slate-400 hover:text-primary transition-colors text-xs">
                            <span className="material-symbols-outlined text-sm">add</span>
                          </button>
                       </div>
                       <span className="font-headline font-bold text-on-surface">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-6 bg-surface-container-high/50 border-t border-outline-variant/20 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Security & Tax Flux:</span>
                <span className="text-on-surface">$0.00</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="font-headline font-bold text-lg text-on-surface uppercase tracking-tight">Total Value</span>
                <div className="text-right">
                  <span className="text-2xl font-headline font-black text-primary">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/checkout');
                }}
                className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary py-4 rounded-xl font-bold uppercase tracking-widest shadow-[0_10px_20px_rgba(0,229,255,0.3)] hover:shadow-[0_15px_30px_rgba(0,229,255,0.4)] transition-all active:scale-[0.98]"
              >
                Secure Checkout
              </button>
              <p className="text-[10px] text-center text-slate-500 font-label">All transactions encrypted via TrustChain v4.2</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

const NotificationItem = ({ title, time, desc, icon, color }) => (
  <div className="p-4 border-b border-outline-variant/10 hover:bg-surface-variant/30 transition-colors cursor-pointer text-left">
    <div className="flex gap-3">
      <div className={`w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center ${color}`}>
        <span className="material-symbols-outlined text-sm">{icon}</span>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-headline font-bold text-[12px] text-on-surface tracking-tight">{title}</h4>
          <span className="text-[9px] font-label text-slate-500">{time}</span>
        </div>
        <p className="text-[11px] text-on-surface-variant leading-relaxed">{desc}</p>
      </div>
    </div>
  </div>
);

const NavLink = ({ to, label, active }) => (
  <Link 
    to={to} 
    className={`${
      active 
        ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1' 
        : 'text-slate-400 hover:text-cyan-200'
    } transition-colors font-headline tracking-tight font-medium`}
  >
    {label}
  </Link>
);

const NavIconButton = ({ icon, badge, onClick }) => (
  <button 
    onClick={onClick}
    className="relative text-slate-400 hover:text-cyan-200 active:scale-95 transition-all bg-transparent border-none cursor-pointer p-2"
  >
    <span className="material-symbols-outlined text-2xl">{icon}</span>
    {badge > 0 && (
      <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-on-primary text-[8px] font-black rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(0,229,255,0.5)]">
        {badge}
      </span>
    )}
  </button>
);

export default Navbar;
