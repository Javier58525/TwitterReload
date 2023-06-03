import React, { useState } from 'react';
import styles from '@/component/styles/Registro.module.css';

const UserRegister = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Estado para el mensaje
  const [isSuccess, setIsSuccess] = useState(false); // Estado para indicar si el registro fue exitoso

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realiza la petición de registro al backend utilizando fetch
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Verifica si el registro fue exitoso
      if (response.ok) {
        setIsSuccess(true);
        setMessage('Registro exitoso. Ahora puedes iniciar sesión.');
        //onLogin(); // Inicia sesión automáticamente
      } else {
        setIsSuccess(false);
        setMessage('Error en el registro. Inténtalo nuevamente.');
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('Error en el registro. Inténtalo nuevamente.');
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Registrarse</h2>
        <form className={styles.userRegister} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Registrarse</button>
        </form>

        {message && (
          <p className={isSuccess ? styles.successMessage : styles.errorMessage}>{message}</p>
        )}
        <p className={styles.loginLink}>¿Ya tienes una cuenta? <span onClick={onLogin}>Iniciar sesión</span></p>
      </div>
    </div>
  );
};

export default UserRegister;
