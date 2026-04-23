import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 w-full py-12 px-8 border-t border-slate-800/50">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full max-w-[1600px] mx-auto">
        <div className="flex flex-col items-center md:items-start gap-2 text-left">
          <span className="text-lg font-bold text-cyan-400 font-headline tracking-tight">TrustCart</span>
          <span className="font-body text-xs tracking-widest uppercase text-slate-500">© 2024 TrustCart. Verified Authenticity.</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <FooterLink label="Privacy Policy" />
          <FooterLink label="Terms of Service" />
          <FooterLink label="Security Disclosure" />
          <FooterLink label="Help Center" />
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ label }) => (
  <a 
    className="font-body text-xs tracking-widest uppercase text-slate-500 hover:text-cyan-300 transition-opacity hover:opacity-80" 
    href="#"
  >
    {label}
  </a>
);

export default Footer;
