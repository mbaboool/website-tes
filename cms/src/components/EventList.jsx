import React from 'react';
import { List, useGetList, Loading, Error, Link, EditButton, DeleteButton } from 'react-admin';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Grid,
  Box,
  Button,
  Chip,
  Avatar,
  useTheme,
  useMediaQuery,
  Paper,
  Toolbar,
  TextField,
  InputAdornment
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';

// Komponen untuk satu kartu acara
const EventCard = ({ record }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  if (!record) return null; // Handle jika record tidak ditemukan

  const formatDate = (dateString) => {
    if (!dateString) return 'Tanggal tidak valid';
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
  };

  const truncatedDescription = record.description && record.description.length > 100
    ? record.description.substring(0, 100) + '...'
    : record.description;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
      }}
    >
      {record.image && (
        <CardMedia
          component="img"
          height="140"
          image={record.image}
          alt={record.title}
          sx={{ objectFit: 'cover' }}
        />
      )}
      {!record.image && (
        <Box
          sx={{
            height: 140,
            backgroundColor: '#e2e8f0', // slate-200
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography color="textSecondary">Tidak Ada Gambar</Typography>
        </Box>
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {record.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {truncatedDescription}
        </Typography>
        <Box mt={1}>
          <EditButton record={record} basePath="/events" sx={{ mr: 1 }} />
          <DeleteButton record={record} basePath="/events" mutationMode="pessimistic" />
        </Box>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        <Typography variant="caption" display="block" gutterBottom>
          Tanggal: {formatDate(record.date)}
        </Typography>
      </Box>
    </Card>
  );
};

// Komponen filter sederhana
const EventFilter = ({ setFilter }) => {
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
      onSubmit={(e) => e.preventDefault()} // Prevent default form submit
    >
      <InputAdornment position="start" sx={{ pl: 1 }}>
        <SearchIcon />
      </InputAdornment>
      <TextField
        fullWidth
        placeholder="Cari acara..."
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

// Komponen utama EventList
export const EventList = (props) => {
  const [filter, setFilter] = React.useState('');
  const { data, loading, error, refetch } = useGetList(
    'events',
    {
      pagination: { page: 1, perPage: 25 }, // Set a reasonable perPage for server-side filtering
      sort: { field: 'date', order: 'DESC' }, // Urutkan berdasarkan tanggal terbaru
      filter: filter ? { q: filter } : {}, // Pass the filter to the dataProvider
    },
    {
      onSuccess: () => {},
      onFailure: (error) => console.error('Error fetching events:', error),
    }
  );

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <List
      {...props}
      title="Kelola Acara"
      actions={false} // Nonaktifkan actions default, gunakan yang kustom
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#1f2937', mb: 1 }}>
          Kelola Acara
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#4b5563', mb: 2 }}>
          Atur dan kelola informasi acara Anda. Tambahkan, edit, atau hapus acara sesuai kebutuhan.
        </Typography>
        <EventFilter setFilter={setFilter} />
        <Button
          component={Link}
          to="/events/create"
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
        >
          Tambah Acara Baru
        </Button>
      </Box>
      <Grid container spacing={3}>
        {data.map((record) => (
          <Grid item xs={12} sm={6} md={4} key={record.id}>
            <EventCard record={record} />
          </Grid>
        ))}
      </Grid>
      {data.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="textSecondary">
            Tidak ada acara yang ditemukan.
          </Typography>
        </Box>
      )}
    </List>
  );
};