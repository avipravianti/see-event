import { useState } from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import yoshua from '@/assets/yoshua.png';
import { useComments, useAddComment } from '@/api/comments';

interface CommentsSectionProps {
  eventId?: number;
}

export default function CommentsSection({ eventId }: CommentsSectionProps) {
  const { data: comments = [] } = useComments();
  const addComment = useAddComment();
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    const value = newComment.trim();
    if (!value) return;
    addComment.mutate(
      { comment: value, eventId },
      { onSuccess: () => setNewComment('') },
    );
  };

  return (
    <Box sx={{ width: '600px' }}>
      <Typography
        sx={{ fontFamily: 'Noto Sans', fontSize: '24px', fontWeight: 'bold', mt: '48px' }}
      >
        Comments
      </Typography>

      {comments.map((item, index) => (
        <Box key={item.id ?? index}>
          <Box sx={{ display: 'flex', mt: '32px' }}>
            <img src={yoshua} alt="" />
            <Box sx={{ ml: '16px' }}>
              <Typography sx={{ fontFamily: 'Noto Sans', fontSize: '16px', fontWeight: 'bold' }}>
                Agnes Mo
              </Typography>
              <Typography sx={{ fontFamily: 'Noto Sans', fontSize: '12px' }}>
                4 Hours ago
              </Typography>
            </Box>
          </Box>
          <Typography sx={{ mt: '16px', fontFamily: 'Noto Sans' }}>{item.comment}</Typography>
        </Box>
      ))}

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          multiline
          placeholder="Enter your comment here"
          rows={4}
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          sx={{ width: '496px', mt: '16px' }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={addComment.isPending}
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
    </Box>
  );
}
