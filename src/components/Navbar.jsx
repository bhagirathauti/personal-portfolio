import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [blurNav, setBlurNav] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const delta = 10; // minimum scroll delta to trigger show/hide
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const viewportHeight = window.innerHeight;

    const update = () => {
      const currentScrollY = window.scrollY;

      // blurNav: solid after hero
      if (currentScrollY > viewportHeight * 0.9) {
        setBlurNav(true);
      } else {
        setBlurNav(false);
      }

      // hide/show based on scroll direction with a small delta
      const diff = Math.abs(currentScrollY - lastScrollY.current);
      if (diff > delta) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
          // scrolling down
          setVisible(false);
        } else {
          // scrolling up
          setVisible(true);
        }
        lastScrollY.current = currentScrollY;
      }

      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(update);
        ticking.current = true;
      }
    };

    // initial invocation
    setTimeout(() => {
      // set initial lastScrollY
      lastScrollY.current = window.scrollY;
      update();
    }, 100);

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 left-0 z-[9999] transition-all duration-500 ${visible ? 'translate-y-0' : '-translate-y-full'} ${blurNav ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`} style={!blurNav ? { backgroundColor: 'transparent', pointerEvents: 'auto' } : { pointerEvents: 'auto' }}>
      {/* <nav className="bg-transparent backdrop-blur-sm fixed w-full z-10"> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:justify-center h-16">

          {/* Desktop Navigation (centered on md+) */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-baseline space-x-10">
              {['About', 'Education', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`${blurNav ? 'text-blue-500' : 'text-white'} hover:text-blue-300 text-md font-semibold transition-all duration-500 drop-shadow-lg`}
                >
                  {item}
                </a>
              ))}
            </div>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${blurNav ? 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-500' : 'bg-white/10 hover:bg-white/20 text-white'} transition-all duration-500`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile menu button & theme toggle */}
          <div className="md:hidden flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${blurNav ? 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-500' : 'bg-white/10 hover:bg-white/20 text-white'} transition-all duration-500`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${blurNav ? 'text-blue-500' : 'text-white'} hover:text-blue-300 focus:outline-none transition-colors duration-500`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {['About', 'Education', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-blue-500 hover:text-blue-300 block text-base font-medium transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
