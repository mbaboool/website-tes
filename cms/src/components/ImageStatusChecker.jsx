// components/ImageStatusChecker.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qfsfzrjpgrukferrelho.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmc2Z6cmpwZ3J1a2ZlcnJlbGhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MzkwMjIsImV4cCI6MjA3NzIxNTAyMn0.olR9VyCTPf87pKsa2bgKN4FleJJW7Y896CduEAOxIjY';
const supabase = createClient(supabaseUrl, supabaseKey);

const ImageStatusChecker = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    checkImageStatus();
  }, []);

  const checkImageStatus = async () => {
    setLoading(true);
    setError('');
    
    try {
      const result = {
        events: { total: 0, external: 0, supabase: 0 },
        gallery: { total: 0, external: 0, supabase: 0 },
        testimonials: { total: 0, external: 0, supabase: 0 }
      };

      // Cek events
      const { data: events, error: eventsError } = await supabase
        .from('events')
        .select('id, image');
      
      if (eventsError) throw new Error(`Events: ${eventsError.message}`);
      
      result.events.total = events.length;
      for (const event of events) {
        if (event.image) {
          if (event.image.includes('supabase.co')) {
            result.events.supabase++;
          } else {
            result.events.external++;
          }
        }
      }

      // Cek gallery_items
      const { data: gallery, error: galleryError } = await supabase
        .from('gallery_items')
        .select('id, image');
      
      if (galleryError) throw new Error(`Gallery: ${galleryError.message}`);
      
      result.gallery.total = gallery.length;
      for (const item of gallery) {
        if (item.image) {
          if (item.image.includes('supabase.co')) {
            result.gallery.supabase++;
          } else {
            result.gallery.external++;
          }
        }
      }

      // Cek testimonials (cek semua kolom yang mungkin berisi URL gambar)
      const { data: testimonials, error: testimonialsError } = await supabase
        .from('testimonials')
        .select('*');
      
      if (testimonialsError) throw new Error(`Testimonials: ${testimonialsError.message}`);
      
      result.testimonials.total = testimonials.length;
      for (const testimonial of testimonials) {
        // Cek semua field untuk kemungkinan URL gambar
        const possibleImageFields = Object.keys(testimonial).filter(field => 
          typeof testimonial[field] === 'string' && 
          (testimonial[field].includes('http') && 
          (testimonial[field].includes('.jpg') || 
           testimonial[field].includes('.png') || 
           testimonial[field].includes('.gif') ||
           testimonial[field].includes('.webp')))
        );
        
        for (const field of possibleImageFields) {
          if (testimonial[field].includes('supabase.co')) {
            result.testimonials.supabase++;
          } else {
            result.testimonials.external++;
          }
        }
      }

      setStatus(result);
    } catch (err) {
      setError(`Error checking image status: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card sx={{ maxWidth: 600, margin: '20px auto', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Pemeriksa Status Gambar
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Memeriksa status gambar di database...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto', boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Pemeriksa Status Gambar
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {status && (
          <Box>
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Tabel Events</Typography>
            <Typography variant="body2">Total: {status.events.total}, Eksternal: {status.events.external}, Supabase: {status.events.supabase}</Typography>
            
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Tabel Gallery Items</Typography>
            <Typography variant="body2">Total: {status.gallery.total}, Eksternal: {status.gallery.external}, Supabase: {status.gallery.supabase}</Typography>
            
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Tabel Testimonials</Typography>
            <Typography variant="body2">Total: {status.testimonials.total}, Eksternal: {status.testimonials.external}, Supabase: {status.testimonials.supabase}</Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              <strong>Keterangan:</strong> Gambar eksternal adalah gambar yang berasal dari URL selain Supabase.
              Hanya gambar eksternal yang akan dimigrasi ke Supabase Storage.
            </Typography>
          </Box>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <button onClick={checkImageStatus} disabled={loading}>
            Refresh
          </button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ImageStatusChecker;