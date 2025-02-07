import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDropzone } from 'react-dropzone';
import { supabase } from '../lib/supabase';
import { Trash2, Upload, LogOut } from 'lucide-react';

interface MediaItem {
  id: string;
  title: string;
  url: string;
  created_at: string;
}

export default function AdminPanel() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/admin-login');
    } else {
      fetchMedia();
    }
  }, [user, navigate]);

  const fetchMedia = async () => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching media:', error);
    } else {
      setMedia(data || []);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'video/*': ['.mp4', '.webm']
    },
    onDrop: async (acceptedFiles) => {
      if (!title) {
        alert('Please enter a title first');
        return;
      }

      setUploading(true);
      for (const file of acceptedFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;

        try {
          // 1. Upload file to Supabase storage
          const { error: uploadError } = await supabase.storage
            .from('gallery')
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          // 2. Get the public URL using getPublicUrl
          const publicUrl = supabase.storage
            .from('gallery')
            .getPublicUrl(fileName).data.publicUrl;

          // 3. Store reference in the database
          const { error: dbError } = await supabase
            .from('gallery')
            .insert([
              {
                title,
                url: publicUrl,
                created_at: new Date().toISOString()
              }
            ]);

          if (dbError) throw dbError;
        } catch (error) {
          console.error('Error uploading:', error);
          alert('Error uploading file');
        }
      }
      setUploading(false);
      setTitle('');
      fetchMedia();
    }
  });

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (!confirmed) return;

    try {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .match({ id });

      if (error) throw error;
      fetchMedia();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/admin-login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Gallery Admin Panel</h1>
          <button
            onClick={handleSignOut}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload New Media</h2>
          <input
            type="text"
            placeholder="Enter media title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
          />
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">
              Drag & drop files here, or click to select files
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Supports: JPG, PNG, MP4, WEBM
            </p>
          </div>
          {uploading && (
            <div className="mt-4 text-center text-primary">Uploading...</div>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {media.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {item.url.includes('.mp4') || item.url.includes('.webm') ? (
                <video
                  className="w-full h-48 object-cover"
                  controls
                  playsInline
                  preload="metadata"
                >
                  <source src={item.url} type={item.url.includes('.mp4') ? 'video/mp4' : 'video/webm'} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center text-red-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}