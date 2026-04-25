import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserDashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [showAllStores, setShowAllStores] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Thorne",
    role: "Diamond Tier Authenticator",
    photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwPaAIDZMFc1EesVWTAKnnan6zhXr8OAtuGBd0oJH6m0_0sOOhPh8H97Cgu2gGlNiN8sYi58tROMoBtsD18QCOJAp0I7anL5HX068x1ihmnBNHmRUzvuBV8-JRIetCcbfocitJg4qFjt1nm-TxSWHVOtH8jB7SYuaDWHoZ2LUd0v6d9whWVL-xsoTFh27CFA3hzloApgocYurkfZJO1XCsfuVAyEoxhayYa6AvQH34T30ICcRfyKIckgklL7FNnSs8lI0Ezf8dWtY"
  });

  const [toast, setToast] = useState(null);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const [security, setSecurity] = useState({
    biometric: true,
    ghost: false,
    email: true
  });

  const toggleSecurity = (key) => {
    if (key === 'ghost') return; // Keep as disabled/locked for premium feel
    setSecurity({ ...security, [key]: !security[key] });
  };

  const handleVaultAccess = () => {
    setToast("Authenticating Vault Access...");
    setTimeout(() => setToast("Vault Decrypted. 12 Items Found."), 1500);
    setTimeout(() => setToast(null), 4000);
  };

  const extraStores = [
    { name: "Vanguard Lab", city: "Paris", tag: "Certified", image: "/assets/vanguard.png" },
    { name: "Neon Hub", city: "Singapore", tag: "Elite", image: "/assets/neon_hub.png" },
    { name: "Apex Collective", city: "Dubai", tag: "Verified", image: "/assets/apex.png" },
    { name: "Quantum Retail", city: "Sydney", tag: "Premium", image: "/assets/quantum.png" }
  ];

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen relative">
      <Navbar />

      {/* Neural Feedback Toast */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-primary-container text-on-primary-container px-6 py-3 rounded-full border border-primary/20 shadow-2xl flex items-center gap-3">
            <span className="material-symbols-outlined text-primary animate-pulse">lock_person</span>
            <span className="text-sm font-bold uppercase tracking-widest">{toast}</span>
          </div>
        </div>
      )}

      {/* Profile Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 glass-panel bg-surface/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-surface-container-high w-full max-w-md p-8 rounded-2xl shadow-2xl border border-outline-variant/30 text-left">
            <h2 className="text-2xl font-headline font-bold text-primary mb-6">Edit Identity</h2>
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-surface-container p-4 rounded-xl border border-outline-variant/30 focus:border-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Badge / Role</label>
                <input
                  type="text"
                  value={profile.role}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  className="w-full bg-surface-container p-4 rounded-xl border border-outline-variant/30 focus:border-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Profile Photo URL</label>
                <input
                  type="text"
                  value={profile.photo}
                  onChange={(e) => setProfile({ ...profile, photo: e.target.value })}
                  className="w-full bg-surface-container p-4 rounded-xl border border-outline-variant/30 focus:border-primary outline-none transition-all text-xs"
                  placeholder="https://..."
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 bg-primary text-on-primary font-bold py-3 rounded-xl active:scale-95 transition-all">SAVE CHANGES</button>
                <button type="button" onClick={() => setIsEditing(false)} className="flex-1 bg-surface-container text-on-surface font-bold py-3 rounded-xl border border-outline-variant/20">CANCEL</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Holographic Scanner Overlay */}
      {isScanning && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 animate-in zoom-in duration-500">
          <div className="relative w-full max-w-sm aspect-square border-2 border-primary/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.2)]">
            <div className="absolute inset-x-0 top-0 h-1 bg-primary shadow-[0_0_20px_#00e5ff] animate-[scan_2s_ease-in-out_infinite]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-8xl text-primary opacity-20 animate-pulse">qr_code_scanner</span>
            </div>
            {/* Corners */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
            <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
          </div>
          <div className="mt-12 text-center">
            <h3 className="text-xl font-headline font-bold text-primary animate-pulse tracking-widest uppercase">Initializing Neural Scan...</h3>
            <p className="text-on-surface-variant text-sm mt-2">Align item within the authentication frame</p>
            <button onClick={() => setIsScanning(false)} className="mt-12 text-on-surface-variant hover:text-primary transition-colors text-xs uppercase tracking-[0.2em]">Terminate Scan</button>
          </div>
        </div>
      )}

      <main className="pt-28 pb-20 px-8 max-w-7xl mx-auto">
        {/* Dashboard Header / Profile Area */}
        <section className="mb-16 flex flex-col md:flex-row items-end justify-between gap-8 text-left">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                <img className="w-full h-full object-cover" src={profile.photo} alt={profile.name} />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-primary-container text-on-primary-container p-1 rounded-lg">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-headline font-bold tracking-tight text-primary">{profile.name}</h1>
              <p className="text-on-surface-variant font-label uppercase tracking-[0.1em] text-xs mt-1">{profile.role}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-surface-container-high px-6 py-2.5 rounded-lg border border-primary/20 text-primary text-sm font-medium hover:bg-primary hover:text-on-primary transition-all active:scale-95"
            >
              Edit Profile
            </button>
            <button
              onClick={() => setIsScanning(true)}
              className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(0,229,255,0.2)] active:scale-95"
            >
              Scan New Item
            </button>
          </div>
        </section>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
          {/* Verification History - Asymmetric Large Block */}
          <div className="md:col-span-8 bg-surface-container-low rounded-xl p-8 overflow-hidden relative group">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-headline font-semibold text-inverse-surface">Verification History</h2>
              <span className="material-symbols-outlined text-primary/40">timeline</span>
            </div>
            <div className="space-y-4">
              <HistoryEntry
                icon="watch"
                title="Rolex Submariner 126610LN"
                subtitle="Authenticated by London Lab • 2h ago"
                status="GENUINE"
                id="#RX-9942"
                success={true}
              />
              <HistoryEntry
                icon="apparel"
                title="Hermès Birkin 30 Togo"
                subtitle="Authenticated by Paris Hub • 1d ago"
                status="GENUINE"
                id="#HM-2210"
                success={true}
              />
              <HistoryEntry
                icon="dangerous"
                title="Yeezy Boost 350 V2"
                subtitle="Identity Mismatch • 3d ago"
                status="FRAUDULENT"
                id="#YZ-4412"
                success={false}
              />
            </div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[80px] rounded-full"></div>
          </div>

          {/* Quick Settings & Vault */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="bg-surface-container-high rounded-xl p-8">
              <h2 className="text-lg font-headline font-semibold text-inverse-surface mb-6">Security Settings</h2>
              <div className="space-y-6">
                <ToggleSetting icon="fingerprint" label="Biometric Access" active={security.biometric} onClick={() => toggleSecurity('biometric')} />
                <ToggleSetting icon="shield_moon" label="Ghost Mode" active={security.ghost} disabled={true} onClick={() => toggleSecurity('ghost')} />
                <ToggleSetting icon="alternate_email" label="Email Alerts" active={security.email} onClick={() => toggleSecurity('email')} />
              </div>
            </div>
            <div
              onClick={handleVaultAccess}
              className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-8 flex flex-col justify-between min-h-[160px] cursor-pointer hover:bg-surface-container-low transition-all group/vault active:scale-[0.98]"
            >
              <div>
                <h2 className="text-lg font-headline font-semibold text-inverse-surface mb-2 flex items-center justify-between">
                  Vault Storage
                  <span className="material-symbols-outlined text-primary opacity-0 group-hover/vault:opacity-100 transition-opacity">lock_open</span>
                </h2>
                <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">Your verified items are encrypted and stored in the secure TrustCart vault.</p>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-headline font-bold text-primary">12 <span className="text-xs font-normal text-on-surface-variant">Items</span></div>
                <span className="material-symbols-outlined text-primary-container text-4xl opacity-20 group-hover/vault:opacity-40 transition-opacity">storage</span>
              </div>
            </div>
          </div>

          {/* Recently Viewed Gallery */}
          <div className="md:col-span-12 mt-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-headline font-semibold text-inverse-surface">Recently Viewed Stores</h2>
              <button
                onClick={() => setShowAllStores(!showAllStores)}
                className="text-primary text-[10px] font-bold uppercase tracking-widest hover:underline transition-all"
              >
                {showAllStores ? "View Less" : "View All"}
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-in fade-in duration-500">
              <StoreCard
                name="Avenue Luxe"
                city="Tokyo"
                tag="Certified"
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuDBv4LBlbzBUpCCHjJnvFEeXFHjJifWJz-y__GE4N9fUnvBcvdJKsUANcuOz3bLptJojI29EmQgvirI49xj61L9vC-5SgbT-FLNY9nfCu9VDpLSNJHymsyZTs1EBsrLpkCpfVyUaCyWkbloZyQnouP9RQ4DG8na9QKNc5PizYYYIo5N8yFmWxhvprFN4OFnwZc6jkq5q91Nz1XdgwyLua3HuZgl_gdgVb2iGftUQc28JCgaTCLBNPNjOusIYeaV08MOz0fy8eBvSUc"
              />
              <StoreCard
                name="Sole Central"
                city="New York"
                tag="Platinum"
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuCVw-ES0yn_zzfKg6pYxgrG0ruxUeAEQMqbBkdTVANHah8DQXpJ4OvhPRoT2-abjXAqUdeCAHWplQc2ba8oSHqRd8U808mLtxJY0MOZrR9i-2N4vdA80WQcAjtcQ-hEN8x_a1yMaQNCwNsHPXyeLAI32gzVuufMDNmO6qNWSaixy-telcgT97Y42Kmki7licU7EaOIdoMY4rAj3RFCazBWz9QFN9wWX4pq7zZ884pk_-bSIMLbMpuROX054EI2ule829icv7ktCjMQ"
              />
              <StoreCard
                name="Chrono Vault"
                city="Geneva"
                tag="Certified"
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuC9Kkohg8bfARU7WNx19Zxr-Iqiac-LM96B7PxREMWF-mvK9AIrHkHRFjbX0gJJaJJcDW0Q6C0RFxkhyeuNa5_n9-g-jp7X6JbeLb2orTseAc55DSjS15Qyj2cdCTX0j0Y6sSDEMuYxeLjysmfodt6aScdfifEypU3iW00lkRlUVHr6EjkCPOSpYhVQvCKo54qurlipZFs_9pd9hIVNomCNsIfwtT9APl6nrMfFlfVcQIw6gn7dMzL5LRy3BLgU5hnAbUIJDYPi6lE"
              />
              <StoreCard
                name="Neon Atelier"
                city="London"
                tag="Certified"
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuCFPNMObvY2Z0oJg1Bi_1Bek6_z0brk_3rGUNS8EAsUQb82hwpFM-ZK96Ml0YNCBCEt3FflBuG14mm33-yFwg_QLnyKKiG_HkK-jlffy22UUJUFjN2WJAeL2xQchbiQYITaSRVSrCW2eylfINI0SPR4VvCGQpPdF8VivJV5qrTVOrdJcNfuWy6gCpqJwlKPVNxkwSOOaqsm-_PuDdrsCJozSqOZTfyCmGlI36H11MR1ZPpivOCY-_6zkM73Ojc57oSUYgJkyZm0Yg0"
              />
              {showAllStores && extraStores.map((store, i) => (
                <StoreCard
                  key={i}
                  name={store.name}
                  city={store.city}
                  tag={store.tag}
                  image={store.image}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          50% { top: 100%; opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// Sub-components
const HistoryEntry = ({ icon, title, subtitle, status, id, success }) => (
  <div className="bg-surface-container flex items-center justify-between p-4 rounded-lg hover:bg-surface-container-high transition-colors group/item">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center">
        <span className={`material-symbols-outlined ${success ? 'text-primary' : 'text-error'}`}>{icon}</span>
      </div>
      <div>
        <div className="text-sm font-medium text-on-surface">{title}</div>
        <div className="text-xs text-on-surface-variant">{subtitle}</div>
      </div>
    </div>
    <div className="flex flex-col items-end">
      <div className={`${success ? 'bg-primary/10 text-primary-container' : 'bg-error/10 text-error'} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1`}>
        <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
          {success ? 'check_circle' : 'warning'}
        </span>
        {status}
      </div>
      <div className="text-[10px] text-on-surface-variant mt-1">ID: {id}</div>
    </div>
  </div>
);

const ToggleSetting = ({ icon, label, active, disabled, onClick }) => (
  <div className={`flex items-center justify-between ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} group/toggle`} onClick={onClick}>
    <div className="flex items-center gap-3">
      <span className="material-symbols-outlined text-on-surface-variant text-xl transition-colors group-hover/toggle:text-primary">{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
    <div className={`w-10 h-5 ${active ? 'bg-primary shadow-[0_0_10px_rgba(0,229,255,0.3)]' : 'bg-surface-container-highest'} rounded-full relative flex items-center px-0.5 transition-all`}>
      <div className={`w-4 h-4 rounded-full transition-all ${active ? 'bg-on-primary ml-auto shadow-[0_0_5px_white]' : 'bg-outline-variant ml-0'}`}></div>
    </div>
  </div>
);

const StoreCard = ({ name, city, tag, image }) => (
  <div className="group relative transition-all duration-500 animate-in fade-in slide-in-from-bottom-2">
    <div className="aspect-square bg-surface-container-highest rounded-xl overflow-hidden mb-3">
      <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100" src={image} alt={name} />
    </div>
    <h3 className="text-sm font-medium">{name}</h3>
    <p className="text-xs text-on-surface-variant">{city} • {tag}</p>
  </div>
);

export default UserDashboard;
