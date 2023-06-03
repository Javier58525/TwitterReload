import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import React, { useContext } from 'react';
import { AuthContext } from '../authcontext';

const filePath = path.join(process.cwd(), 'src','pages','api','data', 'tweets.json');

export default function handler(req, res) {
  const { user } = useContext(AuthContext);

  if (req.method === 'GET') {
    // Leer los tweets desde el archivo JSON
    const tweets = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Filtrar los tweets por correo electrónico del usuario
    const userTweets = tweets.filter(tweet => tweet.email === user.email);

    res.status(200).json(userTweets);
  } else if (req.method === 'POST') {
    // Obtener los datos del nuevo tweet desde la solicitud
    const { content } = req.body;

    // Leer los tweets existentes desde el archivo JSON
    const tweets = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Crear un nuevo tweet
    const newTweet = {
      id: uuidv4(),
      content,
      email: user.email,
      comments: []
    };

    // Agregar el nuevo tweet al arreglo de tweets
    tweets.push(newTweet);

    // Escribir los tweets actualizados en el archivo JSON
    fs.writeFileSync(filePath, JSON.stringify(tweets, null, 2));

    res.status(201).json({ success: true, message: 'Tweet creado exitosamente', tweet: newTweet });
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
