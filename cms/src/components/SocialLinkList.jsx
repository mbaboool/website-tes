import React from 'react';
import { List, useGetList, Loading, Error, Link as RaLink, useRecordContext } from 'react-admin';
import {
  Card,
  CardContent,
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
  Link as MuiLink
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Link as LinkIcon, Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';

// Komponen untuk satu kartu tautan sosial
const SocialLinkCard = ({ record }) => {
  if (!record) return null;

  // Ambil ikon berdasarkan platform (opsional, bisa menggunakan library ikon tambahan)
  // Untuk sekarang, gunakan ikon generik
  const getPlatformIcon = (platform) => {
    // Contoh sederhana, bisa diperluas
    const platformLower = platform.toLowerCase();
    if (platformLower.includes('instagram')) return <Avatar sx={{ bgcolor: '#e4405f' }}><LinkIcon /></Avatar>; // Instagram color
    if (platformLower.includes('facebook')) return <Avatar sx={{ bgcolor: '#1877f2' }}><LinkIcon /></Avatar>; // Facebook color
    if (platformLower.includes('twitter') || platformLower.includes('x')) return <Avatar sx={{ bgcolor: '#000000' }}><LinkIcon /></Avatar>; // X (Twitter) color
    // Tambahkan lainnya sesuai kebutuhan
    return <Avatar sx={{ bgcolor: '#6366f1' }}><LinkIcon /></Avatar>; // Default indigo
  };

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
          {getPlatformIcon(record.platform)}
        </Box>
        <Box flexGrow={1}>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {record.platform}
          </Typography>
          <MuiLink href={record.url} target="_blank" rel="noopener" color="primary" variant="body2">
            {record.url}
          </MuiLink>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
        <Chip
          icon={<EditIcon />}
          label="Edit"
          component={RaLink}
          to={`/social_links/${record.id}/edit`}
          variant="outlined"
          size="small"
          color="primary"
          clickable
        />
        <Chip
          icon={<DeleteIcon />}
          label="Hapus"
          component="span"
          variant="outlined"
          size="small"
          color="secondary"
          clickable
          onClick={() => window.confirm(`Yakin ingin menghapus tautan "${record.platform}"?`) && console.log(`Hapus link ${record.id}`)} // Ganti console.log
        />
      </CardActions>
    </Card>
  );
};

// Komponen filter sederhana
const SocialLinkFilter = ({ setFilter }) => {
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
        placeholder="Cari berdasarkan platform..."
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

// Komponen utama SocialLinkList
export const SocialLinkList = (props) => {
  const [filter, setFilter] = React.useState('');
  const { data, loading, error } = useGetList(
    'social_links',
    {
      pagination: { page: 1, perPage: 100 },
      sort: { field: 'platform', order: 'ASC' }, // Urutkan berdasarkan platform
    },
    {
      onSuccess: () => {},
      onFailure: (error) => console.error('Error fetching social links:', error),
    }
  );

  // Filter data secara klien
  const filteredData = data ? data.filter(item =>
    item.platform.toLowerCase().includes(filter.toLowerCase())
  ) : [];

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <List
      {...props}
      title="Tautan Media Sosial"
      actions={false}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#1f2937', mb: 1 }}>
          Kelola Tautan Media Sosial
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#4b5563', mb: 2 }}>
          Atur tautan ke akun media sosial Anda. Tambah atau edit tautan sesuai kebutuhan.
        </Typography>
        <SocialLinkFilter setFilter={setFilter} />
        <Button
          component={RaLink}
          to="/social_links/create" // Asumsi create tersedia jika ditambahkan di App.jsx
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          disabled // Disable sementara karena SocialLinkCreate tidak dibuat
        >
          Tambah Tautan Baru
        </Button>
      </Box>
      <Grid container spacing={3}>
        {filteredData.map((record) => (
          <Grid item xs={12} sm={6} md={4} key={record.id}>
            <SocialLinkCard record={record} />
          </Grid>
        ))}
      </Grid>
      {filteredData.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="textSecondary">
            Tidak ada tautan sosial yang ditemukan.
          </Typography>
        </Box>
      )}
    </List>
  );
};