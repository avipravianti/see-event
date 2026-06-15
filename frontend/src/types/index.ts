export interface Category {
  id?: number;
  name: string;
}

export interface EventUser {
  firstName: string;
  lastName?: string;
  image?: string;
}

/** Summary shape used by the home + search listings. */
export interface EventSummary {
  id: number;
  title: string;
  photoEvent: string;
  category: Category;
  /** Present on the "starting soon" home feed. */
  dateStart?: string;
  /** Present on the generic /events listing. */
  time?: string;
  /** Home feed exposes the speaker name directly. */
  speakerName?: string;
  /** Search listing nests the organiser under `user`. */
  user?: EventUser;
}

/** Full event payload from GET /events/:id. */
export interface EventDetail {
  id: number;
  title: string;
  time: string;
  dateValue?: string;
  photoEvent: string;
  detail: string;
  category?: Category;
  user: EventUser;
}

/** Payload sent to POST /events and PUT /events/:id. */
export interface EventInput {
  title: string;
  /** Human-readable date/time string shown on the listing + detail pages. */
  time: string;
  /** Raw datetime-local value (e.g. "2021-10-24T01:15") backing the picker. */
  dateValue: string;
  category: string;
  detail: string;
  /** Optional image URL; the backend falls back to a placeholder when omitted. */
  photoEvent?: string;
}

export interface Comment {
  id?: number;
  comment: string;
  userId?: number;
  eventId?: number;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
}

export interface UserDetail {
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
}

/** Payload sent to PUT /users to edit the profile. */
export interface ProfileInput {
  firstName: string;
  lastName: string;
  email: string;
  /** Image URL or base64 data URL; empty string clears the picture. */
  image?: string;
}

/** Payload sent to PUT /users/password. */
export interface PasswordInput {
  oldPassword: string;
  newPassword: string;
}

/** Generic envelope helpers used by the backend responses. */
export interface DataEnvelope<T> {
  data: T;
}

export interface HomeEventsResponse {
  dataStarted: EventSummary[];
}

export interface EventsListResponse {
  events: EventSummary[];
}
