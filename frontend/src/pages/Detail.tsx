import { Link, useParams } from 'react-router-dom';
import { Container, Grid, CircularProgress, Box, Typography, Button } from '@mui/material';
import { isAuthenticated } from '@/lib/apiClient';
import HeaderEvent from '@/components/event-detail/HeaderEvent';
import HeaderPhoto from '@/components/event-detail/HeaderPhoto';
import DetailsSection from '@/components/event-detail/DetailsSection';
import CreatedBySection from '@/components/event-detail/CreatedBySection';
import CommentsSection from '@/components/event-detail/CommentsSection';
import { useEventDetail } from '@/api/events';

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const { data: event, isLoading, isError } = useEventDetail(id);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '120px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !event) {
    return (
      <Container maxWidth="md" sx={{ mt: '120px' }}>
        <Typography sx={{ textAlign: 'center', fontFamily: 'Noto Sans' }}>
          Event not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: '64px' }}>
      {isAuthenticated() ? (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <Button
            component={Link}
            to={`/edit/${event.id}`}
            variant="outlined"
            sx={{ textTransform: 'unset', color: '#214457', borderColor: '#214457' }}
          >
            Edit event
          </Button>
        </Box>
      ) : null}
      <HeaderEvent title={event.title} time={event.time} category={event.category?.name} />
      <HeaderPhoto photoEvent={event.photoEvent} />

      <Grid container spacing={2} sx={{ mt: '31px' }}>
        <DetailsSection detail={event.detail} />
        <CreatedBySection user={event.user} />
      </Grid>

      <CommentsSection eventId={event.id} />
    </Container>
  );
}
