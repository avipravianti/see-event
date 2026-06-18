import { Container, Typography, Stack } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import DateFilter from './DateFilter';
import CategoryFilter from './CategoryFilter';

interface SearchFilterProps {
  /** Category options derived from the loaded events. */
  categories: string[];
}

export default function SearchFilter({ categories }: SearchFilterProps) {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') ?? '';
  const date = params.get('date') ?? '';

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setParams(next, { replace: true });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: '64px' }}>
      <Typography sx={{ fontWeight: 'bold', fontSize: '20px', fontFamily: 'Noto Sans' }}>
        Showing Results
      </Typography>
      <Stack direction="row" spacing={3} sx={{ mt: '24px' }}>
        <DateFilter value={date} onChange={(value) => update('date', value)} />
        <CategoryFilter
          value={category}
          options={categories}
          onChange={(value) => update('category', value)}
        />
      </Stack>
    </Container>
  );
}
