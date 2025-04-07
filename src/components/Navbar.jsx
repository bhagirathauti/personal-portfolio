import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [blurNav, setBlurNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const educationSection = document.getElementById('education');
      const educationOffset = educationSection?.offsetTop || 0;
      const scrollY = window.scrollY;

      if (scrollY >= educationOffset - 100) {
        setBlurNav(true); // Add blur once near education section
      } else {
        setBlurNav(false); // No blur before reaching
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${blurNav ? 'bg-transparent backdrop-blur-sm' : 'bg-transparent'} fixed w-full z-10 transition-all duration-500`}>
      {/* <nav className="bg-transparent backdrop-blur-sm fixed w-full z-10"> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-[#3b82f6] font-extrabold text-xl drop-shadow-glow">Bhagirath Auti</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {['About', 'Education', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`} // Convert to lowercase and prepend #
                  className="text-[#3b82f6] hover:text-blue-200 text-md font-semibold transition duration-300 drop-shadow-glow"
                >
                  {item}
                </a>
              ))}
            </div>

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-500 hover:text-blue-300 focus:outline-none"
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
        <div className="md:hidden bg-black/60 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-blue-500 hover:text-blue-300 block text-base font-medium transition duration-300 drop-shadow-glow"
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
