import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { FaSnapchat } from 'react-icons/fa';
import NavLogo from '../assets/Nav_logo3.png';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={NavLogo} alt="Logo" className="h-24 w-48" />
            </div>
            <p className="text-gray-400">
              Transforming spaces with creative lighting solutions since 1993
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-primary">Home</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-primary">Services</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-primary">About</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-primary">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Event Lighting</li>
              <li className="text-gray-400">Wedding Decoration</li>
              <li className="text-gray-400">Festival Lighting</li>
              <li className="text-gray-400">Garden Lighting</li>
              <li className="text-gray-400">Air Cooler Service</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1D5ncUFD14/" 
                 className="text-gray-400 hover:text-primary" 
                 target="_blank" 
                 rel="noopener noreferrer">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/rajehsjadhav900?igsh=bXpnczc0dTNmOG4z" 
                 className="text-gray-400 hover:text-primary" 
                 target="_blank" 
                 rel="noopener noreferrer">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://youtube.com/@rajeshjadhav9197?si=_VEpdoawc_wrjYym" 
                 className="text-gray-400 hover:text-primary" 
                 target="_blank" 
                 rel="noopener noreferrer">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="https://www.snapchat.com/add/rajeshjadhav900?share_id=w-JG8MHO4XA&locale=en-IN" 
                 className="text-gray-400 hover:text-primary" 
                 target="_blank" 
                 rel="noopener noreferrer">
                <FaSnapchat className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Jay Mata Di Light Decoration. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}