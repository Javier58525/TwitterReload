import React from 'react';
import styles from '@/component/styles/Home.module.css';

const Login = () => {
  

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className={styles.heading}>Iniciar Sesión</h1>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Usuario</label>
          <input className={styles.input} type="email" placeholder="Usuario" />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Contraseña</label>
          <input className={styles.input} type="password" placeholder="Contraseña" />
        </div>
        <button className={styles.button} onClick={null}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
