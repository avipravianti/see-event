import { Grid, Typography, Box } from '@mui/material';
import logo from '@/assets/footer-logo.png';
import facebook from '@/assets/facebook.svg';
import instagram from '@/assets/instagram.svg';
import twitter from '@/assets/twitter.svg';
import youtube from '@/assets/youtube.svg';

const linkSx = { color: '#e3e3e3', mt: 1, listStyleType: 'none' };
const headingSx = {
  color: '#FFFFFF',
  fontFamily: 'Noto Sans',
  fontWeight: 'bold',
  fontSize: '18px',
};

export default function Footer() {
  return (
    <Grid
      container
      spacing={2}
      sx={{ backgroundColor: '#214457', pt: '48px', pb: '20px', mt: '60px' }}
    >
      <Grid item xs={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', ml: '112px' }}>
          <img src={logo} alt="SeeEvent" style={{ marginRight: 12 }} />
          <Typography
            variant="h6"
            sx={{ fontFamily: 'Open Sans', fontSize: '32px', color: '#F2D555' }}
          >
            See Event
          </Typography>
        </Box>
        <Box sx={{ width: '400px', ml: '112px', pt: '30px' }}>
          <Typography sx={{ color: '#F8F8F8', fontFamily: 'Noto Sans' }}>
            SeeEvent is a platform where you can create or find an amazing events around the world.
          </Typography>
          <Typography sx={{ mt: '32px', color: '#FFFFFF', fontFamily: 'Noto Sans' }}>
            Follow Us on
          </Typography>
          <Box sx={{ mt: '6px', display: 'flex', gap: '12px' }}>
            <img src={facebook} alt="Facebook" />
            <img src={instagram} alt="Instagram" />
            <img src={twitter} alt="Twitter" />
            <img src={youtube} alt="Youtube" />
          </Box>
          <Typography sx={{ mt: '30px', color: '#F8F8F8', fontFamily: 'Noto Sans' }}>
            © 2021 SeeEvent All rights reserved.
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={3}>
        <Box sx={{ ml: '290px' }}>
          <Typography sx={headingSx}>Links</Typography>
          <Box component="ul" sx={{ mt: '16px', width: '200px' }}>
            <Box component="li" sx={linkSx}>
              Home
            </Box>
            <Box component="li" sx={linkSx}>
              Explore
            </Box>
            <Box component="li" sx={linkSx}>
              My Events
            </Box>
            <Box component="li" sx={linkSx}>
              Bookmarks
            </Box>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={3}>
        <Box sx={{ ml: '110px' }}>
          <Typography sx={headingSx}>Top Categories</Typography>
          <Box component="ul" sx={{ mt: '16px' }}>
            <Box component="li" sx={linkSx}>
              Design
            </Box>
            <Box component="li" sx={linkSx}>
              Photography
            </Box>
            <Box component="li" sx={linkSx}>
              Development
            </Box>
            <Box component="li" sx={linkSx}>
              Marketing
            </Box>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={3}>
        <Box>
          <Typography sx={headingSx}>Contact Us</Typography>
          <Typography sx={{ mt: '16px', fontFamily: 'Noto Sans', color: '#F8F8F8' }}>
            Indonesia <br />
            Jl. Planet Namek No. 123, Surabaya <br />
            Telp : 083849420146 <br />
            Email : Johndoe@seeevent.com
          </Typography>
          <Box sx={{ mt: '115px', display: 'flex', gap: '16px', color: '#e3e3e3' }}>
            <Typography>Privacy Policy</Typography>
            <Typography>Terms of Service</Typography>
            <Typography>Helps</Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
