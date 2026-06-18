import { Router } from 'express';
import { allocateEventId, events, PLACEHOLDER_PHOTO, users } from '../data/store';
import { authenticate } from '../middleware/auth';
import { fileToDataUrl, uploadEventImage } from '../middleware/upload';
import type { Category, EventRecord } from '../types';

const router = Router();

/** Accept a category as a plain name string or a `{ id, name }` object. */
function normaliseCategory(input: unknown): Category {
  if (typeof input === 'string') {
    return { name: input };
  }
  if (input && typeof input === 'object' && 'name' in input) {
    const { id, name } = input as Partial<Category>;
    return { id, name: String(name ?? '') };
  }
  return { name: 'Uncategorised' };
}

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

// POST /events — create a new event (must be authenticated).
// Accepts multipart/form-data with an optional `image` file upload.
router.post('/', authenticate, uploadEventImage, (req, res) => {
  const { title, detail, time, dateStart, dateValue, category, photoEvent } = req.body ?? {};

  if (!title || String(title).trim().length === 0) {
    res.status(400).json({ message: 'Title is required' });
    return;
  }

  const owner = users.find((u) => u.id === req.auth?.id);
  const when = String(dateStart ?? time ?? '');
  // Prefer an uploaded file, fall back to an explicit URL, then a placeholder.
  const image = req.file ? fileToDataUrl(req.file) : photoEvent ? String(photoEvent) : undefined;

  const record: EventRecord = {
    id: allocateEventId(),
    title: String(title),
    photoEvent: image ?? PLACEHOLDER_PHOTO,
    category: normaliseCategory(category),
    dateStart: when,
    time: when,
    dateValue: dateValue ? String(dateValue) : undefined,
    speakerName: owner ? `${owner.firstName} ${owner.lastName}`.trim() : '',
    detail: detail ? String(detail) : '',
    user: owner
      ? { firstName: owner.firstName, lastName: owner.lastName, image: owner.image }
      : { firstName: '' },
    ownerId: req.auth?.id,
  };

  events.push(record);
  res.status(201).json({ data: record });
});

// PUT /events/:id — edit an event (owner only).
// Accepts multipart/form-data with an optional `image` file upload.
router.put('/:id', authenticate, uploadEventImage, (req, res) => {
  const id = Number(req.params.id);
  const event = events.find((e) => e.id === id);

  if (!event) {
    res.status(404).json({ message: 'Event not found' });
    return;
  }
  if (event.ownerId !== req.auth?.id) {
    res.status(403).json({ message: 'You can only edit your own events' });
    return;
  }

  const { title, detail, time, dateStart, dateValue, category, photoEvent } = req.body ?? {};

  // A newly uploaded file wins; otherwise an explicit photoEvent URL may update it.
  if (req.file) {
    event.photoEvent = fileToDataUrl(req.file);
  } else if (photoEvent !== undefined && String(photoEvent).length > 0) {
    event.photoEvent = String(photoEvent);
  }

  if (title !== undefined) {
    if (String(title).trim().length === 0) {
      res.status(400).json({ message: 'Title cannot be empty' });
      return;
    }
    event.title = String(title);
  }
  if (detail !== undefined) event.detail = String(detail);
  if (category !== undefined) event.category = normaliseCategory(category);
  if (dateValue !== undefined) event.dateValue = String(dateValue);
  if (dateStart !== undefined || time !== undefined) {
    const when = String(dateStart ?? time);
    event.dateStart = when;
    event.time = when;
  }

  res.json({ data: event });
});

export default router;
