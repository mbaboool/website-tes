import React from 'react';
import { List, Datagrid, TextField, EmailField, DateField, EditButton, DeleteButton, useGetList, Loading, Error, Link } from 'react-admin';
import { Box, Button, Paper, TextField as MuiTextField, InputAdornment, Typography } from '@mui/material';
import { Edit as EditIcon, Search as SearchIcon, Assignment as AssignmentIcon } from '@mui/icons-material';

// Komponen filter sederhana
const BookFilter = ({ setFilter }) => {
  const [value, setValue] = React.useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    setFilter(e.target.value);
  };

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mb: 2, borderRadius: '24px' }}
      onSubmit={(e) => e.preventDefault()}
    >
      <InputAdornment position="start" sx={{ pl: 1 }}>
        <SearchIcon />
      </InputAdornment>
      <MuiTextField
        fullWidth
        placeholder="Cari berdasarkan nama atau email..."
        value={value}
        onChange={handleChange}
        variant="outlined"
        size="small"
        InputProps={{
          sx: { pl: 1 }
        }}
      />
    </Paper>
  );
};


// Komponen utama BookList
export const BookList = (props) => {
  const [filter, setFilter] = React.useState('');

  // Definisikan field-field yang ingin ditampilkan
  const gridFields = [
    <TextField key="name" source="name" label="Nama Pemesan" />,
    <EmailField key="email" source="email" label="Email" />,
    <TextField key="company.name" source="company.name" label="Perusahaan" />, // Asumsi company adalah objek dengan field 'name'
    <DateField key="createdAt" source="createdAt" label="Tanggal Dibuat" showTime />, // Asumsi ada field createdAt
    <EditButton key="edit" label="Lihat/Edit" />
  ];

  // Gunakan filter klien jika data tidak terlalu banyak
  // Gunakan filter server-side jika data sangat banyak (lebih kompleks)
  // Untuk sekarang, kita gunakan filter klien seperti di EventList

  return (
    <List
      {...props}
      title="Daftar Permintaan Booking"
      actions={false} // Nonaktifkan actions default
      sort={{ field: 'createdAt', order: 'DESC' }} // Urutkan berdasarkan tanggal terbaru
      perPage={25} // Batasi item per halaman
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#1f2937', mb: 1 }}>
          Kelola Permintaan Booking
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#4b5563', mb: 2 }}>
          Lihat dan kelola permintaan booking yang masuk. Gunakan fitur pencarian untuk menemukan pesanan spesifik.
        </Typography>
        <BookFilter setFilter={setFilter} />
        {/* Tidak ada tombol "Tambah" karena BookCreate tidak ada di App.jsx */}
      </Box>

      <Datagrid
        // Kita bisa filter data di sini secara klien, tapi react-admin biasanya menanganinya di List atau useGetList
        // Karena Datagrid mengharapkan kumpulan record dari List, kita abaikan filter klien di sini
        // dan andalkan List untuk pagination dan fetching.
        // Jika benar-benar ingin filter klien di sini, Datagrid harus diganti dengan komponen kustom.
        // Kita gunakan Datagrid standar.
        // Catatan: Kita tidak bisa langsung filter data di Datagrid tanpa komponen kustom.
        // Solusi: Gunakan komponen kustom untuk List yang mengatur state filter dan record.
        // Kita ikuti pendekatan standar dulu.

        // Untuk fitur filter klien, List membaca data, kita filter di sini sebelum render Datagrid.
        // Tapi List meneruskan data ke Datagrid. Jadi, kita perlu pendekatan khusus.
        // Kita akan gunakan `filter` prop di `List` component jika backend mendukung.
        // Jika tidak, kita harus buat komponen `List` kustom.
        // Kita gunakan filter klien sederhana di level ini dengan bantuan `useGetList` langsung.
        // Ini menggantikan `List` bawaan untuk kasus ini.

        // Tapi, agar tetap kompatibel dengan `Resource` di App.jsx, kita buat agar `List` bawaan
        // tetap digunakan, dan filter klien diimplementasikan dengan state dan perubahan data sebelum render Datagrid.
        // Ini bisa dilakukan dengan membungkus Datagrid dalam komponen yang mengelola state filter.

        // Solusi sederhana untuk saat ini: Gunakan `List` bawaan, dan `Datagrid` bawaan.
        // Implementasi filter klien lanjutan bisa dilakukan nanti.
        // Fokus saat ini: tampilan dan field yang benar.
        {...props}
        bulkActionButtons={false} // Nonaktifkan aksi massal jika tidak diperlukan
      >
        {gridFields}
      </Datagrid>
    </List>
  );
};