import type { CommentRecord, EventRecord, UserRecord } from '../types';

/**
 * In-memory data store. This keeps the API self-contained and runnable without
 * a database. Swap these arrays for a real persistence layer (Prisma, Mongo,
 * etc.) without changing the route/controller contracts.
 */

const PLACEHOLDER_PHOTO = 'https://picsum.photos/seed/seeevent/600/400';

export const events: EventRecord[] = [
  {
    id: 1,
    title: 'How to make your business growth 10 times within 1 year',
    photoEvent: PLACEHOLDER_PHOTO,
    category: { id: 1, name: 'Business' },
    dateStart: 'SUN, OCT 24 @ 1:15 AM ICT',
    time: 'SUN, OCT 24 @ 1:15 AM ICT',
    speakerName: 'Adit nanto',
    detail:
      'Join this workshop to learn proven strategies for scaling your business rapidly while keeping operations lean and customers happy.',
    user: { firstName: 'Adit', lastName: 'Nanto', image: PLACEHOLDER_PHOTO },
  },
  {
    id: 2,
    title: 'Hitting Reset: How to Land A Job in UX Design',
    photoEvent: PLACEHOLDER_PHOTO,
    category: { id: 2, name: 'Design' },
    dateStart: 'SUN, OCT 24 @ 1:15 AM ICT',
    time: 'SUN, OCT 24 @ 1:15 AM ICT',
    speakerName: 'Ernest',
    detail:
      'A practical session on building a UX portfolio, acing interviews, and transitioning into a design career.',
    user: { firstName: 'Ernest', lastName: 'Prakasa', image: PLACEHOLDER_PHOTO },
  },
  {
    id: 3,
    title: 'Google Ads 101 with the best marketing agency',
    photoEvent: PLACEHOLDER_PHOTO,
    category: { id: 3, name: 'Marketing' },
    dateStart: 'SUN, OCT 24 @ 1:15 AM ICT',
    time: 'SUN, OCT 24 @ 1:15 AM ICT',
    speakerName: 'Budi Setiawan',
    detail: 'Everything you need to launch your first profitable Google Ads campaign.',
    user: { firstName: 'Budi', lastName: 'Setiawan', image: PLACEHOLDER_PHOTO },
  },
  {
    id: 4,
    title: 'How to create a design system',
    photoEvent: PLACEHOLDER_PHOTO,
    category: { id: 2, name: 'Design' },
    dateStart: 'SUN, OCT 24 @ 1:15 AM ICT',
    time: 'SUN, OCT 24 @ 1:15 AM ICT',
    speakerName: 'Agung Dwi Putra',
    detail: 'Learn how to build and maintain a scalable design system for your product team.',
    user: { firstName: 'Agung', lastName: 'Dwi Putra', image: PLACEHOLDER_PHOTO },
  },
];

export const users: UserRecord[] = [
  {
    id: 1,
    firstName: 'Pratur',
    lastName: 'Anahata',
    email: 'pratur345@gmail.com',
    password: 'secret123',
    image: PLACEHOLDER_PHOTO,
  },
];

export const comments: CommentRecord[] = [
  {
    id: 1,
    comment: 'Great event, looking forward to attending!',
    userId: 1,
    eventId: 1,
    createdAt: new Date('2024-01-01T00:00:00.000Z').toISOString(),
  },
];

let nextUserId = users.length + 1;
let nextCommentId = comments.length + 1;

export function allocateUserId(): number {
  return nextUserId++;
}

export function allocateCommentId(): number {
  return nextCommentId++;
}
