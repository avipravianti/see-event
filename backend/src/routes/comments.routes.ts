import { Router } from 'express';
import { allocateCommentId, comments, users } from '../data/store';
import { authenticate } from '../middleware/auth';
import type { CommentRecord } from '../types';

const router = Router();

/** Resolve the author's display name from their account (not a stored copy). */
function withAuthor(comment: CommentRecord) {
  const user = users.find((u) => u.id === comment.userId);
  return {
    ...comment,
    authorName: user ? `${user.firstName} ${user.lastName}`.trim() : 'Anonymous',
    authorImage: user?.image,
  };
}

// GET /comments — optionally filtered to a single event via ?eventId=
router.get('/', (req, res) => {
  const eventId = req.query.eventId ? Number(req.query.eventId) : undefined;
  const result = eventId ? comments.filter((c) => c.eventId === eventId) : comments;
  res.json({ data: result.map(withAuthor) });
});

// POST /comments — must be authenticated; the author is the signed-in account.
router.post('/', authenticate, (req, res) => {
  const { comment, eventId } = req.body ?? {};

  if (!comment || String(comment).trim().length === 0) {
    res.status(400).json({ message: 'Comment text is required' });
    return;
  }

  const record: CommentRecord = {
    id: allocateCommentId(),
    comment: String(comment),
    userId: req.auth?.id,
    eventId: eventId ? Number(eventId) : undefined,
    createdAt: new Date().toISOString(),
  };
  comments.push(record);
  res.status(201).json({ data: withAuthor(record) });
});

export default router;
