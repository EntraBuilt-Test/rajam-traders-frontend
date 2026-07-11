import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Wrench, Landmark, 
  CircleDollarSign, Home, Building2, Sprout 
} from 'lucide-react';

export default function PromoScreen({ onContinue, t }) {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onContinue();
          return 100;
        }
        return prev + 1;
      });
    }, 50); // 50ms * 100 = 5000ms (5 seconds)
    return () => clearInterval(interval);
  }, [onContinue, isPaused]);

  return (
    <div 
      className="w-full max-w-xl mx-auto px-4 py-1 space-y-3.5 select-none animate-fade-in active:scale-[0.99] transition-transform duration-200"
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      
      {/* Header Info */}
      <div className="flex items-center gap-2 justify-center mb-1">
        <div className="relative">
          <div className="w-10 h-10 rounded-full border border-emerald-500/30 overflow-hidden shadow-md">
            <img 
              src="/logo.jpeg" 
              alt="RTS Green Solar Energy Solutions Logo" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div>
          <span className="text-white font-black text-xl tracking-wider block leading-none">RTS</span>
          <span className="text-[8px] text-emerald-400 font-bold uppercase tracking-widest block mt-0.5">
            {t.solarSolutions}
          </span>
        </div>
      </div>

      {/* Grid Layout for Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        
        {/* Left Column: Mega Opening Day Offer */}
        <div className="glass-panel py-3 px-4 rounded-2xl border border-emerald-500/20 flex flex-col justify-between relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-emerald-500 to-teal-400"></div>
          
          <div>
            <h4 className="text-white font-extrabold text-base tracking-tight uppercase">
              {t.megaOpeningDay}
            </h4>
            <p className="text-emerald-400 font-serif italic text-lg -mt-1 mb-1">
              {t.offer}
            </p>
            <p className="text-emerald-400 text-[8px] font-bold tracking-wider uppercase mb-0.5">
              {t.bookOnInauguration}
            </p>
            <p className="text-zinc-350 text-[10px] font-semibold mb-2">
              {t.getSolarInstallation}
            </p>
          </div>

          <div className="my-1.5 space-y-0.5">
            <div className="relative inline-block text-zinc-500 font-bold text-sm md:text-base">
              ₹ 2,10,000
              <span className="absolute left-0 right-0 top-1/2 h-[1.5px] bg-red-600 rotate-[-12deg]" />
            </div>
            <p className="text-zinc-500 text-[8px] uppercase tracking-widest">{t.forJust}</p>
            <div className="text-yellow-400 text-2xl font-black tracking-tight text-glow">
              ₹ 1,89,999
            </div>
          </div>

          <div className="mt-2 mb-1">
            {/* Custom Ribbon tag */}
            <div className="relative inline-flex items-center justify-center bg-gradient-to-r from-emerald-600 to-emerald-500 text-[#0d130e] font-black text-[9px] px-4 py-1.5 rounded shadow-sm">
              <span className="absolute -left-1.5 top-0 bottom-0 w-1.5 bg-emerald-700 clip-ribbon-left"></span>
              {t.youWillSave}
              <span className="absolute -right-1.5 top-0 bottom-0 w-1.5 bg-emerald-700 clip-ribbon-right"></span>
            </div>
            <p className="text-zinc-400 text-[8px] tracking-wider uppercase mt-1.5">
              {t.netMeterScope}
            </p>
          </div>
        </div>

        {/* Right Column: Subsidy & Bank Loan Cards */}
        <div className="space-y-3 flex flex-col justify-between">
          
          {/* Card 1: Subsidy Support */}
          <div className="glass-panel p-2.5 rounded-xl border border-emerald-500/10 flex items-center gap-3 relative overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <CircleDollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="text-emerald-400 text-base font-bold leading-none">{t.subsidySupport}</div>
              <div className="text-zinc-300 text-[9px] font-semibold uppercase tracking-wider mt-0.5">{t.subsidySupportTitle}</div>
              <div className="text-zinc-450 text-[8px] uppercase tracking-widest leading-none">{t.willBeGiven}</div>
            </div>
          </div>

          {/* Card 2: Bank Loan Assistance */}
          <div className="glass-panel p-3 rounded-xl border border-emerald-500/10 flex-1 flex flex-col justify-center relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Landmark className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-emerald-400 text-xs font-bold tracking-wide">{t.bankLoanAssistance}</h5>
                <h5 className="text-emerald-400 text-[10px] font-bold -mt-1">{t.bankLoanAssistanceSub}</h5>
              </div>
            </div>
            <ul className="space-y-1 text-left pl-0.5">
              <li className="text-[9px] text-zinc-300 font-semibold tracking-wider flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-500"></span> {t.easyProcess}
              </li>
              <li className="text-[9px] text-zinc-300 font-semibold tracking-wider flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-500"></span> {t.lowInterest}
              </li>
              <li className="text-[9px] text-zinc-300 font-semibold tracking-wider flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-500"></span> {t.quickApproval}
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Trust Badges */}
      <div className="glass-panel p-2 rounded-xl border border-emerald-500/10 grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center text-center p-0.5">
          <div className="w-7 h-7 rounded-full bg-emerald-950/60 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-1 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="text-[7.5px] text-zinc-200 font-bold uppercase tracking-wider leading-tight">
            {t.govtSubsidyAssistance}
          </span>
        </div>
        <div className="flex flex-col items-center text-center p-0.5">
          <div className="w-7 h-7 rounded-full bg-emerald-950/60 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-1 shrink-0">
            <Wrench className="w-4 h-4" />
          </div>
          <span className="text-[7.5px] text-zinc-200 font-bold uppercase tracking-wider leading-tight">
            {t.professionalInstallation}
          </span>
        </div>
        <div className="flex flex-col items-center text-center p-0.5">
          <div className="w-7 h-7 rounded-full bg-emerald-950/60 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-1 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="text-[7.5px] text-zinc-200 font-bold uppercase tracking-wider leading-tight">
            {t.qualityComponents}
          </span>
        </div>
      </div>

      {/* Smart Solar Solutions Section */}
      <div className="glass-panel p-3 md:p-4 rounded-2xl border border-emerald-500/15 space-y-3">
        <div className="flex items-center justify-center gap-2">
          <span className="w-4 h-[1px] bg-emerald-500/40"></span>
          <span className="text-[8.5px] text-zinc-300 font-bold tracking-widest uppercase">
            {t.smartSolutionsForEveryNeed} <span className="text-emerald-400">{t.everyNeed}</span>
          </span>
          <span className="w-4 h-[1px] bg-emerald-500/40"></span>
        </div>

        {/* 3 Circular Previews */}
        <div className="grid grid-cols-3 gap-2">
          {/* Solution 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full p-0.5 border border-emerald-500/30 overflow-hidden group shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=200&auto=format&fit=crop&q=60" 
                alt="Residential Solutions"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute bottom-0 right-0 w-4.5 h-4.5 rounded-full bg-zinc-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-sm">
                <Home className="w-2.5 h-2.5" />
              </div>
            </div>
            <span className="text-[8px] text-emerald-400 font-bold tracking-wide mt-1 block uppercase">{t.residential}</span>
            <span className="text-[7.5px] text-zinc-350 font-semibold tracking-wider block uppercase">{t.solarSolutionsLabel}</span>
          </div>

          {/* Solution 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full p-0.5 border border-emerald-500/30 overflow-hidden group shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=200&auto=format&fit=crop&q=60" 
                alt="Commercial Solutions"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute bottom-0 right-0 w-4.5 h-4.5 rounded-full bg-zinc-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-sm">
                <Building2 className="w-2.5 h-2.5" />
              </div>
            </div>
            <span className="text-[8px] text-emerald-400 font-bold tracking-wide mt-1 block uppercase">{t.commercial}</span>
            <span className="text-[7.5px] text-zinc-350 font-semibold tracking-wider block uppercase">{t.solarSolutionsLabel}</span>
          </div>

          {/* Solution 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full p-0.5 border border-emerald-500/30 overflow-hidden group shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=200&auto=format&fit=crop&q=60" 
                alt="Agricultural Services"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute bottom-0 right-0 w-4.5 h-4.5 rounded-full bg-zinc-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-sm">
                <Sprout className="w-2.5 h-2.5" />
              </div>
            </div>
            <span className="text-[8px] text-emerald-400 font-bold tracking-wide mt-1 block uppercase">{t.agricultural}</span>
            <span className="text-[7.5px] text-zinc-350 font-semibold tracking-wider block uppercase">{t.solarPumpServicesLabel}</span>
          </div>
        </div>

      </div>

      {/* Auto Progress Bar instead of button */}
      <div className="pt-2">
        <div className="w-full bg-zinc-950/80 rounded-full h-1.5 border border-emerald-900/35 overflow-hidden shadow-inner">
          <div 
            className="bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 h-full rounded-full transition-all duration-75 ease-out shadow"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

    </div>
  );
}
