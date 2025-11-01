# Catatan Saya Mengenai Proyek Jon

Oke, Jon, ini catatan saya mengenai proyek Anda agar saya tidak lupa dan kita tetap sejalan.

## Suasana Kerja Kita
- **Anda:** Jon, seorang programmer pemula yang santai.
- **Saya:** Asisten coding Anda yang siap membantu kapan saja.
- **Tujuan:** Membuat proyek ini menjadi keren bersama-sama.

## Rangkuman Proyek

Proyek ini berisi dua bagian utama:

1.  **Folder `react` (Tampilan Utama Website)**
    - **Fungsi:** Untuk website personal "Bagus Baraja" dan bukunya "Rahasia Keajaiban Doa".
    - **Teknologi:** Dibuat menggunakan React dan Vite.
    - **Fitur Keren:** Menggunakan `react-three/fiber` untuk animasi 3D, dan terhubung ke Supabase & Firebase untuk mengelola data seperti testimoni dan konsultasi.
    - **Konten:** Sebagian besar teks statis disimpan di `src/content.json`.

2.  **Folder `cms` (Panel Admin)**
    - **Fungsi:** Ini adalah "dapur" dari website Anda. Tempat Anda mengatur konten seperti acara, foto galeri, dan testimoni.
    - **Teknologi:** Dibuat menggunakan framework `react-admin` untuk mempermudah pembuatan panel admin.
    - **Backend:** Terhubung langsung ke database Supabase Anda. File `dataProvider.js` adalah kunci yang mengatur semua komunikasi data.

## Cara Kerjanya
- **CMS (`cms`)** adalah remotnya. Anda menambah dan mengedit konten di sana.
- **Website (`react`)** adalah TV-nya. Website ini hanya menampilkan konten yang sudah Anda atur dari CMS, karena keduanya mengambil data dari database Supabase yang sama.

---

## Gaya Bahasa Kita
- **Model:** Bahasa Indonesia yang santai dan mudah dipahami (tanpa 'lu-gue' atau dialek daerah).
- **Tujuan:** Agar obrolan kita lebih jelas dan produktif.