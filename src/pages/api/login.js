import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src','pages','api','data', 'users.json');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Leer los usuarios existentes desde el archivo JSON
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Buscar el usuario en base al correo electrónico
    const user = users.find(user => user.email === email);

    // Verificar si el usuario existe y la contraseña es correcta
    if (user && user.password === password) {
      // Inicio de sesión exitoso
      res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
    } else {
      // Usuario no encontrado o contraseña incorrecta
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
