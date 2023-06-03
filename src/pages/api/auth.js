import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src','pages','api','data', 'users.json');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Leer los usuarios existentes desde el archivo JSON
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Verificar si el usuario ya existe
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    const newUser = {
      id: users.length + 1,
      email,
      password
    };

    // Agregar el nuevo usuario al arreglo de usuarios
    users.push(newUser);

    // Escribir los usuarios actualizados en el archivo JSON
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
