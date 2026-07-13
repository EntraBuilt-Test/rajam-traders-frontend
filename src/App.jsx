import React, { useState, useRef, useEffect } from 'react';
import LangToggle from './components/LangToggle';
import { translations } from './translations';
import { 
  LoadingScreen, 
  WelcomeSection, 
  UnifiedForm,
  SubmittingLoader, 
  SuccessScreen, 
  FinalConfirmation 
} from './components/FormSteps';
import { Sun } from 'lucide-react';
import PromoScreen from './components/PromoScreen';
import InviteScreen from './components/InviteScreen';



export default function App() {
  const [lang, setLang] = useState('en');
  // Slide 3: Loading Screen
  // Slide 4: Welcome Banner
  // Slide 4.5: Fullscreen Video Intro
  // Slide 5: Unified Form Page
  // Slide 9: Submitting Loader
  // Slide 10: Success Screen
  // Slide 11: Final Confirmation
  const [slide, setSlide] = useState(3);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    solution: 'on-grid',
    serviceType: 'residential',
    capacity: '3kw',
    referencedBy: '',
  });

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
    if (Object.keys(newData).length > 0) {
      const field = Object.keys(newData)[0];
      if (errors[field]) {
        setErrors(prev => {
          const updated = { ...prev };
          delete updated[field];
          return updated;
        });
      }
    }
  };

  const handleRestart = () => {
    if (audioRef.current) audioRef.current.pause();
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      solution: 'on-grid',
      serviceType: 'residential',
      capacity: '3kw',
      referencedBy: '',
    });
    setErrors({});
    setSlide(4);
    window.scrollTo({ top: 0 });
  };

  // Voiceover: one continuous track that starts on the Invite (Grand Opening)
  // screen and keeps playing straight through into the Promo (Mega Opening Day)
  // screen. It lives here (not inside InviteScreen/PromoScreen) so the same
  // <audio> element survives the switch between those two screens instead of
  // being unmounted and restarted.
  const audioRef = useRef(null);

  const handleVoiceoverPauseChange = (paused) => {
    if (!audioRef.current) return;
    if (paused) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
  };

  const handleStartForm = () => {
    // Kick off the voiceover from the very start, right on the same click that
    // reveals the Invite screen - this is a real user gesture, so the browser
    // will allow the audio to autoplay.
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
    setSlide(4.2);
  };

  const handleInviteToPromo = () => {
    // Don't touch the audio here - let it keep playing uninterrupted into the Promo screen.
    setSlide(4.5);
  };

  const handlePromoToVideo = () => {
    if (audioRef.current) audioRef.current.pause();
    setSlide(4.8);
  };

  const [submitError, setSubmitError] = useState('');

  // Keep the whole window fixed (no page-level scrolling) while the form is
  // on screen - the form card manages its own height and internal layout.
  useEffect(() => {
    if (slide === 5) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [slide]);


  // The backend URL. In development it falls back to localhost:5000.
  // In production, set VITE_API_URL in your .env file (or in your Vercel
  // project's Environment Variables) to your deployed backend's URL.
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleSubmit = async () => {
    const finalErrors = {};
    if (!formData.name?.trim()) finalErrors.name = t.validationName;
    if (!formData.email?.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      finalErrors.email = t.validationEmail;
    }

    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setErrors({});
    setSubmitError('');
    setSlide(9); // show the "submitting" loader while we wait for the server

    const submitRequest = fetch(`${API_URL}/api/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    try {
      const response = await submitRequest;

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to submit the form.');
      }

      setSlide(10); // success screen
    } catch (err) {
      console.error('Submission failed:', err);
      setSubmitError(
        'We could not reach the server. Please check your internet connection and try again.'
      );
      setSlide(5); // send the user back to the form
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const t = translations[lang];

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden">
      {/* Grand Opening + Mega Opening Day voiceover. Rendered once, unconditionally,
          so it is never unmounted when moving from slide 4.2 to slide 4.5 - that's
          what lets the narration flow continuously across both screens. */}
      <audio ref={audioRef} src="/voiceover-grand-opening.mp3" preload="auto" className="hidden" />

      {/* Static background image for Welcome, Invite, Promo, and Loading screens */}
      {(slide === 3 || slide === 4 || slide === 4.2 || slide === 4.5) && (
        <div 
          className="fixed inset-0 -z-20 w-screen h-screen bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url('/background.png')` }}
        />
      )}
      
      {/* Blurred background image for Slide 5 */}
      {slide === 5 && (
        <div 
          className="fixed inset-0 -z-15 w-screen h-screen bg-cover bg-center filter blur-md scale-105"
          style={{ backgroundImage: `url('/background.png')` }}
        />
      )}

      {/* Background image for Success/Thankyou screens */}
      {(slide === 9 || slide === 10 || slide === 11) && (
        <div 
          className="fixed inset-0 -z-20 w-screen h-screen bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url('/thankyou%20background.jpeg')` }}
        />
      )}
      
      {/* Overlay for readable text */}
      <div className={`fixed inset-0 -z-10 w-screen h-screen transition-colors duration-500 ${slide === 4.2 || slide === 4.5 ? 'bg-black/75' : 'bg-black/35'}`} />

      {/* Header Bar */}
      {slide !== 3 && slide !== 4.2 && slide !== 4.5 && slide !== 4.8 && (
        <header className="w-full max-w-xl mx-auto px-6 py-6 flex items-center justify-between z-40 select-none">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.jpeg" 
              alt="RTS Green Solar Energy Solutions Logo" 
              className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-emerald-500/10 border border-emerald-500/20"
            />
            <div>
              <span className="text-white font-black text-lg tracking-tight block">RTS</span>
              <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest -mt-1 block">GREEN SOLAR ENERGY SOLUTIONS</span>
            </div>
          </div>
          <LangToggle currentLang={lang} setLang={setLang} />
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-4 z-30 w-full relative">
        {slide === 3 && <LoadingScreen onComplete={() => setSlide(4)} t={t} />}
        
        {slide === 4 && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] w-full max-w-xl mx-auto pb-6">
            <WelcomeSection onStartForm={handleStartForm} t={t} />
          </div>
        )}

        {slide === 4.2 && (
          <InviteScreen onContinue={handleInviteToPromo} t={t} onPauseChange={handleVoiceoverPauseChange} />
        )}

        {slide === 4.5 && (
          <PromoScreen onContinue={handlePromoToVideo} t={t} onPauseChange={handleVoiceoverPauseChange} />
        )}

        {slide === 4.8 && (
          <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
            <video 
              src="/solor house.mp4" 
              autoPlay 
              muted 
              playsInline
              onEnded={() => setSlide(5)}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Slide 5: Single-page Unified Form layout */}
        {slide === 5 && (
          <div className="w-full max-w-xl mx-auto py-3 z-30 relative animate-fade-in">
            <UnifiedForm 
              data={formData} 
              updateData={updateFormData} 
              errors={errors} 
              onSubmit={handleSubmit} 
              t={t}
              submitError={submitError}
            />
          </div>
        )}

        {slide === 9 && <SubmittingLoader t={t} />}
        {slide === 10 && <SuccessScreen onNext={() => setSlide(11)} t={t} />}
        {slide === 11 && <FinalConfirmation onRestart={handleRestart} t={t} />}
      </main>

      {/* Footer Info */}
      {slide !== 3 && slide !== 4.2 && slide !== 4.5 && slide !== 4.8 && (
        <footer className="w-full max-w-xl mx-auto px-6 py-6 text-center z-40 select-none">
          <p className="text-zinc-500 text-[10px] md:text-xs tracking-wider">
            &copy; {new Date().getFullYear()} RTS Green Solar Energy Solutions. All rights reserved. &bull; Thanjavur &bull; Chennai &bull; Trichy
          </p>
        </footer>
      )}
    </div>
  );
}
