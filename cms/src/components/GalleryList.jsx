import React from 'react';
import { List, useGetList, Loading, Error, Link, useRecordContext } from 'react-admin';
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
import { Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon, AddPhotoAlternate as AddPhotoIcon } from '@mui/icons-material';

// Komponen untuk satu kartu galeri
const GalleryCard = ({ record }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  if (!record) return null;

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
          height="200"
          image={record.image} // Gunakan field 'image' dari record
          alt={record.caption || 'Gambar Galeri'} // Gunakan caption atau default
          sx={{ objectFit: 'cover' }}
        />
      )}
      {!record.image && (
        <Box
          sx={{
            height: 200,
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
          {record.caption || 'Tanpa Keterangan'} {/* Gunakan caption atau default */}
        </Typography>
        <Box mt={1}>
          {/* Tombol Edit */}
          <Chip
            icon={<EditIcon />}
            label="Edit"
            component={Link}
            to={`/gallery_items/${record.id}/edit`}
            variant="outlined"
            size="small"
            color="primary"
            clickable
            sx={{ mr: 1 }}
          />
          {/* Tombol Hapus */}
          <Chip
            icon={<DeleteIcon />}
            label="Hapus"
            component="span"
            variant="outlined"
            size="small"
            color="secondary"
            clickable
            onClick={() => window.confirm(`Yakin ingin menghapus gambar "${record.caption || record.id}"?`) && console.log(`Hapus galeri ${record.id}`)} // Ganti console.log
          />
        </Box>
      </CardContent>
    </Card>
  );
};

// Komponen filter sederhana
const GalleryFilter = ({ setFilter }) => {
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
      <TextField
        fullWidth
        placeholder="Cari berdasarkan keterangan..."
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

// Komponen utama GalleryList
export const GalleryList = (props) => {
  const [filter, setFilter] = React.useState('');
  const { data, loading, error } = useGetList(
    'gallery_items',
    {
      pagination: { page: 1, perPage: 100 },
      sort: { field: 'id', order: 'DESC' }, // Urutkan berdasarkan ID terbaru sebagai contoh
    },
    {
      onSuccess: () => {},
      onFailure: (error) => console.error('Error fetching gallery items:', error),
    }
  );

   // Filter data secara klien berdasarkan input
   const filteredData = data ? data.filter(item =>
    (item.caption && item.caption.toLowerCase().includes(filter.toLowerCase()))
  ) : [];

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <List
      {...props}
      title="Kelola Galeri"
      actions={false}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#1f2937', mb: 1 }}>
          Kelola Galeri
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#4b5563', mb: 2 }}>
          Tambah, edit, atau hapus foto di galeri Anda. Gunakan fitur pencarian untuk menemukan foto dengan cepat.
        </Typography>
        <GalleryFilter setFilter={setFilter} />
        <Button
          component={Link}
          to="/gallery_items/create"
          variant="contained"
          color="primary"
          startIcon={<AddPhotoIcon />}
        >
          Tambah Gambar Baru
        </Button>
      </Box>
      <Grid container spacing={3}>
        {filteredData.map((record) => (
          <Grid item xs={12} sm={6} md={4} key={record.id}>
            <GalleryCard record={record} />
          </Grid>
        ))}
      </Grid>
      {filteredData.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="textSecondary">
            Tidak ada gambar yang ditemukan.
          </Typography>
        </Box>
      )}
    </List>
  );
};