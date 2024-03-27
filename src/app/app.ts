import express from 'express';

const app = express();

// Middleware

// Routes
app.use('/', (req, res) => {
    res.status(200).send('Welcome to the Express API!');
})

export default app;