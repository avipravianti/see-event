import { Button } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export default function ButtonBookmark() {
  return (
    <Button
      variant="outlined"
      startIcon={<BookmarkIcon />}
      sx={{ color: '#214457', border: '3px solid', fontFamily: 'Noto Sans', textTransform: 'unset' }}
    >
      Save
    </Button>
  );
}
