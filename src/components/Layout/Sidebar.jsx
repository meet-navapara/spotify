import { 
  Drawer, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Toolbar, 
  Box, 
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      sx={{
        width: isMobile ? 56 : drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isMobile ? 56 : drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#000',
          color: 'white',
        },
      }}
    >
      {/* Logo + Title */}
      <Toolbar sx={{ px: isMobile ? 1 : 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/768px-Spotify_icon.svg.png?20220821125323"
            alt="Spotify"
            sx={{ 
              height: isMobile ? 24 : 32, 
              width: isMobile ? 24 : 32,
              minWidth: isMobile ? 24 : 32 
            }}
          />
          {!isMobile && (
            <Typography variant="h6" sx={{ color: 'green', fontWeight: 'bold' }}>
              Spotify
            </Typography>
          )}
        </Box>
      </Toolbar>

      {/* Nav Items */}
      <List sx={{ paddingTop: 2 }}>
        {[
          { text: 'Home', icon: <HomeIcon />, path: '/' },
          { text: 'Playlist', icon: <PlaylistPlayIcon />, path: '/playlist' },
          { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
        ].map((item) => (
          <NavLink
            to={item.path}
            key={item.text}
            style={({ isActive }) => ({
              textDecoration: 'none',
              color: isActive ? 'green' : 'white',
              backgroundColor: isActive ? '#111' : 'transparent',
            })}
          >
            <ListItemButton
              sx={{
                px: isMobile ? 1.5 : 2,
                '&:hover': {
                  backgroundColor: '#111',
                },
                justifyContent: isMobile ? 'center' : 'flex-start',
              }}
            >
              <ListItemIcon 
                sx={{ 
                  color: 'inherit',
                  minWidth: 'auto',
                  mr: isMobile ? 0 : 2 
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!isMobile && <ListItemText primary={item.text} />}
            </ListItemButton>
          </NavLink>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;