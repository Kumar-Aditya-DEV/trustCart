import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [navSearchQuery, setNavSearchQuery] = useState('');

  const isActive = (path) => location.pathname === path;

  const handleNavSearch = (e) => {
    if (e.key === 'Enter' && navSearchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(navSearchQuery.trim())}`);
      setNavSearchQuery('');
    }
  };

  return (
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
          <div className="flex gap-4 items-center">
            <NavIconButton icon="notifications" />
            <NavIconButton icon="shopping_cart" />
          </div>
        </div>
      </div>
    </nav>
  );
};

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

const NavIconButton = ({ icon }) => (
  <button className="text-slate-400 hover:text-cyan-200 active:scale-95 transition-transform bg-transparent border-none cursor-pointer">
    <span className="material-symbols-outlined">{icon}</span>
  </button>
);

export default Navbar;
