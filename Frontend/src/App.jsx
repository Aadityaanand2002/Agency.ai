import React, { useState, useRef, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/NavBar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import Services from './components/Services';
import OurWork from './components/OurWork';
import Teams from './components/Teams';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';

const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
  );

  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    const mouse = { x: 0, y: 0 }; // To store mouse position

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    document.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      if (dotRef.current && outlineRef.current) {
        // Center the dot (12px size) on the cursor
        dotRef.current.style.transform = `translate3d(${mouse.x - 6}px, ${mouse.y - 6}px, 0)`;
        
        // Center the outline (40px size) on the cursor
        outlineRef.current.style.transform = `translate3d(${mouse.x - 20}px, ${mouse.y - 20}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className='relative dark:bg-black'>
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero />
      <TrustedBy />
      <Services />
      <OurWork />
      <Teams />
      <ContactUs />

      {/* Toast will always show at top center */}
      <Toaster position="top-center" reverseOrder={false} />

      <Footer theme={theme} />

      {/* Custom Cursor Ring */}
      <div
        ref={outlineRef}
        className='
          fixed top-0 left-0 h-10 w-10 rounded-full 
          border border-primary pointer-events-none z-[9999]'
      ></div>

      {/* Custom Cursor Dot */}
      <div
        ref={dotRef}
        className='
          fixed top-0 left-0 h-3 w-3 rounded-full 
          bg-primary pointer-events-none z-[9999]'
      ></div>
    </div>
  );
};

export default App;