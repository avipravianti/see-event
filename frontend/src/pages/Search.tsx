import { useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Stack, Container, Typography, CircularProgress, Box } from '@mui/material';
import EventCard from '@/components/cards/EventCard';
import SearchFilter from '@/components/search-filter/SearchFilter';
import { useEvents } from '@/api/events';
import { matchesDateBucket, parseEventDate } from '@/utils/eventDate';

export default function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() ?? '';
  const category = searchParams.get('category') ?? '';
  const date = searchParams.get('date') ?? '';
  const { data: events = [], isLoading } = useEvents();

  // Category options come from the events that actually exist.
  const categories = useMemo(
    () =>
      Array.from(new Set(events.map((e) => e.category?.name).filter(Boolean) as string[])).sort(),
    [events],
  );

  const filtered = useMemo(
    () =>
      events.filter((e) => {
        if (query && !e.title.toLowerCase().includes(query)) return false;
        if (category && (e.category?.name ?? '') !== category) return false;
        if (!matchesDateBucket(parseEventDate(e), date)) return false;
        return true;
      }),
    [events, query, category, date],
  );

  return (
    <Container maxWidth="xl" sx={{ mt: '64px' }}>
      <SearchFilter categories={categories} />
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
