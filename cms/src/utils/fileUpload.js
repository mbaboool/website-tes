// utils/fileUpload.js
import { createClient } from '@supabase/supabase-js';

// Gunakan konfigurasi Supabase yang sama
const supabaseUrl = 'https://qfsfzrjpgrukferrelho.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmc2Z6cmpwZ3J1a2ZlcnJlbGhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MzkwMjIsImV4cCI6MjA3NzIxNTAyMn0.olR9VyCTPf87pKsa2bgKN4FleJJW7Y896CduEAOxIjY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Fungsi untuk mengupload file ke Supabase Storage
export async function uploadFileToSupabase(file, bucketName = 'images', folderPath = '') {
  try {
    // Validasi file
    if (!file) {
      throw new Error('Tidak ada file untuk diupload');
    }

    // Validasi tipe file
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validImageTypes.includes(file.type)) {
      throw new Error(`Tipe file tidak didukung: ${file.type}. Hanya gambar yang diperbolehkan.`);
    }

    // Validasi ukuran file (maksimal 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error(`File terlalu besar: ${file.size} bytes. Maksimal 5MB.`);
    }

    // Buat nama file unik
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const fileName = `${folderPath}${Date.now()}_${Math.random().toString(36).substring(2, 10)}.${fileExtension}`;
    
    // Upload ke Supabase Storage
    const { data, error } = await supabase
      .storage
      .from(bucketName)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false, // Jangan timpa file yang sudah ada
        contentType: file.type
      });

    if (error) {
      throw new Error(`Gagal upload file: ${error.message}`);
    }

    // Dapatkan URL publik
    const { data: publicData } = supabase
      .storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return {
      success: true,
      url: publicData.publicUrl,
      path: fileName
    };
  } catch (error) {
    console.error('Error upload file ke Supabase:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Fungsi untuk menghapus file dari Supabase Storage
export async function deleteFileFromSupabase(filePath, bucketName = 'images') {
  try {
    // Pastikan filePath adalah array
    const filePaths = Array.isArray(filePath) ? filePath : [filePath];
    
    const { error } = await supabase
      .storage
      .from(bucketName)
      .remove(filePaths);

    if (error) {
      throw new Error(`Gagal menghapus file: ${error.message}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error menghapus file dari Supabase:', error);
    return { success: false, error: error.message };
  }
}

// Fungsi untuk mendapatkan nama file dari URL
export function getFileNameFromUrl(url) {
  if (!url) return null;
  
  try {
    // Coba parsing URL
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    
    // Untuk URL Supabase Storage, ambil bagian akhir setelah "object/public/"
    const publicIndex = pathParts.indexOf('public');
    if (publicIndex !== -1 && publicIndex < pathParts.length - 1) {
      // Gabungkan semua bagian setelah "public/bucket_name/"
      const fileName = pathParts.slice(publicIndex + 2).join('/');
      return fileName || null;
    }
    
    // Jika tidak ditemukan pola di atas, ambil bagian terakhir
    const fileName = pathParts[pathParts.length - 1];
    return fileName || null;
  } catch (error) {
    console.error('Error parsing URL:', error);
    return null;
  }
}

// Fungsi untuk mendapatkan folder dari URL
export function getFolderFromUrl(url) {
  if (!url) return '';
  
  try {
    const fileName = getFileNameFromUrl(url);
    if (!fileName) return '';
    
    const pathParts = fileName.split('/');
    if (pathParts.length > 1) {
      pathParts.pop(); // Hapus nama file
      return pathParts.join('/') + '/';
    }
    return '';
  } catch (error) {
    console.error('Error getting folder from URL:', error);
    return '';
  }
}