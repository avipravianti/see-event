import path from 'node:path';
import express, { type Application } from 'express';
import cors from 'cors';
import { env } from './config/env';
import eventsRouter from './routes/events.routes';
import usersRouter from './routes/users.routes';
import commentsRouter from './routes/comments.routes';
import { errorHandler, notFound } from './middleware/errorHandler';

export function createApp(): Application {
  const app = express();

  app.use(
    cors({
      origin: env.corsOrigins.length > 0 ? env.corsOrigins : true,
    }),
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/events', eventsRouter);
  app.use('/users', usersRouter);
  app.use('/comments', commentsRouter);

  // In the combined Docker image the backend also serves the built frontend.
  // Enabled only when CLIENT_BUILD_DIR points at the frontend's build output,
  // so local dev / tests / standalone deploys keep returning JSON 404s.
  if (env.clientBuildDir) {
    const clientDir = path.resolve(env.clientBuildDir);
    app.use(express.static(clientDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(clientDir, 'index.html'));
    });
  }

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
