// utils/checkSchema.js
import { createClient } from '@supabase/supabase-js';

// Gunakan konfigurasi Supabase yang sama
const supabaseUrl = 'https://qfsfzrjpgrukferrelho.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmc2Z6cmpwZ3J1a2ZlcnJlbGhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MzkwMjIsImV4cCI6MjA3NzIxNTAyMn0.olR9VyCTPf87pKsa2bgKN4FleJJW7Y896CduEAOxIjY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Fungsi untuk memeriksa struktur tabel
export async function checkTableSchema() {
  console.log('Memeriksa struktur tabel...');

  // Ambil informasi tabel
  const { data: tables, error: tableError } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'public');

  if (tableError) {
    console.error('Gagal mengambil daftar tabel:', tableError);
    return;
  }

  console.log('Tabel yang tersedia:', tables.map(t => t.table_name));

  // Periksa kolom-kolom di masing-masing tabel yang relevan
  for (const table of ['events', 'gallery_items', 'testimonials']) {
    if (tables.some(t => t.table_name === table)) {
      const { data: columns, error: colError } = await supabase
        .from('information_schema.columns')
        .select('column_name, data_type')
        .eq('table_name', table);

      if (colError) {
        console.error(`Gagal mengambil kolom untuk tabel ${table}:`, colError);
      } else {
        console.log(`Kolom-kolom di tabel ${table}:`, columns.map(c => `${c.column_name} (${c.data_type})`));
      }
    }
  }
}

// Fungsi untuk mengambil sample data dari tabel testimonials
export async function getTestimonialsSample() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Gagal mengambil sample dari testimonials:', error);
  } else {
    console.log('Sample data dari testimonials:', data[0]);
    console.log('Kunci objek:', Object.keys(data[0] || {}));
  }
}