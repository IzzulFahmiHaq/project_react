import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';  // Ikon Home
import SchoolIcon from '@mui/icons-material/School';  // Ikon Guru
import PersonIcon from '@mui/icons-material/Person';  // Ikon Pelajar

const drawerWidth = 240; // Lebar sidebar
const navItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Dataguru', path: '/dataguru' },
  { label: 'Datamurid', path: '/datamurid' },
];

const theme = createTheme({
  palette: {
    primary: { main: '#2c3e50' }, // Warna biru tua untuk elemen utama
    secondary: { main: '#f39c12' }, // Warna emas untuk aksen
    background: { default: '#ecf0f1' }, // Warna latar belakang terang
  },
});

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  const drawerContent = (
    <Box
      sx={{
        textAlign: 'center',
        background: 'linear-gradient(135deg, #2c3e50 30%, #34495e)', // Gradasi warna biru tua untuk tampilan elegan
        height: '100%',
        color: '#fff', // Teks dan ikon berwarna putih
      }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        {collapsed ? 'D' : 'Data'}
      </Typography>
      <Divider sx={{ background: '#fff' }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                textAlign: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                px: 2,
                backgroundColor: location.pathname === item.path ? '#f39c12' : 'transparent', // Warna emas saat aktif
                '&:hover': {
                  backgroundColor: '#f1c40f', // Warna emas terang saat hover
                },
              }}
            >
              {item.label === 'Dashboard' && <HomeIcon sx={{ color: '#fff' }} />}  {/* Ikon Home */}
              {item.label === 'Dataguru' && <SchoolIcon sx={{ color: '#fff' }} />}  {/* Ikon Guru */}
              {item.label === 'Datamurid' && <PersonIcon sx={{ color: '#fff' }} />}  {/* Ikon Pelajar */}
              {!collapsed && (
                <ListItemText
                  primary={item.label}
                  sx={{ ml: 2, color: '#fff' }}  // Warna teks putih untuk menu
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <IconButton
        onClick={handleCollapseToggle}
        sx={{
          position: 'absolute',
          bottom: 10,
          left: collapsed ? 8 : drawerWidth - 48,
          color: '#fff',
        }}
      >
        {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: '#34495e', // Warna biru tua untuk header
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }} // Show only on small screens
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Data
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Sidebar untuk Mobile */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' }, // Show on small screens only
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: collapsed ? 60 : drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Sidebar Tetap untuk Desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' }, // Show on larger screens only
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: collapsed ? 60 : drawerWidth,
              transition: 'width 0.3s',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            ml: { sm: collapsed ? 0 : `${drawerWidth}px` }, // Adjust margin-left based on collapsed state
            transition: 'margin-left 0.3s',
            zIndex: 1,
            overflowX: 'auto',
          }}
        >
          <Toolbar />
          {/* Konten utama lainnya */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
