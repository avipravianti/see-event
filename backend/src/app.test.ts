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
});
