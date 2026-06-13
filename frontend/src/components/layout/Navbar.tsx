import { AppBar, Box, Toolbar, Typography, Button, Avatar } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { isAuthenticated } from '@/lib/apiClient';

function stringToColor(value: string): string {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i += 1) {
    const channel = (hash >> (i * 8)) & 0xff;
    color += `00${channel.toString(16)}`.slice(-2);
  }
  return color;
}

function avatarProps(name: string) {
  const parts = name.split(' ');
  const initials = `${parts[0]?.[0] ?? ''}${parts[1]?.[0] ?? ''}`;
  return { sx: { bgcolor: stringToColor(name), margin: 'auto' }, children: initials };
}

const navButtonSx = {
  width: '90px',
  height: '40px',
  fontFamily: 'Noto Sans',
  fontSize: '18px',
  textTransform: 'unset' as const,
};

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const authed = isAuthenticated();

  return (
    <AppBar
      position={isHome ? 'absolute' : 'relative'}
      style={{ background: isHome ? 'transparent' : '#214457', boxShadow: 'none' }}
    >
      <Toolbar
        sx={{
          height: '90px',
          display: 'flex',
          justifyContent: 'space-between',
          mx: 10.5,
        }}
      >
        <Link to="/">
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
            <img src={logo} alt="logo" style={{ width: '75px' }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                display: { xs: 'none', sm: 'block' },
                ml: 1,
                fontFamily: 'Open Sans',
                fontSize: '32px',
              }}
            >
              See Event
            </Typography>
          </Box>
        </Link>

        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          {authed ? (
            <Link to="/account">
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Avatar {...avatarProps('My Account')} alt="account" />
                <Typography sx={{ fontWeight: 'bold', fontSize: '16px', ml: '16px', color: 'white' }}>
                  My Account
                </Typography>
              </Box>
            </Link>
          ) : (
            <Box sx={{ display: 'flex' }}>
              <Button component={Link} to="/signup" color="inherit" sx={navButtonSx}>
                Sign Up
              </Button>
              <Button component={Link} to="/signin" color="inherit" sx={navButtonSx}>
                Sign In
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
