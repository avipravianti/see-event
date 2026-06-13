import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: '160px', mb: '160px' }}>
      <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#214457' }}>
        404
      </Typography>
      <Typography sx={{ mt: 2, fontFamily: 'Noto Sans' }}>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={{ mt: 4, backgroundColor: '#214457', textTransform: 'unset' }}
      >
        Back to Home
      </Button>
    </Container>
  );
}
