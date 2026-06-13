import { Container, Typography, Stack } from '@mui/material';
import DateFilter from './DateFilter';
import CategoryFilter from './CategoryFilter';

export default function SearchFilter() {
  return (
    <Container maxWidth="lg" sx={{ mt: '64px' }}>
      <Typography sx={{ fontWeight: 'bold', fontSize: '20px', fontFamily: 'Noto Sans' }}>
        Showing Results
      </Typography>
      <Stack direction="row" spacing={3} sx={{ mt: '24px' }}>
        <DateFilter />
        <CategoryFilter />
      </Stack>
    </Container>
  );
}
