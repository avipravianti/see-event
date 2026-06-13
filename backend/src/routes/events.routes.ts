import { Router } from 'express';
import { events } from '../data/store';

const router = Router();

// GET /events/home — events starting soon (home feed).
router.get('/home', (_req, res) => {
  res.json({ dataStarted: events });
});

// GET /events — full listing used by the search page.
router.get('/', (_req, res) => {
  res.json({ events });
});

// GET /events/:id — single event detail.
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const event = events.find((e) => e.id === id);
  if (!event) {
    res.status(404).json({ message: 'Event not found' });
    return;
  }
  res.json({ data: event });
});

export default router;
