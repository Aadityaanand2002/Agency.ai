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

const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.
getItem('theme') : 'light');


  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  // Custom Cursor Logic
  const mouse = useRef({x: 0, y: 0});
  const postion = useRef({x: 0, y: 0});

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    }

    document.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      postion.current.x += (mouse.current.x - postion.current.x) * 0.1;
      postion.current.y += (mouse.current.y - postion.current.y) * 0.1;
      if(dotRef.current && outlineRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x - 6}px, ${mouse.current.y - 6}px, 0)`;
        outlineRef.current.style.transform = `translate3d(${postion.current.x - 20}px, ${postion.current.y - 20}px, 0)`;
      }

      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);

    }
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
          style={{transition: 'transform o.1s ease-in-out'}}
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
