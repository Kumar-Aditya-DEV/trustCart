import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ALL_PRODUCTS = [
  {
    id: 1,
    category: "Footwear",
    title: "AeroVance Obsidian v1",
    desc: "Authenticated through 256-bit unique fiber mapping. Guaranteed original release series.",
    score: "99.8%",
    badge: "L3 Certified",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJ9rH2zNrH7w35mZn6tdInzZm1TYRZm18hVw4hJz7-hIwN6VXK4Qg9UB2gBeHmMVOKHHVQI2u4giQ14yrksWbhO-W-b2lQgOpwSAol2TREgPYNa7p-o4RfbxO2Df2PK4LrAiIhMOIFR_Ab3gdFro_fWassKnUnZhzl2a3YNte2ESdyYH9qzwpQerP-g6lkkaZ06jnkADbJEfB2kHRhwOPoFqKEcT0p6aj_1CzyCKUFqOaN73ABoCxOEjPnIEFifimAYAQFSQnzVW8"
  },
  {
    id: 2,
    category: "Electronics",
    title: "NeuralWatch Nexus",
    desc: "Validated manufacturer ledger from assembly to final distribution node.",
    score: "98.4%",
    badge: "L2 Verified",
    badgeColor: "secondary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJNmHc0O3wp6OO2rsgOyTK4KveG49VRUX6TK4aaYFT-K-iFoGDACSfgR4w4-tad-SkrxuK7zgIAxgXKOpsmhzrmFoycwSNGg-Z03d2qIWrULW6qGBMqWJRhRwgpZYLPGmgqsj7Sqf96UfWaic8oHz69Xa_dwSIg4SmANuoZB_H08Zv_V05ySidlSenF-2TNHPVn1n9Z-cZdeHFU0TB3kmyFRrxJda5_yOC1n8BfkVJvk1ThVr_QxdWlAwkGayWhI74J2hoFSwKcRg"
  },
  {
    id: 3,
    category: "Cosmetics",
    title: "Aether Essence Rare",
    desc: "Spectral analysis verified against master compound profile. Batch #8210.",
    score: "100%",
    badge: "L3 Certified",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVhX_sHEV4TvG9TOLRSYo8wFY68vZbqx91sy_m-AcbreiQgC9OQpCmOeOqG7hPcy043K0EGJGfHh8_vIZneZDrKXdfXct23O8LQmdx8m1VxeIBbySntEjqNvLox1sJskTZrjjIyh_Jk3xxmD4AaxFer2QoPBj5P_LA42LjjNrpXlkOx_Xwd_EoVOJi_f6Wal1V76U7n1gASNt3pRjFX5kOwCooc2XzTQxlUPPNTawyD5ny7ROL8Z2y8Yz4-kql2D1SXFTSEkKX5qU"
  },
  {
    id: 4,
    category: "Electronics",
    title: "SonicForge Pro Monitor",
    desc: "Ownership history confirmed via distributed ledger. Serial #SFP-992.",
    score: "94.2%",
    badge: "L1 Verified",
    badgeColor: "error",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXAK9iMzKrz0Sct6WvCZWGBdBUKCrHivjAQtZCNsznbcU4fNen6pDWDAV9nGieyYvMSAUQcLZK81T0EWyCNuE1fkRLrD1g_ErGj2NatBiUPIlskmvSO6aw-o6Geist16kSRJHKobBtyRDBMYjBuKoLNh3fj0kPqf_Tu-BH_S2INa49dA8oH3Bg-HR6vfqPfpqxB04S8YUupcgs1DYgkygAw3BerbZNR3AZiLPY6ckCMzhGke5r6HZBlPxNLaCq-Qjug7C83j7fEzs"
  },
  {
    id: 5,
    category: "Skincare",
    title: "LumiCell Regenerative Serum",
    desc: "Molecular batch verification active. Lab-certified organic compounds.",
    score: "99.9%",
    badge: "L3 Certified",
    image: "/assets/medicine.png"
  },
  {
    id: 6,
    category: "Footwear",
    title: "RetroVision Classic S",
    desc: "Physical component inspection and serial sequence matching confirmed.",
    score: "97.1%",
    badge: "L2 Verified",
    badgeColor: "secondary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJiuOOWz-zk54fQDED04YUnXVHfxvvREu28NRq3T4prVq3z9r7BVfphTKIFnzkoZM43FPNbyzlheUgxGIMXrNtqcqNMXfldf9WSDvmLLaSPUr5qDNcmJ91Pf6xgHagdkECpKR59Aj9HKzwzRXXL-ShEh1-Qhv-CwYYYuOoPxTeUxle-1UXG7hpq3s8jTi_lLBoYQHdkUOC9_oKyX_kDgnBeBl0417x0QuppySjeht03HnSBfaMErLQ7NWmiIvSs6SOfcERUE0k7NQ"
  },
  {
    id: 7,
    category: "Skincare",
    title: "HydraCore Aqua Cream",
    desc: "Ocean-sourced minerals with verified ethical harvesting certificate.",
    score: "96.5%",
    badge: "L2 Verified",
    badgeColor: "secondary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeSgOPUd6RkD-9EUmzfs4aMkz4l72mReoEGO-UyWlX3FPeewD_rsFeDEFMgjBKf2dRJI9HLy4AUeCSm4KCYfGk3kNcbMmrRvIahniOHfPLoTCFiX_6DTMZztfmDVW3J-IEB5NVaWYlVQbiR7rjaJK72e11yaSNH2lTYWL0oIInXXSek-wjtwxsLasgBIhSNog3vF6SrKUTSvJQDqO-UbWE9su899RjBeIy4eWSC8_czZH7V9n4oy2vOD920cHiuMvPsqu-SiapUbI"
  },
  {
    id: 8,
    category: "Medicine",
    title: "NeuroGenix Advanced",
    desc: "Molecularly verified neuro-recovery compound. Batch #NG-882.",
    score: "99.9%",
    badge: "L3 Certified",
    image: "/assets/medicine.png"
  },
  {
    id: 9,
    category: "Packed Food",
    title: "OmniFuel Bio-Bar",
    desc: "Sustainably sourced, toxin-free nutritional matrix. Authenticity guaranteed.",
    score: "98.2%",
    badge: "L2 Verified",
    badgeColor: "secondary",
    image: "/assets/packed_food.png"
  },
  {
    id: 10,
    category: "Medicine",
    title: "OptiVision Serum",
    desc: "Retinal repair therapy with authenticated sequence tag. Batch #OV-112.",
    score: "97.5%",
    badge: "L2 Verified",
    badgeColor: "secondary",
    image: "/assets/medicine.png"
  },
  {
    id: 11,
    category: "Packed Food",
    title: "HydroGel Nutrition Pack",
    desc: "Instant hydration and electrolyte matrix. Pre-release audit passed.",
    score: "98.9%",
    badge: "L3 Certified",
    image: "/assets/packed_food.png"
  }
];

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Authenticity Score');
  const activeCategory = searchParams.get('category');
  const searchQuery = searchParams.get('query');

  const filteredProducts = useMemo(() => {
    let result = ALL_PRODUCTS;

    if (activeCategory) {
      result = result.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    if (searchQuery) {
      const term = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(term) || 
        p.desc.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  const handleCategoryToggle = (category) => {
    if (activeCategory === category) {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <Navbar />

      <main className="pt-24 pb-12 px-8 min-h-screen">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 text-left">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-28 space-y-10">
              <FilterGroup title="Filter by Category">
                <Checkbox
                  label="Skincare"
                  checked={activeCategory === 'Skincare'}
                  onChange={() => handleCategoryToggle('Skincare')}
                />
                <Checkbox
                  label="Cosmetics"
                  checked={activeCategory === 'Cosmetics'}
                  onChange={() => handleCategoryToggle('Cosmetics')}
                />
                <Checkbox
                  label="Footwear"
                  checked={activeCategory === 'Footwear'}
                  onChange={() => handleCategoryToggle('Footwear')}
                />
                <Checkbox
                  label="Electronics"
                  checked={activeCategory === 'Electronics'}
                  onChange={() => handleCategoryToggle('Electronics')}
                />
                <Checkbox
                  label="Medicine"
                  checked={activeCategory === 'Medicine'}
                  onChange={() => handleCategoryToggle('Medicine')}
                />
                <Checkbox
                  label="Packed Food"
                  checked={activeCategory === 'Packed Food'}
                  onChange={() => handleCategoryToggle('Packed Food')}
                />
              </FilterGroup>

              <FilterGroup title="Verification Level">
                <Radio label="L1: Identity Verified" name="level" />
                <Radio label="L2: Supply Chain Trace" name="level" checked />
                <Radio label="L3: Lab Certified" name="level" />
              </FilterGroup>

              <div className="pt-6 border-t border-outline-variant/20">
                <h3 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-4">Price Flux</h3>
                <div className="h-1 bg-surface-container-high rounded-full overflow-hidden relative">
                  <div className="absolute inset-y-0 left-0 right-1/4 bg-primary-container/40"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]"></div>
                  <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]"></div>
                </div>
                <div className="flex justify-between mt-4 text-[10px] font-label text-slate-500">
                  <span>$100</span>
                  <span>$10k+</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <section className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <p className="font-label text-xs text-primary tracking-widest uppercase mb-1">Authenticated Results</p>
                <h1 className="text-4xl font-headline font-bold text-on-surface leading-tight">
                  {filteredProducts.length} {activeCategory ? activeCategory : 'Verified'} Items Found
                </h1>
              </div>
              <div className="flex items-center gap-4 relative">
                <span className="text-xs text-slate-500 font-label">SORT BY:</span>
                <div className="relative">
                  <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="flex items-center gap-2 text-sm text-primary font-medium focus:outline-none bg-surface-container-high px-4 py-2 rounded-lg border border-outline-variant/20 hover:bg-surface-variant transition-colors"
                  >
                    {sortBy}
                    <span className={`material-symbols-outlined text-sm transition-transform ${isSortOpen ? 'rotate-180' : ''}`}>expand_more</span>
                  </button>

                  {isSortOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-surface-container-high border border-outline-variant/30 rounded-xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl">
                      {['Authenticity Score', 'Recent Listing', 'Value High-Low'].map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSortBy(option);
                            setIsSortOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-primary/10 ${sortBy === option ? 'text-primary bg-primary/5 font-bold' : 'text-on-surface-variant'}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  category={product.category}
                  title={product.title}
                  desc={product.desc}
                  score={product.score}
                  badge={product.badge}
                  badgeColor={product.badgeColor}
                  image={product.image}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center glass-panel rounded-xl">
                <p className="text-on-surface-variant font-headline text-lg">No verified items found in this neural sector.</p>
              </div>
            )}

            {/* Pagination */}
            <div className="mt-20 flex justify-center items-center gap-8">
              <button className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary transition-all">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <div className="flex gap-4 font-body">
                <span className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center font-bold text-xs">1</span>
                <span className="w-8 h-8 rounded hover:bg-surface-container-high flex items-center justify-center text-xs cursor-pointer text-on-surface">2</span>
                <span className="w-8 h-8 rounded hover:bg-surface-container-high flex items-center justify-center text-xs cursor-pointer text-on-surface">3</span>
                <span className="w-8 h-8 flex items-center justify-center text-xs text-on-surface">...</span>
                <span className="w-8 h-8 rounded hover:bg-surface-container-high flex items-center justify-center text-xs cursor-pointer text-on-surface">12</span>
              </div>
              <button className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary transition-all">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Sub-components
const FilterGroup = ({ title, children }) => (
  <div className="text-left">
    <h3 className="font-label text-xs uppercase tracking-widest text-primary-container mb-6">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer group" onClick={onChange}>
    <div className={`w-5 h-5 rounded bg-surface-container-high border ${checked ? 'border-primary' : 'border-outline-variant'} group-hover:border-primary transition-colors flex items-center justify-center`}>
      {checked && <span className="material-symbols-outlined text-[12px] text-primary">check</span>}
    </div>
    <span className={`text-sm ${checked ? 'text-primary' : 'text-on-surface-variant'} group-hover:text-primary transition-colors`}>{label}</span>
  </label>
);

const Radio = ({ label, name, checked }) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <input className="hidden peer" name={name} type="radio" defaultChecked={checked} />
    <div className="w-5 h-5 rounded-full border-2 border-outline-variant peer-checked:border-primary flex items-center justify-center transition-all">
      <div className="w-2 h-2 bg-primary rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
    </div>
    <span className="text-sm text-on-surface-variant peer-checked:text-primary transition-colors">{label}</span>
  </label>
);

const ProductCard = ({ category, title, desc, score, badge, badgeColor, image }) => {
  const badgeClasses = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary-container/10 text-secondary-container border-secondary-container/20",
    error: "bg-error-container/20 text-error border-error/30"
  };

  return (
    <div className="group glass-panel rounded-xl p-4 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,229,255,0.06)] hover:-translate-y-1 overflow-hidden relative text-left">
      <div className="absolute top-4 right-4 z-10">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md uppercase tracking-wider ${badgeClasses[badgeColor || 'primary']}`}>
          {badge}
        </span>
      </div>
      <div className="w-full aspect-square bg-surface-container-highest rounded-lg mb-6 overflow-hidden flex items-center justify-center group">
        <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={image} alt={title} />
      </div>
      <div className="px-2">
        <p className="text-[10px] font-label text-primary-container tracking-widest uppercase mb-2">{category}</p>
        <h2 className="font-headline text-lg font-semibold text-on-surface mb-1 group-hover:text-primary transition-colors">{title}</h2>
        <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">{desc}</p>
        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
          <div>
            <p className="text-[10px] font-label text-slate-500 uppercase">Trust Score</p>
            <p className="text-lg font-headline font-bold text-primary">{score}</p>
          </div>
          <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-4 py-2 rounded-lg text-xs font-bold active:scale-95 transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            VERIFY & BUY
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
