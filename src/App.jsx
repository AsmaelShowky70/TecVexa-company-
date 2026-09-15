import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesPricing } from './components/ServicesPricing';
import { Portfolio } from './components/Portfolio';
import { AboutUs } from './components/AboutUs';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PromoVideoModal } from './components/PromoVideoModal';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export const App = () => {
  const { isAuthenticated } = useAuth();
  const [promoOpen, setPromoOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const handleOpenAdmin = () => {
    if (isAuthenticated) {
      setDashboardOpen(true);
    } else {
      setLoginOpen(true);
    }
  };

  // Check URL routes (/admin, /admin/, #admin, ?admin=true) and keyboard shortcut (Ctrl+Shift+A)
  useEffect(() => {
    const checkAdminRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();

      const isAdminHash = hash === '#admin' || hash.startsWith('#admin');
      const isAdminPath = path.endsWith('/admin') || path.endsWith('/admin/');
      const isAdminSearch = search.includes('admin=true') || search.includes('admin=1');

      if (isAdminHash || isAdminPath || isAdminSearch) {
        handleOpenAdmin();
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);

    // Global secret keyboard listener: Ctrl + Shift + A (or Cmd + Shift + A)
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'ش')) {
        e.preventDefault();
        handleOpenAdmin();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAuthenticated]);

  const handleLoginSuccess = () => {
    setLoginOpen(false);
    setDashboardOpen(true);
  };

  const handleCloseAdmin = () => {
    setLoginOpen(false);
    setDashboardOpen(false);

    try {
      let newPath = window.location.pathname;
      let urlChanged = false;

      // Clean /admin or /admin/ from pathname
      if (newPath.toLowerCase().endsWith('/admin/') || newPath.toLowerCase().endsWith('/admin')) {
        newPath = newPath.replace(/\/admin\/?$/i, '') || '/';
        urlChanged = true;
      }

      // Clean admin query param
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has('admin')) {
        searchParams.delete('admin');
        urlChanged = true;
      }
      const newQuery = searchParams.toString() ? `?${searchParams.toString()}` : '';

      // Clean #admin hash
      let newHash = window.location.hash;
      if (newHash.toLowerCase().startsWith('#admin')) {
        newHash = '';
        urlChanged = true;
      }

      if (urlChanged) {
        history.replaceState(null, '', newPath + newQuery + newHash);
      }
    } catch (err) {
      console.warn('Could not clean admin url:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white relative transition-colors duration-300">
      
      {/* Top Navbar */}
      <Navbar 
        onOpenAdmin={handleOpenAdmin} 
        onOpenPromo={() => setPromoOpen(true)} 
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero 
          onOpenPromo={() => setPromoOpen(true)} 
        />
        
        <ServicesPricing 
          onSelectPackage={() => {
            const contactElem = document.getElementById('contact');
            contactElem?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <Portfolio />

        <AboutUs />

        <ContactSection />
      </main>

      {/* Corporate Footer (Admin link removed) */}
      <Footer 
        onOpenAdmin={handleOpenAdmin} 
      />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />

      {/* Interactive Promotional Video Reel Modal with Egyptian Arabic Voiceover */}
      <PromoVideoModal 
        isOpen={promoOpen} 
        onClose={() => setPromoOpen(false)} 
      />

      {/* Secret Admin Login Modal (Asmael / Asmael010@#) */}
      <AdminLogin 
        isOpen={loginOpen} 
        onClose={handleCloseAdmin} 
        onSuccess={handleLoginSuccess} 
      />

      {/* Secured Admin Control Suite */}
      <AdminDashboard 
        isOpen={dashboardOpen} 
        onClose={handleCloseAdmin} 
      />

    </div>
  );
};

export default App;
