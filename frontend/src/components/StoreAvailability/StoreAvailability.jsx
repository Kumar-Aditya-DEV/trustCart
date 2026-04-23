import React, { useState, useMemo } from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const INITIAL_STORES = [
  { id: 1, name: "Cyber Plaza Flagship", address: "452 Tech District, Innovation Ave.", top: "40%", left: "45%", status: "In Stock", statusType: "success", official: true, canReserve: true },
  { id: 2, name: "Neo-Retail Hub", address: "12 Global Commerce Center, Level 2", top: "60%", left: "65%", status: "Low Stock", statusType: "warning", official: false, canView: true },
  { id: 3, name: "Vanguard Boutique", address: "88 Skyline Ridge, District 4", top: "75%", left: "50%", status: "Sold Out", statusType: "error", official: true, note: "Restocking in 2 days" },
  { id: 4, name: "Titanium Tech Store", address: "102 Vector Plaza, High-Tech Zone", top: "30%", left: "75%", status: "In Stock", statusType: "success", official: true, canReserve: true },
  { id: 5, name: "Quantum Goods", address: "77 Singularity Blvd, Research Sector", top: "85%", left: "20%", status: "Low Stock", statusType: "warning", official: false, canView: true }
];

const StoreAvailability = () => {
  const [activeFilters, setActiveFilters] = useState(new Set(['In Stock']));
  const [zoom, setZoom] = useState(1);
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const [stores, setStores] = useState(INITIAL_STORES.map(s => ({ ...s, distanceVal: null })));
  const [isCalculated, setIsCalculated] = useState(false);
  const [toast, setToast] = useState(null);
  const [viewMode, setViewMode] = useState('all'); // 'all' or 'low-stock'

  // Default Central Location
  const defaultLocation = { top: 50, left: 50 };

  const calculateDistances = () => {
    const updatedStores = stores.map(store => {
      const sTop = parseInt(store.top);
      const sLeft = parseInt(store.left);
      const dist = Math.sqrt(
        Math.pow(sTop - defaultLocation.top, 2) + 
        Math.pow(sLeft - defaultLocation.left, 2)
      );
      return { ...store, distanceVal: (dist / 10).toFixed(1) };
    });
    setStores(updatedStores);
    setIsCalculated(true);
  };

  const handleReserve = (name) => {
    setToast(`Reservation successful at ${name}!`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleViewLowStock = () => {
    setViewMode('low-stock');
    setToast("Filtering for Low Stock locations...");
    setTimeout(() => setToast(null), 2000);
  };

  const resetView = () => setViewMode('all');

  const toggleFilter = (label) => {
    const newFilters = new Set(activeFilters);
    if (newFilters.has(label)) {
      newFilters.delete(label);
    } else {
      newFilters.add(label);
    }
    setActiveFilters(newFilters);
  };

  const processedStores = useMemo(() => {
    let result = [...stores];

    if (viewMode === 'low-stock') {
      result = result.filter(s => s.status === 'Low Stock');
    } else {
      // Normal Filter Logic
      if (activeFilters.has('In Stock')) {
        result = result.filter(s => s.status !== 'Sold Out');
      }
      if (activeFilters.has('Official Dealers')) {
        result = result.filter(s => s.official);
      }
      if (activeFilters.has('Distance < 2mi') && isCalculated) {
        result = result.filter(s => parseFloat(s.distanceVal) < 2);
      }
    }

    // Sorting Logic
    result.sort((a, b) => {
      const score = { success: 3, warning: 2, error: 1 };
      if (score[b.statusType] !== score[a.statusType]) {
        return score[b.statusType] - score[a.statusType];
      }
      if (isCalculated) {
        return parseFloat(a.distanceVal) - parseFloat(b.distanceVal);
      }
      return 0;
    });

    return result;
  }, [stores, activeFilters, isCalculated, viewMode]);

  const handleZoom = (delta) => {
    setZoom(prev => Math.max(0.5, Math.min(2, prev + delta)));
  };

  const handleMyLocation = () => {
    setZoom(1.2);
    setMapOffset({ x: 0, y: 0 });
    calculateDistances();
  };

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen overflow-x-hidden relative">
      <Navbar />

      {/* Reservation Toast */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-primary-container text-on-primary-container px-6 py-3 rounded-full border border-primary/20 shadow-2xl flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">verified_user</span>
            <span className="text-sm font-bold uppercase tracking-widest">{toast}</span>
          </div>
        </div>
      )}

      <main className="pt-24 pb-12 px-6 lg:px-12 max-w-[1600px] mx-auto min-h-screen">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 h-full text-left">
          <aside className="lg:col-span-4 flex flex-col gap-8">
            <section className="bg-surface-container-low p-6 rounded-xl border-l-4 border-primary-container shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 rounded-lg bg-surface-container-highest overflow-hidden flex-shrink-0">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbCcBDyPCScC7OpKqoqrlAezXLn2I4i-MglxZCKZqu-W-9Af4hjtH90lkXgXCda66PxEHGL4WhHbojIzN3hV2GqAJVOrjQldrif7rRdVUylPXiWYo06-uwP3kz1Q3orF8bKfCnfjXH6hBMsCo_v42ZyJnonJbpuK63oZC0o82gw9ISl7Ct0cb9DbEFI0mZjNpUABDfKTj5f3m5s-oZPvhZBZSQ6-fz_PCOVodiC-Tdmh-JkU4_b72JMMcwtCCKgyDoPdnXcvXg3DA" alt="Chronos X-1" />
                </div>
                <div className="flex-1">
                  <span className="inline-block px-2 py-0.5 mb-2 bg-primary/10 text-primary text-[10px] uppercase tracking-widest font-label rounded">Verified Original</span>
                  <h1 className="font-headline text-xl font-bold text-primary-fixed mb-1">Chronos X-1</h1>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-4">Precision-engineered titanium core with encrypted authenticity chip.</p>
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-bold font-headline">$1,240.00</span>
                    <span className="text-xs text-on-surface-variant font-label uppercase tracking-wider">SKU: TRU-8821</span>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center px-2">
                <div className="flex items-center gap-3">
                  <h2 className="font-headline text-sm font-bold tracking-widest uppercase text-on-surface-variant">Nearby Stores</h2>
                  {viewMode === 'low-stock' && (
                    <button onClick={resetView} className="text-[10px] text-primary flex items-center gap-1 hover:underline">
                      <span className="material-symbols-outlined text-xs">close</span>
                      Clear Filter
                    </button>
                  )}
                </div>
                <span className="text-xs text-primary font-medium">{processedStores.length} Verified Locations</span>
              </div>
              <div className="flex flex-col gap-3 max-h-[614px] overflow-y-auto pr-2 custom-scrollbar transition-all">
                {processedStores.map(store => (
                  <StoreCard 
                    key={store.id}
                    name={store.name} 
                    address={store.address} 
                    distance={isCalculated ? `${store.distanceVal} miles away` : "Distance pending..."} 
                    status={store.status} 
                    statusType={store.statusType}
                    canReserve={store.canReserve}
                    canView={store.canView}
                    note={store.note}
                    onReserve={() => handleReserve(store.name)}
                    onView={handleViewLowStock}
                  />
                ))}
                {processedStores.length === 0 && (
                  <div className="p-8 text-center glass-panel rounded-xl">
                    <p className="text-sm text-on-surface-variant italic">No matches. Try clearing active filters.</p>
                  </div>
                )}
              </div>
            </div>
          </aside>

          <section className="lg:col-span-8 relative min-h-[600px] lg:min-h-[800px] rounded-2xl overflow-hidden shadow-2xl bg-surface-container-lowest border border-outline-variant/10 group/map">
            <div 
              className="absolute inset-0 grayscale contrast-125 opacity-40 mix-blend-screen transition-all duration-700 ease-out"
              style={{ 
                transform: `scale(${zoom}) translate(${mapOffset.x}px, ${mapOffset.y}px)`,
                transformOrigin: 'center center'
              }}
            >
              <img className="w-full h-full object-cover select-none pointer-events-none" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArljN2e-NJ_KXAsWFI2XfWZqm9PA9IT61Xu_z2TzZlLAcN3iRikYiqnKUbZTkcdrx8F_8h5qQUFcbvXQxI_ay5YNc8qp_DLYcXRBcYSf9hq-_t9NowhXX6LR7b_PFVw3cBOs-6aQreLRGjxnvIaLXK79nDVxD4VxfD7OcJtliNeUzU7ldX__9h9NrtzCMxxOlcqw2Y0_QYBA_PQ1m9hkAIPIVVg90zDnEphKuNr5bRpCzIHjDKJcraGGf5H3I5nW9D5gu70R0Qbf8" alt="Digital map" />
              
              {/* Area Name Overlay - Moved inside zoom container */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 select-none">
                <h2 className="text-3xl md:text-6xl font-headline font-bold text-white tracking-[2rem] whitespace-nowrap uppercase">Neo-Central</h2>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent pointer-events-none"></div>
            
            <div className="absolute inset-0 transition-all duration-700 ease-out" style={{ transform: `scale(${zoom}) translate(${mapOffset.x}px, ${mapOffset.y}px)`, transformOrigin: 'center center' }}>
              {processedStores.map(store => (
                <MapMarker 
                  key={store.id}
                  top={store.top} 
                  left={store.left} 
                  label={store.name}
                  ping={(activeFilters.has('In Stock') && store.statusType === 'success') || store.statusType === 'warning'}
                  color={store.statusType === 'error' ? 'error' : store.statusType === 'warning' ? 'error' : 'primary'}
                />
              ))}
            </div>

            <div className="absolute bottom-8 right-8 flex flex-col gap-2 z-10">
              <MapButton icon="add" onClick={() => handleZoom(0.2)} title="Zoom In" />
              <MapButton icon="remove" onClick={() => handleZoom(-0.2)} title="Zoom Out" />
              <MapButton icon="my_location" onClick={handleMyLocation} primary={true} title="Calculate Distance" />
            </div>

            <div className="absolute top-8 left-8 glass-panel border border-outline-variant/20 rounded-xl p-4 max-w-xs text-left z-10">
              <div className="flex items-center gap-3 mb-4 border-b border-outline-variant/10 pb-2">
                <span className="material-symbols-outlined text-primary text-xl">filter_list</span>
                <span className="font-headline font-bold text-sm tracking-widest uppercase">Department Filter</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['In Stock', 'Official Dealers', 'Distance < 2mi'].map(label => (
                  <FilterTag 
                    key={label} 
                    label={label} 
                    active={activeFilters.has(label)} 
                    onClick={() => toggleFilter(label)}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Sub-components
const StoreCard = ({ name, address, distance, status, statusType, canReserve, canView, note, onReserve, onView }) => {
  const isLowStock = status === "Low Stock";
  
  const statusColors = {
    success: "bg-primary/10 text-primary border-primary/20",
    warning: `bg-error-container/10 text-error border-error/20 ${isLowStock ? 'animate-pulse' : ''}`,
    error: "bg-slate-800 text-slate-400 border-outline-variant/20"
  };
  
  const dotColors = {
    success: "bg-primary animate-pulse",
    warning: "bg-error animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]",
    error: "bg-transparent"
  };

  return (
    <div className={`group ${statusType === 'success' ? 'bg-surface-container-high hover:bg-surface-variant' : 'bg-surface-container-low'} p-5 py-6 rounded-xl transition-all cursor-pointer border border-transparent ${statusType === 'success' ? 'border-b border-outline-variant/10' : 'hover:border-outline-variant/30'} ${statusType === 'error' ? 'opacity-70' : ''} ${isLowStock ? 'ring-1 ring-error/30 ring-inset shadow-[0_0_20px_rgba(255,84,77,0.1)]' : ''}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className={`font-bold tracking-tight ${statusType === 'success' ? 'text-primary' : 'text-on-surface'}`}>{name}</h3>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${statusColors[statusType]}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${dotColors[statusType]}`}></div>
          <span className="text-[10px] font-bold uppercase tracking-tight">{status}</span>
        </div>
      </div>
      <p className="text-xs text-on-surface-variant mb-5 line-clamp-1">{address}</p>
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-label text-slate-500 uppercase tracking-widest">{distance}</span>
        <div className="flex gap-2">
          {canReserve && <button onClick={onReserve} className="text-[10px] font-bold text-on-primary bg-gradient-to-r from-primary to-primary-container px-4 py-2 rounded-lg hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all active:scale-95 uppercase tracking-widest">RESERVE</button>}
          {canView && <button onClick={onView} className="text-[10px] font-bold text-primary border border-primary/30 px-4 py-2 rounded-lg hover:bg-primary/5 transition-all uppercase tracking-widest">VIEW</button>}
          {note && <span className="text-[10px] text-slate-500 font-medium italic">{note}</span>}
        </div>
      </div>
    </div>
  );
};

const MapMarker = ({ top, left, ping, color, label }) => (
  <div className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 group" style={{ top, left }}>
    {label && (
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-surface-container-high/80 backdrop-blur-md rounded border border-outline-variant/30 whitespace-nowrap z-20 pointer-events-none transition-all group-hover:bg-primary-container group-hover:text-on-primary-container">
        <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
      </div>
    )}
    {ping && <div className={`absolute inset-0 ${color === 'error' ? 'bg-error' : 'bg-primary'} rounded-full animate-ping opacity-40`}></div>}
    <div className={`absolute inset-1.5 ${color === 'error' ? 'bg-error shadow-[0_0_15px_#ff544d]' : 'bg-primary shadow-[0_0_15px_#00e5ff]'} rounded-full border-2 border-surface`}></div>
  </div>
);

const MapButton = ({ icon, primary, onClick, title }) => (
  <button 
    onClick={onClick}
    title={title}
    className={`w-12 h-12 ${primary ? 'bg-primary-container text-on-primary-container mt-4 shadow-[0_10px_20px_rgba(0,229,255,0.2)] hover:brightness-110 active:scale-90' : 'bg-surface-container-high text-primary border border-outline-variant/30 hover:bg-surface-variant active:scale-90'} rounded-xl flex items-center justify-center transition-all group`}
  >
    <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">{icon}</span>
  </button>
);

const FilterTag = ({ label, active, onClick }) => (
  <span 
    onClick={onClick}
    className={`${active ? 'bg-primary text-on-primary shadow-[0_5px_15px_rgba(0,229,255,0.3)]' : 'bg-surface-container-highest text-on-surface-variant hover:text-primary hover:bg-surface-container-high'} px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer border border-transparent select-none active:scale-95`}
  >
    {label}
  </span>
);

export default StoreAvailability;
