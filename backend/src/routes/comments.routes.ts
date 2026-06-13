import { Router } from 'express';
import { allocateCommentId, comments } from '../data/store';
import type { CommentRecord } from '../types';

const router = Router();

// GET /comments
router.get('/', (_req, res) => {
  res.json({ data: comments });
});

// POST /comments
router.post('/', (req, res) => {
  const { comment, userId, eventId } = req.body ?? {};

  if (!comment || String(comment).trim().length === 0) {
    res.status(400).json({ message: 'Comment text is required' });
    return;
  }

  const record: CommentRecord = {
    id: allocateCommentId(),
    comment: String(comment),
    userId: userId ? Number(userId) : undefined,
    eventId: eventId ? Number(eventId) : undefined,
    createdAt: new Date().toISOString(),
  };
  comments.push(record);
  res.status(201).json({ data: record });
});

export default router;
