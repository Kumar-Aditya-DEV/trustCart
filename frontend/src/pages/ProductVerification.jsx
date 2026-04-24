import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductVerification = () => {
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary/30 min-h-screen">
      <Navbar />

      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto text-left">
        {/* Hero Section: Verification Status */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container/10 border border-secondary-container/20">
              <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
              <span className="text-xs font-label uppercase tracking-widest text-secondary-container font-medium">Scanning Network Integrity</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-headline font-bold text-on-surface leading-tight">
              Product <span className="bg-linear-to-br from-primary to-primary-container bg-clip-text text-transparent">Verified</span><br />as Authentic.
            </h1>
            <p className="text-on-surface-variant text-lg max-w-xl leading-relaxed">
              This item has been cryptographically confirmed by our decentralized ledger. Its origin, transit history, and ownership have been validated through 12 unique checkpoints.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary font-semibold rounded-md shadow-[0_0_15px_rgba(0,229,255,0.2)] active:scale-95 transition-transform">
                Download Certificate
              </button>
              <button className="px-8 py-3 bg-surface-container-high border border-primary/20 text-primary font-semibold rounded-md hover:bg-surface-container-highest transition-colors active:scale-95">
                View Blockchain TX
              </button>
            </div>
          </div>

          {/* Animated Status Card */}
          <div className="lg:col-span-5 relative">
            <div className="glass-panel p-8 rounded-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6">
                <span className="material-symbols-outlined text-secondary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <div className="space-y-8 relative z-10">
                <InfoBlock label="Certificate ID" value="TC-8829-QX-0012" large={true} />
                <div className="grid grid-cols-2 gap-4">
                  <InfoBlock label="Verified At" value="Oct 24, 2024 • 14:02 UTC" />
                  <InfoBlock label="Risk Score" value="Low (0.02%)" valueColor="text-secondary" />
                </div>
                <div className="pt-4 border-t border-outline-variant/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">shield</span>
                    </div>
                    <div className="text-sm">
                      <div className="text-on-surface font-medium">Digital Watermark Active</div>
                      <div className="text-on-surface-variant text-xs">Dynamic tracking enabled</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px]"></div>
            </div>
          </div>
        </section>

        {/* Bento Grid: Product Details & Manufacturer */}
        <section className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 text-left">
          {/* Product Identity */}
          <div className="md:col-span-4 lg:col-span-3 bg-surface-container-low p-8 rounded-xl flex flex-col justify-between min-h-[320px]">
            <div className="space-y-4">
              <span className="text-[0.65rem] font-label uppercase tracking-[0.2em] text-outline">Product Profile</span>
              <h2 className="text-3xl font-headline font-bold text-on-surface">Precision Chronograph X1</h2>
              <p className="text-on-surface-variant text-sm max-w-md">Limited Edition series with sapphire crystal and proprietary movement. Number 44 of 500 manufactured.</p>
            </div>
            <div className="flex items-center gap-6 pt-8">
              <img className="w-32 h-32 object-cover rounded-lg bg-surface-container-highest" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0htqjrRv0I-QeIgVWbFA6gfJI8PqvO0B_igwi8GTwTs294Az-rUAlBzHWEu4j8LzzHEnz9YYy-tYDd37tEILlBo0eGde_btDLDzzEg_3SaUF0DX0l-1_6W73_S5Wvl92hscQFTmmDmvccMMt09TjJ7ZaDbSyOdio3rKMDyMygC4TGJh2Xaf5a4Rq-4Eho4a7wTjpCg0c7p48V09bAu9HROXfdyTOGrRuxOaHJ-SvBxAYbtNRF1q-IkUhetJvCNJ6vCoeoKoo71gA" alt="Product detail" />
              <div className="space-y-3">
                <CheckItem label="Original Packaging" />
                <CheckItem label="OEM Seals Intact" />
                <CheckItem label="Warranty Registered" />
              </div>
            </div>
          </div>

          {/* Batch Details */}
          <div className="md:col-span-2 lg:col-span-3 bg-surface-container-low p-8 rounded-xl min-h-[320px] flex flex-col justify-between">
            <div>
              <span className="text-[0.65rem] font-label uppercase tracking-[0.2em] text-outline">Batch Information</span>
              <div className="mt-6 space-y-6">
                <DetailRow label="Batch ID" value="B-2024-OMEGA-09" mono={true} />
                <DetailRow label="Production Date" value="Sept 12, 2024" />
                <DetailRow label="Facility Location" value="Zurich, Switzerland" />
                <DetailRow label="Compliance Standard" value="ISO 9001:2015" secondary={true} />
              </div>
            </div>
            <div className="mt-4">
              <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-primary/40 to-primary"></div>
              </div>
              <div className="mt-2 text-[0.65rem] text-outline text-right uppercase tracking-widest">Quality Assurance 100%</div>
            </div>
          </div>

          {/* Manufacturer Card */}
          <div className="md:col-span-3 lg:col-span-4 bg-surface-container p-8 rounded-xl">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center p-4">
                <img className="w-full grayscale brightness-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAu9ZBJYPZKTXzbNoEkUfSKqUdSpQJsiUCOPMMwauWwnyraxSmD_96-lNaTbsbSWzJD3qABgPOrWdTxdTXHcnyFpoxbMHYGm_kfxtojvjNJiwlVuZIWHrP-je63TlZDZIkKs2n60qQ0mQZcOuyNqMwFsW1G-q12kKit4zrUbD2GawFN3op12cxmawc45Zbgk_JYzijj-eHyaCFsGg2M_mIajh_HVV3wBxc1d-kwV51JLwQaEzLf6YD1T8G2GKffEx5d0jkwhDDpmKQ" alt="Manufacturer Logo" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-headline font-bold text-on-surface">Apex Manufacturing AG</h3>
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Apex Manufacturing is a certified partner in the TrustCart ecosystem since 2018. They specialize in high-precision engineering and sustainable supply chains. Their verification keys are rotated every 30 days for maximum security.
                </p>
                <div className="flex gap-4">
                  <LinkButton label="View Brand Profile" />
                  <LinkButton label="Verify Manufacturer Key" />
                </div>
              </div>
            </div>
          </div>

          {/* Chain of Custody */}
          <div className="md:col-span-3 lg:col-span-2 bg-gradient-to-br from-surface-container-high to-surface-container-highest p-8 rounded-xl border border-primary/5">
            <span className="text-[0.65rem] font-label uppercase tracking-[0.2em] text-outline">Chain of Custody</span>
            <div className="mt-8 space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-primary/10">
              <TimelineStep title="Factory Release" subtitle="Zurich • Sept 15" active={true} />
              <TimelineStep title="Regional Logistics" subtitle="Frankfurt • Sept 18" active={true} />
              <TimelineStep title="Final Delivery" subtitle="London • Oct 24" active={true} highlight={true} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// Sub-components
const InfoBlock = ({ label, value, large, valueColor }) => (
  <div>
    <span className="text-[0.65rem] font-label uppercase tracking-[0.2em] text-outline">{label}</span>
    <div className={`${large ? 'text-xl' : 'text-sm'} font-headline font-medium ${valueColor || 'text-on-surface'}`}>{value}</div>
  </div>
);

const CheckItem = ({ label }) => (
  <div className="flex items-center gap-2">
    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
    <span className="text-xs text-on-surface-variant">{label}</span>
  </div>
);

const DetailRow = ({ label, value, mono, secondary }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-on-surface-variant">{label}</span>
    <span className={`text-sm ${mono ? 'font-mono' : ''} ${secondary ? 'text-secondary font-medium' : 'text-on-surface'}`}>{value}</span>
  </div>
);

const LinkButton = ({ label }) => (
  <a className="text-xs text-primary font-label uppercase tracking-widest hover:underline cursor-pointer" href="#">{label}</a>
);

const TimelineStep = ({ title, subtitle, active, highlight }) => (
  <div className="flex items-start gap-6 relative">
    <div className={`w-6 h-6 rounded-full border-4 border-surface-container-high z-10 ${active ? 'bg-primary' : 'bg-outline-variant'} ${highlight ? 'shadow-[0_0_10px_rgba(0,229,255,0.5)] bg-secondary' : ''}`}></div>
    <div>
      <div className={`text-xs font-bold ${highlight ? 'text-secondary' : 'text-on-surface'}`}>{title}</div>
      <div className="text-[0.6rem] text-outline">{subtitle}</div>
    </div>
  </div>
);

export default ProductVerification;
