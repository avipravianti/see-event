import { Grid, Typography } from '@mui/material';

interface DetailsSectionProps {
  detail?: string;
}

export default function DetailsSection({ detail }: DetailsSectionProps) {
  return (
    <Grid item xs={6}>
      <Typography sx={{ fontFamily: 'Noto Sans', fontWeight: 'bold', fontSize: '24px' }}>
        Details
      </Typography>
      <Typography sx={{ mt: '16px', width: '500px', fontFamily: 'Noto Sans' }}>{detail}</Typography>
    </Grid>
  );
}
