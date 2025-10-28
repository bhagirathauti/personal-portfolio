import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const button = visible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-[99999] p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Scroll to top"
    >
      <FaArrowUp size={20} />
    </button>
  ) : null;

  // Render the button into document.body using a portal so it's not affected by transformed ancestors
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return createPortal(button, document.body);
};

export default ScrollToTopButton;
