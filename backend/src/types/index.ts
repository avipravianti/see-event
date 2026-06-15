export interface Category {
  id?: number;
  name: string;
}

export interface EventUser {
  firstName: string;
  lastName?: string;
  image?: string;
}

export interface EventRecord {
  id: number;
  title: string;
  photoEvent: string;
  category: Category;
  dateStart: string;
  time: string;
  speakerName: string;
  detail: string;
  user: EventUser;
  /** Raw datetime-local value (e.g. "2021-10-24T01:15") backing the date picker. */
  dateValue?: string;
  /** Id of the user who created the event; used to authorise edits. */
  ownerId?: number;
}

export interface UserRecord {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image?: string;
}

export interface CommentRecord {
  id: number;
  comment: string;
  userId?: number;
  eventId?: number;
  createdAt: string;
}

export interface AuthTokenPayload {
  id: number;
  email: string;
}
