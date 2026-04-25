import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, setIsCartOpen, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showBlockchainModal, setShowBlockchainModal] = useState(false);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate high-tech ledger validation
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      clearCart(); // Clear the cart after successful order
    }, 2500);
  };

  const downloadCertificate = () => {
    // Simulate certificate generation and download
    const element = document.createElement("a");
    const file = new Blob(["TrustCart Authenticity Certificate\n\nTransaction: #TXN-9982-AXV-2026\nDate: " + new Date().toLocaleString() + "\nStatus: VERIFIED ON-CHAIN\n\nThis document certifies the immutable origin and safe transit of your payload."], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "Authenticity_Certificate.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (cartItems.length === 0 && step !== 3) {
    return (
      <div className="bg-surface min-h-screen text-on-surface">
        <Navbar />
        <div className="pt-40 pb-20 text-center px-8">
          <div className="max-w-md mx-auto space-y-6 opacity-60">
            <span className="material-symbols-outlined text-7xl text-primary">shopping_cart_off</span>
            <h1 className="text-3xl font-headline font-bold">Your secure payload is empty.</h1>
            <p className="font-body text-on-surface-variant">Return to the catalog to verify and source products.</p>
            <button 
              onClick={() => navigate('/search')}
              className="px-8 py-3 bg-primary text-on-primary rounded-full font-bold uppercase tracking-widest text-xs"
            >
              Go to Catalog
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen text-on-surface font-body">
      <Navbar />
      
      <main className="pt-32 pb-20 px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center md:text-left">
            <h1 className="text-4xl font-headline font-black mb-2 tracking-tight">SECURE CHECKOUT</h1>
            <div className="flex items-center gap-2 text-xs font-label text-slate-500 uppercase tracking-widest">
              <span>Identification</span>
              <span className="material-symbols-outlined text-[10px]">arrow_forward</span>
              <span className={step >= 2 ? 'text-primary' : ''}>Payment Protocol</span>
              <span className="material-symbols-outlined text-[10px]">arrow_forward</span>
              <span className={step >= 3 ? 'text-primary' : ''}>Confirmation</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Checkout Flow */}
            <div className="lg:col-span-2 space-y-8 text-left">
              {step === 1 && (
                <div className="glass-panel p-8 rounded-2xl space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                  <h2 className="text-xl font-headline font-bold flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1</span>
                    Shipping Destination
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Full Name" placeholder="John Doe" />
                    <InputField label="Neural ID / Email" placeholder="john@trustchain.io" />
                    <div className="md:col-span-2">
                      <InputField label="Delivery Address" placeholder="123 Vector Street, Cyber District" />
                    </div>
                    <InputField label="Sector / City" placeholder="Neo Tokyo" />
                    <InputField label="Zip Protocol" placeholder="100-202" />
                  </div>
                  <div className="pt-4">
                     <button 
                       onClick={() => setStep(2)}
                       className="px-12 py-4 bg-surface-container-high hover:bg-primary/20 border border-outline-variant/30 rounded-xl font-bold uppercase tracking-widest text-xs transition-all"
                     >
                       Proceed to Payment
                     </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="glass-panel p-8 rounded-2xl space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h2 className="text-xl font-headline font-bold flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">2</span>
                    Payment Protocol
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PaymentOption icon="account_balance_wallet" title="TrustPay" desc="Biometric Link Verified" active={true} />
                    <PaymentOption icon="database" title="Ledger Credits" desc="Blockchain Asset Transfer" />
                  </div>
                  
                  <div className="bg-slate-950/40 p-6 rounded-xl border border-outline-variant/10 space-y-4">
                    <InputField label="Protocol Card Number" placeholder="**** **** **** 1234" />
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="Expiry" placeholder="05/29" />
                      <InputField label="CVV" placeholder="***" />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button onClick={() => setStep(1)} className="px-6 py-4 text-slate-500 font-bold uppercase tracking-widest text-[10px]">Back</button>
                    <button 
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="flex-1 py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-xl font-bold uppercase tracking-widest text-xs shadow-[0_10px_20px_rgba(0,229,255,0.2)] disabled:opacity-50"
                    >
                      {isProcessing ? 'Validating Ledger...' : 'Finalize Authentication'}
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="glass-panel p-12 rounded-3xl text-center space-y-8 animate-in zoom-in duration-500 border-primary/30">
                  <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(0,229,255,0.2)]">
                    <span className="material-symbols-outlined text-5xl">verified</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-4xl font-headline font-black tracking-tight">ORDER AUTHENTICATED!</h2>
                    <p className="text-on-surface-variant max-w-sm mx-auto font-body">Transaction ID: <span className="font-mono text-primary">#TXN-9982-AXV-2026</span></p>
                    <p className="text-slate-400 text-sm">Your verified assets have been secured for transit. Monitor your neural terminal for shipping flux.</p>
                  </div>
                  
                  {/* Action Buttons from image */}
                  <div className="flex flex-col md:flex-row gap-4 justify-center pt-6">
                    <button 
                      onClick={downloadCertificate}
                      className="px-8 py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-xl font-bold text-sm transition-all hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] active:scale-95"
                    >
                      Download Certificate
                    </button>
                    <button 
                      onClick={() => setShowBlockchainModal(true)}
                      className="px-8 py-4 border border-outline-variant/30 text-primary rounded-xl font-bold text-sm transition-all hover:bg-primary/5 active:scale-95"
                    >
                      View Blockchain TX
                    </button>
                  </div>

                  <div className="pt-2">
                    <button 
                      onClick={() => navigate('/home')}
                      className="text-slate-500 font-bold uppercase tracking-widest text-[10px] hover:text-on-surface transition-colors"
                    >
                      Return to Hub
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            {step !== 3 && (
              <div className="space-y-6">
                <div className="glass-panel p-6 rounded-2xl border-primary/10 sticky top-32">
                  <h3 className="font-headline font-bold text-lg mb-6 text-left">Payload Summary</h3>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-primary font-bold">{item.quantity}x</span>
                          <span className="text-on-surface-variant font-medium line-clamp-1 text-left w-32">{item.title}</span>
                        </div>
                        <span className="font-bold text-on-surface">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-6 border-t border-outline-variant/20 space-y-3">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Sub-Authentication Total:</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Secure Shipping Flux:</span>
                      <span className="text-primary">FREE</span>
                    </div>
                    <div className="flex justify-between items-end pt-3">
                      <span className="font-label text-xs uppercase text-on-surface">Total Value:</span>
                      <span className="text-2xl font-headline font-black text-primary">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10 flex gap-3 items-center text-left">
                    <span className="material-symbols-outlined text-primary text-sm">lock</span>
                    <p className="text-[10px] text-on-surface-variant tracking-tight font-label">Your transaction is protected by 2048-bit quantum encryption.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Blockchain Modal Simulation */}
      {showBlockchainModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-[200] flex items-center justify-center p-8">
           <div className="max-w-2xl w-full glass-panel p-8 rounded-3xl border-primary/20 space-y-6 animate-in zoom-in duration-300">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-headline font-bold text-on-surface">Blockchain Ledger Explorer</h3>
                <button onClick={() => setShowBlockchainModal(false)} className="material-symbols-outlined text-slate-500 hover:text-on-surface">close</button>
              </div>
              <div className="bg-slate-900/50 p-6 rounded-xl font-mono text-[11px] text-primary/80 space-y-2 overflow-x-auto">
                <p>{"{"}</p>
                <p className="pl-4">"block_height": 2048821,</p>
                <p className="pl-4">"txn_hash": "0x7d92...f82a",</p>
                <p className="pl-4">"status": "confirmed",</p>
                <p className="pl-4">"data_integrity": 1.0,</p>
                <p className="pl-4">"payload": [</p>
                {cartItems.length > 0 ? cartItems.map(i => (
                  <p key={i.id} className="pl-8">{"{ id: " + i.id + ", qty: " + i.quantity + " },"}</p>
                )) : <p className="pl-8">"Snapshot verified."</p>}
                <p className="pl-4">]</p>
                <p>{"}"}</p>
              </div>
              <div className="flex justify-center flex-col items-center gap-4 py-4">
                 <div className="w-full h-1 bg-surface-container-high rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary animate-pulse opacity-20"></div>
                 </div>
                 <p className="text-xs text-slate-500 font-label uppercase tracking-widest italic">Immutable Record Locked</p>
              </div>
           </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

const InputField = ({ label, placeholder }) => (
  <div className="flex flex-col gap-2 text-left">
    <label className="text-[10px] font-label uppercase tracking-widest text-slate-500 ml-1">{label}</label>
    <input 
      type="text" 
      placeholder={placeholder}
      className="bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors text-on-surface placeholder:text-slate-600"
    />
  </div>
);

const PaymentOption = ({ icon, title, desc, active }) => (
  <div className={`p-4 rounded-xl border flex items-center gap-4 cursor-pointer transition-all text-left ${active ? 'border-primary bg-primary/5 shadow-[0_0_15px_rgba(0,229,255,0.1)]' : 'border-outline-variant/20 hover:border-outline-variant'}`}>
     <span className={`material-symbols-outlined ${active ? 'text-primary' : 'text-slate-500'}`}>{icon}</span>
     <div>
       <h4 className={`text-sm font-bold ${active ? 'text-primary' : 'text-on-surface'}`}>{title}</h4>
       <p className="text-[10px] text-slate-500 font-label">{desc}</p>
     </div>
     {active && <span className="material-symbols-outlined text-primary text-sm ml-auto">check_circle</span>}
  </div>
);

export default CheckoutPage;
