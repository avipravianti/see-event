import { AppBar, Box, Toolbar, Typography, Button, Avatar } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { isAuthenticated } from '@/lib/apiClient';
import { useAccount } from '@/api/auth';

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

function avatarProps(name: string, image?: string) {
  const parts = name.trim().split(' ');
  const initials = `${parts[0]?.[0] ?? ''}${parts[1]?.[0] ?? ''}`.toUpperCase();
  return {
    src: image || undefined,
    sx: { bgcolor: stringToColor(name), margin: 'auto' },
    children: initials,
  };
}

const navButtonSx = {
  width: '90px',
  height: '40px',
  fontFamily: 'Noto Sans',
  fontSize: '18px',
  textTransform: 'unset' as const,
};

const createButtonSx = {
  height: '40px',
  px: 2.5,
  mr: 2,
  fontFamily: 'Noto Sans',
  fontSize: '16px',
  fontWeight: 'bold',
  textTransform: 'unset' as const,
  backgroundColor: '#FFC94A',
  color: '#214457',
  borderRadius: '20px',
  '&:hover': { backgroundColor: '#f5bd2e' },
};

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const authed = isAuthenticated();
  const { data: account } = useAccount();
  const displayName = account
    ? `${account.firstName} ${account.lastName ?? ''}`.trim()
    : 'My Account';

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
          <Button component={Link} to="/create" variant="contained" sx={createButtonSx}>
            Create Event
          </Button>
          {authed ? (
            <Link to="/account">
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Avatar {...avatarProps(displayName, account?.image)} alt={displayName} />
                <Typography sx={{ fontWeight: 'bold', fontSize: '16px', ml: '16px', color: 'white' }}>
                  {displayName}
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
