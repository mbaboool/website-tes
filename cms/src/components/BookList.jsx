import React from 'react';
import { List, Datagrid, TextField, EmailField, DateField, EditButton, DeleteButton, useGetList, Loading, Error } from 'react-admin';
import { Box, Button, Paper, TextField as MuiTextField, InputAdornment, Typography } from '@mui/material';
import { Edit as EditIcon, Search as SearchIcon, Assignment as AssignmentIcon } from '@mui/icons-material';

// Komponen filter sederhana
const BookFilter = ({ setFilter }) => {
  const [value, setValue] = React.useState('');

  const [debouncedFilter, setDebouncedFilter] = React.useState('');
  const debounceTimeoutRef = React.useRef(null);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setFilter(newValue);
    }, 300); // Debounce for 300ms
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


// Definisikan field-field yang ingin ditampilkan
const gridFields = [
  <TextField key="name" source="name" label="Nama Pemesan" />,
  <EmailField key="email" source="email" label="Email" />,
  <TextField key="company.name" source="company.name" label="Perusahaan" />, // Asumsi company adalah objek dengan field 'name'
  <DateField key="createdAt" source="createdAt" label="Tanggal Dibuat" showTime />, // Asumsi ada field createdAt
  <EditButton key="edit" label="Lihat/Edit" />
];

// Komponen utama BookList
export const BookList = (props) => {

  return (
    <List
      {...props}
      title="Daftar Permintaan Booking"
      actions={false} // Nonaktifkan actions default
      sort={{ field: 'createdAt', order: 'DESC' }} // Urutkan berdasarkan tanggal terbaru
      perPage={25} // Batasi item per halaman
      filter={filter ? { q: filter } : {}} // Apply filter based on the search input
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
        {...props}
        bulkActionButtons={false} // Nonaktifkan aksi massal jika tidak diperlukan
      >
        {gridFields}
      </Datagrid>
    </List>
  );
};