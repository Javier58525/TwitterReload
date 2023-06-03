import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import styles from '@/component/styles/Login.module.css';
import { AuthContext } from './authcontext';

const UserLogin = () => {
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(email); // Establecer el usuario autenticado por correo electrónico
        console.log(data.message);
        router.push('/tweets'); // Redirigir a la página de los tweets
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Error en el servidor');
      console.log(error);
    }
  };

  const handleRegister = () => {
    router.push('/registro');
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Iniciar sesión</h2>
        <form className={styles.userLogin} onSubmit={handleLogin}>
          <input
            type="email"
            className={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className={styles.input}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={styles.button}>Iniciar sesión</button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
        <p className={styles.registerLink}>
          No tienes una cuenta? 
          <span onClick={handleRegister}>Registrarse</span>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
