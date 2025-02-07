import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { X } from 'lucide-react';

interface MediaItem {
  id: string;
  title: string;
  url: string;
  created_at: string;
}

export default function Gallery() {
  const navigate = useNavigate();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMedia(null);
      }
    };

    if (selectedMedia) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [selectedMedia]);

  const fetchMedia = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMedia(data || []);
    } catch (err) {
      setError('Failed to load gallery items');
      console.error('Error fetching media:', err);
    } finally {
      setLoading(false);
    }
  };

  const navigateToSection = (section: string) => {
    navigate('/', { state: { scrollTo: section } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-xl">Loading gallery...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center space-x-6 mb-8">
          <button
            onClick={() => navigateToSection('home')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => navigateToSection('about')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            About Us
          </button>
          <button
            onClick={() => navigateToSection('services')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Services
          </button>
          <button
            onClick={() => navigateToSection('contact')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Contact
          </button>
        </div>

        <h1 className="text-3xl font-bold text-center mb-12">Our Gallery</h1>
        
        {media.length === 0 ? (
          <div className="text-center text-gray-500">
            No gallery items available yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {media.map((item) => (
              <div key={item.id} className={`relative overflow-hidden rounded-lg shadow-lg ${!item.url.includes('.mp4') && !item.url.includes('.webm') ? 'group' : ''}`}>
                {item.url.includes('.mp4') || item.url.includes('.webm') ? (
                  <video
                    className="w-full h-64 object-cover cursor-pointer"
                    playsInline
                    preload="metadata"
                    onClick={(e) => {
                      const video = e.currentTarget;
                      if (video.paused) {
                        video.play();
                      } else {
                        video.pause();
                      }
                    }}
                  >
                    <source src={item.url} type={item.url.includes('.mp4') ? 'video/mp4' : 'video/webm'} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-64 object-cover transform transition-transform cursor-pointer"
                    onClick={() => setSelectedMedia(item)}
                  />
                )}
                {!item.url.includes('.mp4') && !item.url.includes('.webm') && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <h3 className="text-white text-xl font-semibold">{item.title}</h3>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Modal for full-size image */}
        {selectedMedia && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <div className="relative max-w-7xl w-full">
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                onClick={() => setSelectedMedia(null)}
              >
                <X size={24} />
              </button>
              <img
                src={selectedMedia.url}
                alt={selectedMedia.title}
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <h3 className="text-white text-xl font-semibold bg-black/50 inline-block px-4 py-2 rounded">
                  {selectedMedia.title}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}