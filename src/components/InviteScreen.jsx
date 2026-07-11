import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ArrowRight, PhoneCall } from 'lucide-react';

export default function InviteScreen({ onContinue, t }) {
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
      className="w-full max-w-md mx-auto px-4 select-none animate-fade-in active:scale-[0.99] transition-transform duration-200"
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      
      {/* Compact Unified Glassmorphic Card Container */}
      <div className="glass-panel p-4 rounded-2xl border border-emerald-500/25 space-y-3 relative overflow-hidden text-center shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-500 to-teal-400"></div>

        {/* Header Info */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-9 h-9 rounded-full border border-emerald-500/30 overflow-hidden shadow-md">
            <img 
              src="/logo.jpeg" 
              alt="RTS Green Solar Energy Solutions Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-0.5">
            <span className="text-white font-black text-lg tracking-wider block leading-none">RTS</span>
            <span className="text-[7.5px] text-emerald-400 font-bold uppercase tracking-widest block mt-0.5">
              {t.solarSolutions}
            </span>
          </div>
        </div>

        {/* Invitation Invitation Body */}
        <div className="space-y-2">
          
          {/* Divider 1 */}
          <div className="flex items-center justify-center gap-2">
            <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-yellow-600/35"></span>
            <span className="text-yellow-500/80 text-[8px]">✦ ❖ ✦</span>
            <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-yellow-600/35"></span>
          </div>

          <p className="text-zinc-450 text-[8px] font-bold tracking-[0.2em] uppercase">
            {t.invitedTo}
          </p>

          <h1 className="text-lg md:text-xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 uppercase text-glow">
            {t.grandOpening}
          </h1>

          {/* Divider 3 */}
          <div className="flex items-center justify-center gap-2">
            <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-emerald-600/20"></span>
            <span className="text-emerald-400 text-[8px]">🌿</span>
            <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-emerald-600/20"></span>
          </div>

          <p className="text-zinc-305 text-[10px] md:text-[11px] font-light leading-normal max-w-[280px] mx-auto">
            {t.invitationText}
          </p>

        </div>

        {/* Details Section */}
        <div className="glass-panel p-2.5 rounded-xl border border-emerald-500/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-0.5 divide-y md:divide-y-0 md:divide-x divide-zinc-800/50">
            
            {/* Column 1: Date */}
            <div className="flex flex-col items-center p-0.5 space-y-0.5">
              <div className="w-6 h-6 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <span className="text-[7.5px] text-emerald-400 font-black tracking-widest uppercase">{t.inviteDate}</span>
              <div className="space-y-0">
                <p className="text-white text-[10px] font-bold">{t.inviteDateValue}</p>
                <p className="text-zinc-400 text-[7.5px] font-semibold uppercase tracking-wider">{t.inviteSunday}</p>
              </div>
            </div>

            {/* Column 2: Venue */}
            <div className="flex flex-col items-center p-0.5 space-y-0.5 pt-2 md:pt-0.5">
              <div className="w-6 h-6 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span className="text-[7.5px] text-emerald-400 font-black tracking-widest uppercase">{t.inviteVenue}</span>
              <div className="space-y-0 text-zinc-305 text-[8.5px] font-medium leading-tight">
                <p className="text-white font-bold">{t.inviteVenueValueLine1}</p>
                <p className="text-zinc-300">{t.inviteVenueValueLine2}</p>
                <p className="text-zinc-400">{t.inviteVenueValueLine3}</p>
              </div>
            </div>

            {/* Column 3: Time */}
            <div className="flex flex-col items-center p-0.5 space-y-0.5 pt-2 md:pt-0.5">
              <div className="w-6 h-6 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <span className="text-[7.5px] text-emerald-400 font-black tracking-widest uppercase">{t.inviteTime}</span>
              <div className="space-y-0">
                <p className="text-white text-[10px] font-bold">{t.inviteTimeValue}</p>
                <p className="text-zinc-500 text-[7.5px] font-medium uppercase tracking-widest">{t.inviteTimeIst}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Contact Info Banner */}
        <div className="bg-[#052b12]/80 border border-emerald-800/30 rounded-xl p-2 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-0.5 divide-y md:divide-y-0 md:divide-x divide-emerald-800/20 text-center">
            {/* Contact 1 */}
            <div className="flex flex-col items-center justify-center p-0.5">
              <span className="text-[7px] text-emerald-300 font-bold uppercase tracking-wider leading-none">
                ER.R.SATHISH
              </span>
              <a href="tel:+916383126692" className="flex items-center gap-1 text-[9px] text-white font-extrabold hover:text-emerald-400 mt-0.5 transition-colors">
                <PhoneCall className="w-2.5 h-2.5 text-emerald-400" />
                <span>+91 63831 26692</span>
              </a>
            </div>
            {/* Contact 2 */}
            <div className="flex flex-col items-center justify-center p-0.5 pt-1.5 md:pt-0.5">
              <span className="text-[7px] text-emerald-300 font-bold uppercase tracking-wider leading-none">
                ER.B. Mohamed Nasrul
              </span>
              <a href="tel:+918531023097" className="flex items-center gap-1 text-[9px] text-white font-extrabold hover:text-emerald-400 mt-0.5 transition-colors">
                <PhoneCall className="w-2.5 h-2.5 text-emerald-400" />
                <span>+91 85310 23097</span>
              </a>
            </div>
            {/* Contact 3 */}
            <div className="flex flex-col items-center justify-center p-0.5 pt-1.5 md:pt-0.5">
              <span className="text-[7px] text-emerald-300 font-bold uppercase tracking-wider leading-none">
                ER.K.RAVINDRAN
              </span>
              <a href="tel:+919944550787" className="flex items-center gap-1 text-[9px] text-white font-extrabold hover:text-emerald-400 mt-0.5 transition-colors">
                <PhoneCall className="w-2.5 h-2.5 text-emerald-400" />
                <span>+91 99445 50787</span>
              </a>
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

    </div>
  );
}
