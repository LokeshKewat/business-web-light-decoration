import React, { useState } from 'react';
import { Phone, Mail, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/Nav_logo3.png';
import ImageModal from './ImageModal';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full">
      <div className="bg-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img 
              src={logo} 
              alt="Jay Mata Di" 
              className="h-24 w-auto cursor-pointer hover:opacity-90 transition-opacity" 
              onClick={() => setShowModal(true)}
            />
            {/* <span className="text-xl font-bold">Jay Mata Di Light Decoration</span> */}
          </div>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-primary-dark transition-colors"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Phone size={20} />
                <span>+91 9009453456</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={20} />
                <span>rjadhav.020788@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <nav className="bg-secondary shadow-md">
        <div className="container mx-auto">
          <ul className="flex justify-center space-x-8 p-4">
            <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
            <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
            <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
            <li><a href="/gallery" className="hover:text-primary transition-colors">Gallery</a></li>
            <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </div>
      </nav>

      {showModal && (
        <ImageModal
          src={logo}
          alt="Jay Mata Di"
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}