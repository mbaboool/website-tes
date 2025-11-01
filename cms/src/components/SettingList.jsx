import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import { Box, Paper, TextField as MuiTextField, InputAdornment, Typography, Chip } from '@mui/material';
import { Edit as EditIcon, Search as SearchIcon, Settings as SettingsIcon } from '@mui/icons-material';

// Komponen filter sederhana
const SettingFilter = ({ setFilter }) => {
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
        placeholder="Cari berdasarkan kunci pengaturan..."
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

// Komponen custom untuk menampilkan value setting
// Karena value bisa berupa string, object, atau array, kita tampilkan dengan cara yang aman
const ValueField = ({ record }) => {
  if (!record || record.value === undefined || record.value === null) {
    return <Typography variant="body2" color="textSecondary">Tidak Ada Nilai</Typography>;
  }

  let displayValue = record.value;
  if (typeof record.value === 'object') {
    try {
      displayValue = JSON.stringify(record.value, null, 2); // Format JSON dengan indentasi
    } catch (e) {
      displayValue = 'Data Tidak Valid';
    }
  } else if (typeof record.value !== 'string' && typeof record.value !== 'number') {
    displayValue = String(displayValue);
  }

  return (
    <Box sx={{ maxWidth: '300px' }}>
      <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.75rem', bgcolor: '#f1f5f9', p: 1, borderRadius: 1, overflow: 'auto' }}>
        {displayValue}
      </Typography>
    </Box>
  );
};

// Komponen utama SettingList
export const SettingList = (props) => {
  const [filter, setFilter] = React.useState('');

  // Field-field yang akan ditampilkan di datagrid
  const gridFields = [
    <TextField key="key" source="key" label="Kunci Pengaturan" sortable={true} />,
    <ValueField key="value" label="Nilai Saat Ini" />, // Gunakan komponen kustom
    <TextField key="description" source="description" label="Deskripsi" sortable={false} />,
    <EditButton key="edit" label="Ubah" />
  ];

  return (
    <List
      {...props}
      title="Pengaturan Situs"
      actions={false}
      sort={{ field: 'key', order: 'ASC' }} // Urutkan berdasarkan kunci
      perPage={25}
      filter={filter ? { key: filter } : {}} // Apply filter based on the search input
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#1f2937', mb: 1 }}>
          Kelola Pengaturan Situs
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#4b5563', mb: 1 }}>
          Atur pengaturan penting untuk situs Anda. Hati-hati saat mengubah nilai-nilai ini karena dapat mempengaruhi tampilan dan fungsi situs.
        </Typography>
        <Chip
          label="Peringatan Penting"
          color="warning"
          variant="outlined"
          size="small"
          sx={{ mb: 1 }}
        />
        <SettingFilter setFilter={setFilter} />
        {/* Tidak ada tombol "Tambah" karena BookCreate tidak ada */}
      </Box>
      <Datagrid
        {...props}
        bulkActionButtons={false} // Nonaktifkan aksi massal untuk pengaturan
      >
        {gridFields}
      </Datagrid>
    </List>
  );
};