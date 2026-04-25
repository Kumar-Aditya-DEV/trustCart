import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <Navbar />

      <main className="pt-24 pb-12">
        {/* Hero Section */}
        <section className="px-8 mb-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 py-16">
            <div className="flex-1 z-10 text-left">
              <h1 className="text-6xl font-headline font-bold mb-6 leading-tight tracking-tighter">
                Find products <br />
                <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">near you</span>
              </h1>
              <p className="text-on-surface-variant text-lg mb-8 max-w-lg font-body leading-relaxed">
                Access the global ledger of authenticity. Every item verified, every store audited. The definitive high-tech shield against counterfeit goods.
              </p>
              {/* Large Search Bar */}
              <div className="relative group max-w-2xl">
                <div className="absolute inset-0 bg-primary-container/20 blur-xl group-focus-within:bg-primary-container/40 transition-all rounded-full"></div>
                <div className="relative flex items-center bg-surface-container-high rounded-full p-2 border border-outline-variant/30 shadow-[0_0_15px_rgba(0,229,255,0.05)]">
                  <span className="material-symbols-outlined ml-4 text-primary">search</span>
                  <input
                    className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-on-surface px-4 font-body py-4"
                    placeholder="Enter product name, serial, or SKU..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
                      }
                    }}
                  />
                  <button
                    onClick={() => navigate(`/search?query=${encodeURIComponent(searchQuery)}`)}
                    className="bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold px-8 py-3 rounded-full active:scale-95 transition-transform font-label uppercase tracking-widest text-xs"
                  >
                    Authenticate
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1 relative flex justify-center items-center">
              <div className="absolute w-80 h-80 bg-primary-container/10 rounded-full blur-3xl"></div>
              <div className="relative w-full aspect-square max-w-md rounded-xl overflow-hidden glass-panel border border-outline-variant/20 shadow-2xl">
                <img
                  className="w-full h-full object-cover mix-blend-lighten opacity-80"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDfl5tMJ0ZWqRcOzQ0tD-GmfNDqVyfCeWrls-D5f2bWQHGFIK8s_d_XmNBMXep-6SfmSZGhycayJQTuuI8GdXl2Wk_PoHupAgGtJdjYwkwhJo_XZ-nlx_ueBv2P9u1bPUD1vyRJDXhOyjIX9KmJR9KdV-NMrSqMb-6PnmwEtd3ZvqXIbCaQVDwZ2qCuxjDEOv1aXYhRO921TxlqfY5QpkbqDAAIC0NGbsx4U1DkARw5TxGrjwlkumqVf-sw-qeYbPvvMIIHou0JzY"
                  alt="Holographic interface"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Bento Grid */}
        <section className="px-8 mb-24 max-w-7xl mx-auto text-left">
          <h2 className="text-xs font-label text-primary uppercase tracking-[0.2em] mb-8">Verified Departments</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Link to="/search?category=Skincare" className="md:col-span-2 md-row-span-2 group relative overflow-hidden rounded-xl bg-surface-container-low border border-outline-variant/10 aspect-square md:aspect-auto cursor-pointer block">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI"
                alt="Skincare"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-3xl font-headline font-bold mb-2">Skincare</h3>
                <p className="text-sm text-on-surface-variant font-body">Verified chemical compositions and sourcing.</p>
                <div className="mt-4 text-primary font-label text-xs tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                  EXPLORE <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            </Link>
            <CategorySmallCard
              to="/search?category=Cosmetics"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuArBMvnbps5v50QUfmMRUGnDPGR29sUND8ed1WvfQlPgAaWw6sqHBom2AKQmevVTsE78hDh6bZlCHRcm4tZV0eA2sIEsIfaIJQ8WJX7qjPcuN2jGfoq_7FOTPMWDhDFrdiKrMP3GPOIO1JpWTpQ8tDuOmepOFAfboyT1ATTVGJHJ6rVPT4dvNndqfCfXZVPitTuZh6DuuPM-HgFbh--nfXfsEzelbb1Sx9Xr9PT7lgXhyo5M2PRtdwqLkuG6vHIJFF0PXmlunlBQtY"
              title="Cosmetics"
            />
            <CategorySmallCard
              to="/search?category=Footwear"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuDfj-ocZdSW0q3X5Agg7_Vtnn-8ZGcMU_NG0Skp36dKv6CVZODXj12-XSmG5t3uLlCYfcfGz5TfU5PrwIoV3CGHPdUmyBYSgDFfuWl-ioXjGqwOYfQ7VHOZO-A9jYC62zOD-4hcz4ikvplQFIl2aUt-Dm1Y49k9RHSRPb1T9IRWgL8Lyp4e14B4WXIoXbWHIpyLRfPbPB_jWeY2F150Slnmf3dd_Pql3sO-KpG2lF4Oa1tZJcWimkEHNx_GmQF0qwYce2IbmjEvGKA"
              title="Footwear"
            />
            <Link to="/search?category=Electronics" className="md:col-span-2 group relative overflow-hidden rounded-xl bg-surface-container-low border border-outline-variant/10 h-64 block cursor-pointer">
              <img
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDt70fH3oKVrYdPdU7KLd7l2VjJ2PGKujEgMMzimyGS8lglWYX-vKdYk70YcY-HMp9J0p2zwhHbUwY6t2-VpA2iNWQw_y9Mp9OIa3Oq0n3LsQlaei7UQdyGjBtXvFrh6jWE0BZSw3JlPmST7GZiqfadl191nLClRdETcgAHEwoQuNxPDBAz9lKfcqXf0F6K-IHiakMpg3PRj2K_FI29IKJNzE8dAPypN2Ku-onXIFPdwqCeKc6Bmi-BU7boSWmYykcLQ2N6ARE1Oks"
                alt="Electronics"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-headline font-bold">Electronics</h3>
                <p className="text-sm text-on-surface-variant font-body">Authenticated serial tracking for tech.</p>
              </div>
            </Link>
            <CategorySmallCard
              to="/search?category=Medicine"
              image="/assets/medicine.png"
              title="Medicine"
            />
            <CategorySmallCard
              to="/search?category=Packed Food"
              image="/assets/packed_food.png"
              title="Packed Food"
            />
          </div>
        </section>

        {/* Feature Cards */}
        <section className="px-8 max-w-7xl mx-auto mb-32 text-left">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 grid grid-cols-1 gap-8">
              <FeatureDetailCard
                icon="verified_user"
                title="Immutable Verification"
                desc="Each product contains a cryptographic signature stored on the TrustCart ledger, ensuring 100% origin accuracy."
                active={true}
              />
              <FeatureDetailCard
                icon="qr_code_scanner"
                title="Proximity Audit"
                desc="Detect authorized retailers near your current geolocation instantly. No more guessing on storefront legitimacy."
                offset={true}
              />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-4xl font-headline font-bold mb-6">Built for the <br /><span className="text-primary-container">Integrity Economy</span></h2>
              <p className="text-on-surface-variant mb-10 font-body leading-relaxed">Trust is no longer a promise; it is a mathematical certainty. Our system bridges physical products with digital truth.</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <StatCard label="Verified Items" value="1.2M+" />
                <StatCard label="Global Stores" value="450+" />
                <StatCard label="Error Margin" value="0.01%" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// Sub-components for cleaner code
const CategorySmallCard = ({ to, image, title }) => (
  <Link to={to} className="group relative overflow-hidden rounded-xl bg-surface-container-low border border-outline-variant/10 aspect-square block cursor-pointer">
    <img className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" src={image} alt={title} />
    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
    <div className="absolute bottom-0 left-0 p-6">
      <h3 className="text-xl font-headline font-bold">{title}</h3>
    </div>
  </Link>
);

const FeatureDetailCard = ({ icon, title, desc, active, offset }) => (
  <div className={`glass-panel p-8 rounded-xl border ${active ? 'border-primary/20' : 'border-outline-variant/10'} shadow-[0_0_15px_rgba(0,229,255,0.05)] flex items-start gap-6 group ${offset ? 'translate-x-4 lg:translate-x-12' : ''}`}>
    <div className={`${active ? 'bg-primary/10 group-hover:bg-primary/20' : 'bg-secondary/10'} p-4 rounded-lg transition-colors`}>
      <span className={`material-symbols-outlined ${active ? 'text-primary' : 'text-secondary'} text-3xl`} style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
    </div>
    <div>
      <h4 className="text-xl font-headline font-bold mb-2">{title}</h4>
      <p className="text-on-surface-variant text-sm font-body leading-relaxed">{desc}</p>
    </div>
  </div>
);

const StatCard = ({ label, value }) => (
  <div className="flex flex-col items-center p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10 min-w-[120px]">
    <span className="text-2xl font-headline font-bold text-primary">{value}</span>
    <span className="text-[10px] font-label uppercase tracking-tighter text-on-surface-variant">{label}</span>
  </div>
);

export default HomePage;
