import { Typography, Box } from '@mui/material';
import calendar from '@/assets/calendar.png';

interface HeaderEventProps {
  title?: string;
  time?: string;
  category?: string;
}

export default function HeaderEvent({ title, time, category }: HeaderEventProps) {
  return (
    <>
      <Typography variant="h3" sx={{ fontFamily: 'Noto Sans', fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: '18.5px' }}>
        <img src={calendar} alt="" style={{ width: '35px' }} />
        <Typography sx={{ pt: '5px', fontFamily: 'Noto Sans' }}>{time}</Typography>
        <Box
          sx={{
            p: '7px',
            ml: '24px',
            width: '90px',
            textAlign: 'center',
            fontFamily: 'Noto Sans',
            fontSize: '12px',
            backgroundColor: '#F0F2E9',
          }}
        >
          {category ?? 'Event'}
        </Box>
      </Box>
    </>
  );
}
