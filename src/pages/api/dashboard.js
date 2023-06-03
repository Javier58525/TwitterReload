// dashboard.js

import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'tweets.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Leer los tweets desde el archivo JSON
    const tweets = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Obtener los últimos 10 tweets
    const latestTweets = tweets.slice(-10);

    res.status(200).json(latestTweets);
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
