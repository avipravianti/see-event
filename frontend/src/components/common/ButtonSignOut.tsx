import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '@/lib/apiClient';

export default function ButtonSignOut() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    clearToken();
    navigate('/signin');
  };

  return (
    <Button
      variant="outlined"
      startIcon={<LogoutIcon />}
      onClick={handleSignOut}
      sx={{ fontFamily: 'Noto Sans', color: '#214457', borderColor: '#214457' }}
    >
      Sign Out
    </Button>
  );
}
