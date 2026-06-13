import Typography from '@mui/material/Typography';
import { Card, CardContent, CardMedia, CardActionArea } from '@mui/material';

interface EventCardProps {
  image: string;
  category: string;
  date: string;
  title: string;
  author: string;
  onClick?: () => void;
}

export default function EventCard({
  image,
  category,
  date,
  title,
  author,
  onClick,
}: EventCardProps) {
  return (
    <Card sx={{ maxWidth: 288, boxShadow: 'none' }} onClick={onClick}>
      <CardActionArea>
        <CardMedia component="img" height="200" image={image} alt={title} />
        <CardContent sx={{ p: 0, mt: 2, mx: 1, mb: 2 }}>
          <Typography
            variant="caption"
            component="div"
            sx={{
              fontSize: 12,
              backgroundColor: '#F0F2E9',
              width: 82,
              height: 24,
              textAlign: 'center',
              pt: 0.5,
            }}
          >
            {category}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 12, color: '#373737', mt: 1 }}>
            {date}
          </Typography>
          <Typography
            variant="body2"
            sx={{ width: 272, fontWeight: 'bold', fontSize: 14, color: '#000000', mt: 1 }}
          >
            {title}
          </Typography>
          <Typography variant="caption" sx={{ fontSize: 12, color: '#999999', mt: 1 }}>
            By {author}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
