import pool from '../db.js';
import { nanoid } from 'nanoid';

export const shortenUrl = async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: 'Please provide a valid URL.' });
  }

  const shortCode = nanoid(8); // Generate an 8-character unique short code

  try {
    const result = await pool.query(
      'INSERT INTO urls (long_url, short_code) VALUES ($1, $2) RETURNING short_code',
      [longUrl, shortCode]
    );

    const shortUrl = `${req.protocol}://${req.get('host')}/${result.rows[0].short_code}`;
    res.status(201).json({ shortUrl });
  } catch (error) {
    console.error('Error shortening URL:', error);
    res.status(500).json({ error: 'Failed to shorten URL.' });
  }
};

export const redirectToUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const result = await pool.query('SELECT long_url FROM urls WHERE short_code = $1', [shortCode]);

    if (result.rows.length > 0) {
      const longUrl = result.rows[0].long_url;
      res.redirect(301, longUrl);
    } else {
      res.status(404).json({ error: 'Short URL not found.' });
    }
  } catch (error) {
    console.error('Error redirecting:', error);
    res.status(500).json({ error: 'Failed to redirect.' });
  }
};