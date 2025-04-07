import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo or Name */}
        <div className="text-lg font-semibold mb-4 md:mb-0">
          © {new Date().getFullYear()} Bhagirath Auti
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="#about" className="hover:text-blue-400 transition">About</a>
          <a href="#projects" className="hover:text-blue-400 transition">Projects</a>
          <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="https://github.com/bhagirathauti" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <FaGithub size={20} />
          </a>
          <a href="https://linkedin.com/in/bhagirathauti" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <FaLinkedin size={20} />
          </a>
          <a href="mailto:bhagirath.aspivision@gmail.com" className="hover:text-white transition">
            <FaEnvelope size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
