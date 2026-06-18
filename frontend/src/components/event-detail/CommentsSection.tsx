import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, TextField, Button, Avatar } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useComments, useAddComment } from '@/api/comments';
import { isAuthenticated } from '@/lib/apiClient';

interface CommentsSectionProps {
  eventId?: number;
}

/** Compact "x minutes/hours/days ago" formatter. */
function timeAgo(iso?: string): string {
  if (!iso) return '';
  const ms = Date.now() - new Date(iso).getTime();
  if (Number.isNaN(ms)) return '';
  const min = Math.floor(ms / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min} minute${min > 1 ? 's' : ''} ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hour${hr > 1 ? 's' : ''} ago`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day} day${day > 1 ? 's' : ''} ago`;
  const mo = Math.floor(day / 30);
  if (mo < 12) return `${mo} month${mo > 1 ? 's' : ''} ago`;
  return `${Math.floor(mo / 12)} year${mo >= 24 ? 's' : ''} ago`;
}

export default function CommentsSection({ eventId }: CommentsSectionProps) {
  const { data: comments = [] } = useComments(eventId);
  const addComment = useAddComment();
  const [newComment, setNewComment] = useState('');
  const canComment = isAuthenticated();

  const handleSubmit = () => {
    const value = newComment.trim();
    if (!value) return;
    addComment.mutate({ comment: value, eventId }, { onSuccess: () => setNewComment('') });
  };

  return (
    <Box sx={{ width: '600px' }}>
      <Typography sx={{ fontFamily: 'Noto Sans', fontSize: '24px', fontWeight: 'bold', mt: '48px' }}>
        Comments
      </Typography>

      {comments.length === 0 ? (
        <Typography sx={{ mt: '24px', fontFamily: 'Noto Sans', color: '#787885' }}>
          No comments yet. Be the first to comment!
        </Typography>
      ) : (
        comments.map((item, index) => {
          const name = item.authorName ?? 'Anonymous';
          return (
            <Box key={item.id ?? index}>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: '32px' }}>
                <Avatar src={item.authorImage} sx={{ bgcolor: '#214457' }}>
                  {name.charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ ml: '16px' }}>
                  <Typography sx={{ fontFamily: 'Noto Sans', fontSize: '16px', fontWeight: 'bold' }}>
                    {name}
                  </Typography>
                  <Typography sx={{ fontFamily: 'Noto Sans', fontSize: '12px', color: '#787885' }}>
                    {timeAgo(item.createdAt)}
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ mt: '16px', fontFamily: 'Noto Sans' }}>{item.comment}</Typography>
            </Box>
          );
        })
      )}

      {canComment ? (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            multiline
            placeholder="Enter your comment here"
            rows={4}
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
            sx={{ width: '496px', mt: '32px' }}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={addComment.isPending || newComment.trim().length === 0}
            startIcon={<ChatBubbleOutlineIcon />}
            sx={{
              color: 'white',
              mt: '16px',
              p: '10px',
              backgroundColor: '#214457',
              borderRadius: '30px',
              fontFamily: 'Noto Sans',
              boxShadow: 'none',
              width: '184px',
              ml: '320px',
              textTransform: 'unset',
              '&:hover': { boxShadow: 'none', backgroundColor: '#4d6978' },
            }}
          >
            Submit
          </Button>
        </Box>
      ) : (
        <Typography sx={{ mt: '32px', fontFamily: 'Noto Sans', color: '#787885' }}>
          <Link to="/signin" style={{ color: '#3e89ae', fontWeight: 'bold' }}>
            Sign in
          </Link>{' '}
          to leave a comment.
        </Typography>
      )}
    </Box>
  );
}
