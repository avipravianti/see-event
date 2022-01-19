import Typography from '@mui/material/Typography';
import { Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
// import { useHistory } from 'react-router';


export default function ActionAreaCard({ image, category, date, title, author }) {

  // const history = useHistory();

  return (
    <Card sx={{ maxWidth: 288, boxShadow: 'none'}} >
      <CardActionArea>
        <CardMedia component="img" height="200" image={image} alt="event" />
        <CardContent sx={{ padding: 0, marginTop: 2, marginLeft: 1, marginBottom: 2, marginRight: 1 }}>
          <Typography variant="caption" component="div" sx={{ fontSize: 12, backgroundColor: '#F0F2E9', width: 82, height: 24, textAlign: 'center', paddingTop: 0.5 }}>
            {category}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 12, color: '#373737', marginTop: 1 }}>
            {date}
          </Typography>
          <Typography variant="body2" sx={{ width: 272, fontWeight: 'bold', fonSize: 14, color: '#000000', marginTop: 1 }}>
            {title}
          </Typography>
          <Typography variant="caption" sx={{ fonSize: 12, color: '#999999', marginTop: 1 }}>
            By {author}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
