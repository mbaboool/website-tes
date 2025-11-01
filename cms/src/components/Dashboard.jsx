import React from 'react';
import { useGetList, Loading, Error, Link as RaLink } from 'react-admin';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Box,
  Button,
  Avatar,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Event as EventIcon,
  PhotoLibrary as PhotoIcon,
  PeopleAlt as PeopleIcon,
  RateReview as ReviewIcon,
  Settings as SettingsIcon,
  Link as LinkIcon,
  Add as AddIcon,
} from '@mui/icons-material';

// Komponen untuk kartu statistik
const StatCard = ({ title, value, icon, color, to, actionLabel }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              {value}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
      {to && actionLabel && (
        <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
          <Button
            size="small"
            component={RaLink}
            to={to}
            startIcon={<AddIcon />}
            variant="outlined"
            color="primary"
          >
            {actionLabel}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

// Komponen untuk tampilan selamat datang dan info
const WelcomeCard = () => (
  <Card
    sx={{
      borderRadius: '16px',
      backgroundColor: '#f0f9ff', // bg-blue-50
      borderColor: '#bae6fd', // border-blue-300
      border: '1px solid',
      mb: 3,
    }}
  >
    <CardContent>
      <Box display="flex" alignItems="flex-start">
        <Avatar sx={{ bgcolor: '#3b82f6', mr: 2 }}> {/* bg-blue-500 */}
          <EventIcon />
        </Avatar>
        <Box>
          <Typography variant="h5" gutterBottom>
            Selamat Datang di CMS Mas Bagus!
          </Typography>
          <Typography variant="body1" paragraph>
            Ini adalah pusat kendali untuk mengelola konten website Anda.
            Gunakan menu di sisi kiri untuk memulai.
          </Typography>
          <Box mt={1}>
            <Chip label="Tip" color="primary" size="small" sx={{ mr: 1 }} />
            <Typography variant="body2" component="span">
              Klik pada kartu di bawah untuk melihat atau mengelola konten.
            </Typography>
          </Box>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  // Ambil data untuk statistik
  const { data: eventsData, loading: eventsLoading, error: eventsError } = useGetList('events', { pagination: { page: 1, perPage: 1 } });
  const { data: galleryData, loading: galleryLoading, error: galleryError } = useGetList('gallery_items', { pagination: { page: 1, perPage: 1 } });
  const { data: bookingData, loading: bookingLoading, error: bookingError } = useGetList('book_details', { pagination: { page: 1, perPage: 1 } });
  const { data: testimonialsData, loading: testimonialsLoading, error: testimonialsError } = useGetList('testimonials', { pagination: { page: 1, perPage: 1 } });

  // Tampilkan loading jika salah satu sedang mengambil data
  if (eventsLoading || galleryLoading || bookingLoading || testimonialsLoading) {
    return <Loading />;
  }

  // Tampilkan error jika terjadi kesalahan
  if (eventsError || galleryError || bookingError || testimonialsError) {
    return <Error />;
  }

  const eventCount = eventsData ? eventsData.length : 0;
  const galleryCount = galleryData ? galleryData.length : 0;
  const bookingCount = bookingData ? bookingData.length : 0;
  const testimonialCount = testimonialsData ? testimonialsData.length : 0;

  return (
    <Box sx={{ p: 3 }}>
      <WelcomeCard />
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
        Ringkasan Konten
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Acara"
            value={eventCount}
            icon={<EventIcon />}
            color="#3b82f6" // blue-500
            to="/events"
            actionLabel="Kelola"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Galeri"
            value={galleryCount}
            icon={<PhotoIcon />}
            color="#10b981" // emerald-500
            to="/gallery_items"
            actionLabel="Kelola"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Booking"
            value={bookingCount}
            icon={<PeopleIcon />}
            color="#f59e0b" // amber-500
            to="/book_details"
            actionLabel="Lihat Detail"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Testimoni"
            value={testimonialCount}
            icon={<ReviewIcon />}
            color="#8b5cf6" // violet-500
            to="/testimonials"
            actionLabel="Kelola"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Tautan Sosial"
            value="-" // Jumlah tidak dinamis untuk contoh
            icon={<LinkIcon />}
            color="#ec4899" // pink-500
            to="/social_links"
            actionLabel="Edit"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pengaturan"
            value="-"
            icon={<SettingsIcon />}
            color="#6366f1" // indigo-500
            to="/settings"
            actionLabel="Atur"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

// Export default dengan nama yang benar
export default Dashboard;