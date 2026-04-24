import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="min-h-screen bg-surface flex items-center justify-center p-6 bg-surface-dim relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-lg">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-2xl bg-surface-container-high flex items-center justify-center border border-primary/10 shadow-[0_0_30px_rgba(0,229,255,0.1)]">
            <span className="material-symbols-outlined text-6xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
          </div>
        </div>
        
        <h1 className="text-8xl font-headline font-bold text-white mb-4 tracking-tighter opacity-20">404</h1>
        <h2 className="text-3xl font-headline font-bold text-white mb-4">Neural Link Severed</h2>
        <p className="text-on-surface-variant mb-10 text-lg leading-relaxed">
          The requested authentication node could not be located in the TrustCart ledger. It may have been relocated or purged.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold px-8 py-3.5 rounded-lg active:scale-95 transition-transform shadow-[0_0_20px_rgba(0,229,255,0.2)]"
        >
          <span className="material-symbols-outlined text-sm">home</span>
          Return to Hub
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
