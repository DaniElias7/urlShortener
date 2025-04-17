import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pool from './db.js';
import { shortenUrl, redirectToUrl } from './controllers/urlController.js';

import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post('/api/shorten', shortenUrl);
app.get('/:shortCode', redirectToUrl);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Initialize database table (for development convenience)
try {
  await pool.connect(async (err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS urls (
          id SERIAL PRIMARY KEY,
          long_url TEXT NOT NULL,
          short_code VARCHAR(10) UNIQUE NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('Database table initialized (if not already present)');
    } finally {
      release();
    }
  });
} catch (error) {
  console.error('Error during database initialization:', error);
}