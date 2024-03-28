import express from 'express';
import { MainRouter, UsersRouter } from '../routers';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/', MainRouter);
app.use('/api/v1/users', UsersRouter);

export default app;