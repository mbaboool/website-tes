import React from 'react';
import { List, useGetList, Loading, Error, Link as RaLink, useRecordContext } from 'react-admin';
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
  Paper,
  TextField,
  InputAdornment,
  Tooltip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, RateReview as ReviewIcon, Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';

// Komponen untuk satu kartu testimoni
const TestimonialCard = ({ record }) => {
  if (!record) return null;

  const truncatedTestimonial = record.testimonial && record.testimonial.length > 100
    ? record.testimonial.substring(0, 100) + '...'
    : record.testimonial;

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
      <CardContent sx={{ flexGrow: 1, display: 'flex', alignItems: 'flex-start' }}>
        <Box mr={2}>
          {record.image ? (
            <Avatar src={record.image} alt={record.name} sx={{ width: 56, height: 56 }} />
          ) : (
            <Avatar sx={{ bgcolor: '#6366f1', width: 56, height: 56 }}>
              <ReviewIcon />
            </Avatar>
          )}
        </Box>
        <Box flexGrow={1}>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {record.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {record.company}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            "{truncatedTestimonial}"
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
        <Tooltip title={`Lihat/Edit: ${record.name}`}>
          <Chip
            icon={<EditIcon />}
            label="Edit"
            component={RaLink}
            to={`/testimonials/${record.id}/edit`}
            variant="outlined"
            size="small"
            color="primary"
            clickable
          />
        </Tooltip>
        <Tooltip title={`Hapus: ${record.name}`}>
          <Chip
            icon={<DeleteIcon />}
            label="Hapus"
            component="span"
            variant="outlined"
            size="small"
            color="secondary"
            clickable
            onClick={() => window.confirm(`Yakin ingin menghapus testimoni dari "${record.name}"?`) && console.log(`Hapus testimonial ${record.id}`)} // Ganti console.log
          />
        </Tooltip>
      </CardActions>
    </Card>
  );
};

// Komponen filter sederhana
const TestimonialFilter = ({ setFilter }) => {
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
        placeholder="Cari berdasarkan nama atau testimoni..."
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

// Komponen utama TestimonialList
export const TestimonialList = (props) => {
  const [filter, setFilter] = React.useState('');
  const { data, loading, error } = useGetList(
    'testimonials',
    {
      pagination: { page: 1, perPage: 100 },
      sort: { field: 'id', order: 'DESC' }, // Urutkan berdasarkan ID terbaru
    },
    {
      onSuccess: () => {},
      onFailure: (error) => console.error('Error fetching testimonials:', error),
    }
  );

  // Filter data secara klien
  const filteredData = data ? data.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase()) ||
    (item.testimonial && item.testimonial.toLowerCase().includes(filter.toLowerCase()))
  ) : [];

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <List
      {...props}
      title="Testimoni Pelanggan"
      actions={false}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#1f2937', mb: 1 }}>
          Kelola Testimoni Pelanggan
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#4b5563', mb: 2 }}>
          Atur testimoni dari pelanggan Anda. Tambahkan, edit, atau hapus testimoni sesuai kebutuhan.
        </Typography>
        <TestimonialFilter setFilter={setFilter} />
        <Button
          component={RaLink}
          to="/testimonials/create"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Tambah Testimoni Baru
        </Button>
      </Box>
      <Grid container spacing={3}>
        {filteredData.map((record) => (
          <Grid item xs={12} sm={6} md={4} key={record.id}>
            <TestimonialCard record={record} />
          </Grid>
        ))}
      </Grid>
      {filteredData.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="textSecondary">
            Tidak ada testimoni yang ditemukan.
          </Typography>
        </Box>
      )}
    </List>
  );
};