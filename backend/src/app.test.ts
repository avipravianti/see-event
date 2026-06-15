import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from './app';

const app = createApp();

describe('SeeEvent API', () => {
  it('reports health', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('returns the home events feed', async () => {
    const res = await request(app).get('/events/home');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.dataStarted)).toBe(true);
    expect(res.body.dataStarted.length).toBeGreaterThan(0);
  });

  it('returns a single event', async () => {
    const res = await request(app).get('/events/1');
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(1);
  });

  it('404s for an unknown event', async () => {
    const res = await request(app).get('/events/9999');
    expect(res.status).toBe(404);
  });

  it('signs in a seeded user and authorises /users', async () => {
    const signin = await request(app)
      .post('/users/signin')
      .send({ email: 'pratur345@gmail.com', password: 'secret123' });
    expect(signin.status).toBe(200);
    expect(signin.body.token).toBeTruthy();

    const me = await request(app).get('/users').set('token', signin.body.token);
    expect(me.status).toBe(200);
    expect(me.body.data.email).toBe('pratur345@gmail.com');
  });

  it('rejects /users without a token', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(401);
  });

  it('creates a comment', async () => {
    const res = await request(app)
      .post('/comments')
      .send({ comment: 'Nice event!', eventId: 1 });
    expect(res.status).toBe(201);
    expect(res.body.data.comment).toBe('Nice event!');
  });

  it('rejects creating an event without a token', async () => {
    const res = await request(app).post('/events').send({ title: 'Unauthorised' });
    expect(res.status).toBe(401);
  });

  async function signInSeededUser() {
    const signin = await request(app)
      .post('/users/signin')
      .send({ email: 'pratur345@gmail.com', password: 'secret123' });
    return signin.body.token as string;
  }

  it('creates and then edits an event as the authenticated owner', async () => {
    const token = await signInSeededUser();

    const created = await request(app)
      .post('/events')
      .set('token', token)
      .send({
        title: 'Workshop: Intro to TypeScript',
        time: 'MON, JUN 30 @ 6:00 PM ICT',
        category: 'Technology',
        detail: 'Hands-on session.',
      });
    expect(created.status).toBe(201);
    expect(created.body.data.title).toBe('Workshop: Intro to TypeScript');
    expect(created.body.data.category.name).toBe('Technology');

    const id = created.body.data.id;
    const updated = await request(app)
      .put(`/events/${id}`)
      .set('token', token)
      .send({ title: 'Workshop: Advanced TypeScript' });
    expect(updated.status).toBe(200);
    expect(updated.body.data.title).toBe('Workshop: Advanced TypeScript');
  });

  it('requires a title when creating an event', async () => {
    const token = await signInSeededUser();
    const res = await request(app).post('/events').set('token', token).send({ detail: 'no title' });
    expect(res.status).toBe(400);
  });

  it('updates the authenticated user profile', async () => {
    const token = await signInSeededUser();
    const res = await request(app)
      .put('/users')
      .set('token', token)
      .send({ firstName: 'Pratur', lastName: 'Renamed', email: 'pratur345@gmail.com' });
    expect(res.status).toBe(200);
    expect(res.body.data.lastName).toBe('Renamed');
    expect(res.body.data).not.toHaveProperty('password');
  });

  it('rejects a wrong old password on change', async () => {
    const token = await signInSeededUser();
    const res = await request(app)
      .put('/users/password')
      .set('token', token)
      .send({ oldPassword: 'wrong', newPassword: 'newsecret123' });
    expect(res.status).toBe(400);
  });

  it('changes the password with the correct old password', async () => {
    const token = await signInSeededUser();
    const res = await request(app)
      .put('/users/password')
      .set('token', token)
      .send({ oldPassword: 'secret123', newPassword: 'newsecret123' });
    expect(res.status).toBe(200);
  });
});
