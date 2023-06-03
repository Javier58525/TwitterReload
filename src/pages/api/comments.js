// comments.js

import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'tweets.json');

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Obtener los datos del comentario desde la solicitud
    const { tweetId, content, userId } = req.body;

    // Leer los tweets existentes desde el archivo JSON
    const tweets = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Buscar el tweet al que se va a agregar el comentario
    const tweet = tweets.find(t => t.id === tweetId);

    if (!tweet) {
      return res.status(404).json({ error: 'Tweet no encontrado' });
    }

    // Crear un nuevo comentario
    const newComment = {
      id: uuidv4(),
      content,
      userId
    };

    // Agregar el comentario al arreglo de comentarios del tweet
    tweet.comments.push(newComment);

    // Escribir los tweets actualizados en el archivo JSON
    fs.writeFileSync(filePath, JSON.stringify(tweets, null, 2));

    res.status(201).json({ success: true, message: 'Comentario creado exitosamente', comment: newComment });
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
