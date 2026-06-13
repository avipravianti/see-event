import { useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Stack, Container, Typography, CircularProgress, Box } from '@mui/material';
import EventCard from '@/components/cards/EventCard';
import SearchFilter from '@/components/search-filter/SearchFilter';
import { useEvents } from '@/api/events';

export default function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() ?? '';
  const { data: events = [], isLoading } = useEvents();

  const filtered = useMemo(
    () => (query ? events.filter((e) => e.title.toLowerCase().includes(query)) : events),
    [events, query],
  );

  return (
    <Container maxWidth="xl" sx={{ mt: '64px' }}>
      <SearchFilter />
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '50px' }}>
          <CircularProgress />
        </Box>
      ) : filtered.length === 0 ? (
        <Typography sx={{ textAlign: 'center', mt: '50px', fontFamily: 'Noto Sans' }}>
          Sorry, we couldn&apos;t find any events for this search.
        </Typography>
      ) : (
        <Stack direction="row" justifyContent="center" spacing={3} flexWrap="wrap" mt="50px">
          {filtered.map((item) => (
            <EventCard
              key={item.id}
              image={item.photoEvent}
              category={item.category?.name ?? ''}
              date={item.time ?? item.dateStart ?? ''}
              title={item.title}
              author={item.user?.firstName ?? item.speakerName ?? 'Unknown'}
              onClick={() => navigate(`/detail/${item.id}`)}
            />
          ))}
        </Stack>
      )}
    </Container>
  );
}
