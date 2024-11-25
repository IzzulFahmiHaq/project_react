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
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';  // Modern Home Icon
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';  // Modern Guru Icon
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';  // Modern Student Icon

const drawerWidth = 240; // Sidebar width
const navItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Dataguru', path: '/dataguru' },
  { label: 'Datamurid', path: '/datamurid' },
];

const theme = createTheme({
  palette: {
    primary: { main: '#2C3E50' }, // Dark blue for the sidebar
    secondary: { main: '#F39C12' }, // Gold for accents
    background: { default: '#34495E' }, // Dark background
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h6: {
      fontWeight: 700,
      fontSize: '1.5rem',
      letterSpacing: '0.5px',
      textShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      letterSpacing: '0.5px',
    },
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
        background: 'linear-gradient(135deg, #2C3E50, #34495E)', // Adjusted background
        height: '100%',
        color: '#fff', // White text
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
                backgroundColor: location.pathname === item.path ? '#F39C12' : 'transparent', // Gold when active
                '&:hover': {
                  backgroundColor: '#F39C12', // Gold on hover
                  transition: 'background-color 0.3s ease',
                  borderRadius: '8px', // Rounded hover effect
                },
              }}
            >
              {item.label === 'Dashboard' && <HomeOutlinedIcon sx={{ color: '#fff' }} />}  {/* Modern Home Icon */}
              {item.label === 'Dataguru' && <SchoolOutlinedIcon sx={{ color: '#fff' }} />}  {/* Modern Guru Icon */}
              {item.label === 'Datamurid' && <PersonOutlineIcon sx={{ color: '#fff' }} />}  {/* Modern Student Icon */}
              {!collapsed && (
                <ListItemText
                  primary={item.label}
                  sx={{
                    ml: 2, 
                    color: '#fff', 
                    fontWeight: 600, // Making the text bold for prominence
                    letterSpacing: '1px', // Adding space for modern look
                  }}  
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
            background: 'linear-gradient(135deg, #2C3E50, #34495E)', // Dark gradient for navbar
            transition: 'background-color 0.3s ease',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }} // Visible only on small screens
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: 'none', sm: 'block' },
                textShadow: '1px 1px 4px rgba(0, 0, 0, 0.4)', // Modern shadow for navbar title
              }}
            >
              This Data For Student And Teacher
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Mobile Sidebar */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' }, // Visible on small screens only
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: collapsed ? 60 : drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Desktop Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' }, // Visible on large screens only
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
            ml: { sm: collapsed ? 0 : `${drawerWidth}px` }, // Adjust left margin based on collapsed state
            transition: 'margin-left 0.3s',
            zIndex: 1,
            overflowX: 'auto',
          }}
        >
          <Toolbar />
          {/* Main content here */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
