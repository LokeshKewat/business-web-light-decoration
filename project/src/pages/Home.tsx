import React, { useEffect, useState } from 'react';
import { Star, Lightbulb, Users, ChevronDown, ChevronUp, Phone, Mail, MapPin } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import heroImage from '../assets/backImage.jpg';
import aboutImage from '../assets/About_Us1 .png';
import gallary1Image from '../assets/gallary1.png';
import gallary2Image from '../assets/gallary2.png';
import gallary3Image from '../assets/gallary3.png';
import gallary8Image from '../assets/gallary8.png';
import gallary29Image from '../assets/gallary29.png';
import emailjs from '@emailjs/browser';

export default function Home() {
  const location = useLocation();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const cardData = [
    {
      number: "30+",
      title: "Years Experience",
      description: "Over three decades of expertise in transforming spaces with innovative lighting solutions and creating memorable experiences for our clients."
    },
    {
      number: "1000+",
      title: "Projects Completed",
      description: "Successfully delivered lighting solutions for weddings, corporate events, festivals, and various celebrations across the region."
    },
    {
      number: "24/7",
      title: "Customer Support",
      description: "Round-the-clock assistance for all your lighting needs. Our team is always ready to help with setup, maintenance, and emergency services."
    },
    {
      number: "98%",
      title: "Client Satisfaction",
      description: "Exceptional track record of satisfied clients through our commitment to quality, creativity, and exceptional service delivery."
    }
  ];

  const services = [
    {
      image: gallary1Image,
      title: "Event Lighting",
      description: "Create the perfect ambiance for your special events with our custom lighting solutions."
    },
    {
      image: gallary2Image,
      title: "Wedding Decoration",
      description: "Transform your wedding venue into a magical space with our elegant lighting arrangements."
    },
    {
      image: gallary3Image,
      title: "Festival Lighting",
      description: "Celebrate festivals with vibrant and traditional lighting decorations."
    },
    {
      image: gallary8Image,
      title: "Garden Lighting",
      description: "Enhance your outdoor spaces with beautiful and lasting lighting installations."
    },
    {
      image: gallary29Image,
      title: "Air Cooler Service",
      description: "Keep your space cool and comfortable with our air cooler solutions."
    }
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(
        'service_fb76e3q', // Replace with your EmailJS service ID
        'template_vqpj0h2', // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'rjadhav.020788@gmail.com',
        },
        'PMyKdGBdssxtQ0U-9' // Replace with your EmailJS public key
      );

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section id="home" className="relative h-[600px]">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Decorative Lights"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative container mx-auto h-full flex items-center px-4">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Making Every Occasion Shine Bright !</h1>
            <p className="text-xl mb-8">Creating unforgettable moments with creative lighting solutions for weddings, events, and festivals</p>
            <a href="#contact" className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full transition-colors inline-block">
              Get in touch
            </a>
          </div>
        </div>
      </section>

      {/* Updated About Section */}
      <section id="about" className="py-12 bg-[#93C5FD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative group mt-8">
              <div className="aspect-w-16 aspect-h-16 lg:aspect-h-20 rounded-xl overflow-hidden
                            bg-gradient-to-br from-primary via-primary-dark to-secondary 
                            flex items-center justify-center p-6">
                <img
                  src={aboutImage}
                  alt="About Us"
                  className="w-[90%] h-[90%] object-contain rounded-xl shadow-2xl transform transition-all duration-500 
                           group-hover:scale-105 group-hover:shadow-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-secondary/10 rounded-xl opacity-0 
                              group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-primary/20 rounded-full -z-10 
                            transition-transform duration-500 group-hover:scale-110 backdrop-blur-sm"></div>
              <div className="absolute -top-4 -left-4 w-40 h-40 bg-secondary/20 rounded-full -z-10 
                            transition-transform duration-500 group-hover:scale-110 backdrop-blur-sm"></div>
            </div>

            {/* Content Section */}
            <div className="space-y-4">
              <div className="inline-block">
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  About Us
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  Illuminating Your Special Moments Since 1993
                </h2>
              </div>

              <div className="space-y-3 text-gray-700">
                <p>
                  Jay Mata Di Light Decoration has been transforming spaces with creative lighting solutions 
                  for over three decades. We specialize in creating magical atmospheres for weddings, events, 
                  festivals, and outdoor spaces.
                </p>
                <p>
                  Our team of experienced professionals combines artistic vision with technical expertise 
                  to deliver stunning lighting arrangements that exceed expectations. From intimate gatherings 
                  to grand celebrations, we ensure every detail shines bright.
                </p>
              </div>

              {/* Key Features with expandable cards */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {cardData.map((card, index) => (
                  <div
                    key={index}
                    onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                    className="space-y-2 p-3 rounded-lg hover:bg-[#059669] hover:text-white transition-all duration-300 text-center cursor-pointer
                             shadow-sm hover:shadow-md group bg-white"
                  >
                    <div className="text-2xl font-bold text-primary group-hover:text-white">{card.number}</div>
                    <div className="text-gray-600 flex items-center justify-center gap-2 group-hover:text-white">
                      {card.title}
                      {expandedCard === index ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 text-sm text-gray-500 group-hover:text-white/90
                                ${expandedCard === index ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                    >
                      {card.description}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="pt-3 text-center">
                <a
                  href="#contact"
                  className="inline-block bg-primary text-white px-6 py-2 rounded-full font-semibold 
                           hover:bg-primary-dark hover:shadow-lg transform hover:-translate-y-0.5 
                           transition duration-300"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Updated Services Section */}
      <section id="services" className="py-12 bg-[#93C5FD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-4 text-lg text-gray-700">
              Discover our range of professional lighting and decoration services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition duration-300">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Updated Contact Section */}
      <section id="contact" className="py-20 bg-[#059669]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              Get in touch with us for your lighting decoration needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-white mt-1" />
                <div>
                  <h3 className="font-semibold text-white">Phone</h3>
                  <p className="text-white/90">+91 9009453456</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-white mt-1" />
                <div>
                  <h3 className="font-semibold text-white">Email</h3>
                  <p className="text-white/90">rjadhav.020788@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-white mt-1" />
                <div>
                  <h3 className="font-semibold text-white">Address</h3>
                  <p className="text-white/90">01, Marimata Choraha, Kalmer Badi, Madhya Pradesh 453111<br/>
                  </p>
                </div>
              </div>

              <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.5901010123224!2d75.7443108!3d22.7399822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd0b7d3c4c0d%3A0x87a3c9cec54a2a95!2sQP56%2BM5%20Kalmer%20Badi%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1710835367299!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Our Location"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>

            <form className="space-y-6 bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Your Message"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition duration-300 
                  ${status === 'sending' 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#059669] hover:bg-[#047857]'} text-white`}
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="text-green-600 text-center">
                  Message sent successfully!
                </div>
              )}
              {status === 'error' && (
                <div className="text-red-600 text-center">
                  Failed to send message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}