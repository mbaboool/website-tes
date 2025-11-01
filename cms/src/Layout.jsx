import React from 'react';
import { 
  Layout as RaLayout, 
  AppBar as RaAppBar, 
  MenuItemLink,
  useSidebarState
} from 'react-admin';
import { 
  Drawer, 
  List, 
  Toolbar, 
  Typography,
  useMediaQuery,
  ThemeProvider,
  createTheme
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Event as EventIcon,
  PhotoLibrary as PhotoIcon,
  PeopleAlt as PeopleIcon,
  Settings as SettingsIcon,
  Link as LinkIcon,
  RateReview as TestimonialIcon
} from '@mui/icons-material';

// --- Gaya dan Tema ---
// Tema MUI opsional, bisa disesuaikan lebih lanjut
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4f46e5', // indigo-600
    },
    secondary: {
      main: '#f43f5e', // pink-500
    },
  },
});

// Warna dan ukuran untuk sidebar
const drawerWidth = 280;
const primaryTextColor = '#1e293b'; // slate-800
const secondaryTextColor = '#64748b'; // slate-500
const activeBgColor = '#e0e7ff'; // indigo-100
const hoverBgColor = '#f1f5f9'; // slate-100

// --- Komponen Sidebar ---
const CustomSidebar = (props) => {
  const [open] = useSidebarState(); // Gunakan state sidebar global
  const isXSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

  // Definisikan menu items
  const menuItems = [
    { to: '/', primaryText: 'Beranda', leftIcon: <DashboardIcon /> },
    { to: '/events', primaryText: 'Acara', leftIcon: <EventIcon /> },
    { to: '/gallery_items', primaryText: 'Galeri', leftIcon: <PhotoIcon /> },
    { to: '/book_details', primaryText: 'Permintaan Booking', leftIcon: <PeopleIcon /> },
    { to: '/testimonials', primaryText: 'Testimoni', leftIcon: <TestimonialIcon /> },
    { to: '/social_links', primaryText: 'Tautan Sosial', leftIcon: <LinkIcon /> },
    { to: '/settings', primaryText: 'Pengaturan Situs', leftIcon: <SettingsIcon /> },
  ];

  // Jika layar sangat kecil, gunakan sidebar bawaan react-admin
  if (isXSmall) {
    return null; // react-admin akan menanganinya
  }

  return (
    <Drawer
      variant="permanent"
      open={open} // Gunakan state global untuk open/close
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          backgroundColor: '#ffffff', // Latar putih
          borderRight: '1px solid #e2e8f0', // Garis batas halus
          boxSizing: 'border-box',
          overflowX: 'hidden',
          transition: 'width 0.3s',
        },
      }}
    >
      <Toolbar
        sx={{ 
          backgroundColor: '#f8fafc', // Latar header sidebar
          borderBottom: '1px solid #e2e8f0',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {open && <Typography variant="h6" sx={{ color: primaryTextColor, fontWeight: 'bold' }}>CMS Website Mas Bagus</Typography>}
        {!open && <Typography variant="h6" sx={{ color: primaryTextColor, fontWeight: 'bold', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>CMS</Typography>}
      </Toolbar>
      <List sx={{ py: 1 }}>
        {menuItems.map((item, index) => (
          <MenuItemLink
            key={index}
            to={item.to}
            primaryText={item.primaryText}
            leftIcon={item.leftIcon}
            sx={{
              '& .RaMenuItemLink-root': {
                borderRadius: '8px',
                mx: 1,
                mb: 0.5,
                color: secondaryTextColor,
                '& .MuiTypography-root': {
                  fontWeight: 500,
                },
                '& .MuiListItemIcon-root': {
                  color: secondaryTextColor,
                  minWidth: '32px',
                },
                '&.RaMenuItemLink-active, &.RaMenuItemLink-active:hover': {
                  backgroundColor: activeBgColor,
                  color: 'primary.main',
                  '& .MuiTypography-root, & .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                },
                '&:hover': {
                  backgroundColor: hoverBgColor,
                  color: primaryTextColor,
                  '& .MuiListItemIcon-root': {
                    color: primaryTextColor,
                  },
                }
              }
            }}
          />
        ))}
      </List>
    </Drawer>
  );
};

// --- Komponen AppBar ---
const CustomAppBar = (props) => {
  return (
    <RaAppBar
      color="secondary"
      {...props}
      sx={{
        backgroundColor: '#4f46e5', // indigo-600
        color: 'white',
      }}
    />
  );
};

// --- Komponen Layout Utama ---
const CustomLayout = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <RaLayout
        {...props}
        appBar={CustomAppBar}
        sidebar={CustomSidebar}
      />
    </ThemeProvider>
  );
};

export default CustomLayout;