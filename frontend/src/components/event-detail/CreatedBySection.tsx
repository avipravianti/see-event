import { Grid, Box, Typography, Stack } from '@mui/material';
import ButtonShare from './ButtonShare';
import ButtonBookmark from './ButtonBookmark';
import type { EventUser } from '@/types';

interface CreatedBySectionProps {
  user?: EventUser;
}

export default function CreatedBySection({ user }: CreatedBySectionProps) {
  return (
    <Grid item xs={6}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
        {user?.image ? (
          <img src={user.image} alt={user.firstName} style={{ width: 64, borderRadius: '50%' }} />
        ) : null}
        <Box>
          <Typography sx={{ fontFamily: 'Noto Sans', fontSize: '12px' }}>Created by</Typography>
          <Typography sx={{ fontFamily: 'Noto Sans', fontSize: '16px', fontWeight: 'bold' }}>
            {user?.firstName}
          </Typography>
        </Box>
      </Box>

      <Stack
        direction="row"
        spacing={2}
        sx={{ display: 'flex', justifyContent: 'center', mt: '23px' }}
      >
        <ButtonShare />
        <ButtonBookmark />
      </Stack>
    </Grid>
  );
}
