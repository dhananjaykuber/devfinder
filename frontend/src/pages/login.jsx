import React, { useState } from 'react';
import styles from '../styles/pages/Forms.module.css';
import { useContextState } from '../hooks/useContextState';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { dispatch } = useContextState();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    setShowError(false);
    setError(null);
    setEmptyFields([]);

    const response = await fetch(`/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userData }),
    });

    const json = await response.json();

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json));
      dispatch({ type: 'LOGIN', payload: json });
      navigate('/profile');
    }
    if (!response.ok) {
      setEmptyFields(json.emptyFields);
      setError(json.error);
      setShowError(true);
    }
  };

  return (
    <div id={styles.formContainer}>
      <div className={styles.heroSection}>
        <h3>Login to your account.</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis,
          modi! Dolorem sequi quia fuga nulla.
        </p>
        <img src="/images/create_profile.svg" alt="create_profile" />
      </div>

      <div className={styles.profileForm}>
        {showError && (
          <div className={styles.error}>
            <p>
              {error}{' '}
              <AiFillCloseCircle
                size={20}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setShowError(false);
                  setEmptyFields([]);
                }}
              />
            </p>
          </div>
        )}
        <div className={styles.form}>
          <div className={styles.field}>
            <p>Email *</p>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className={
                emptyFields?.includes('email') ? styles.emptyFieldError : ''
              }
            />
          </div>

          <div className={styles.field}>
            <p>Password *</p>
            <div
              className={
                emptyFields?.includes('password')
                  ? `${styles.password} ${styles.emptyFieldError}`
                  : styles.password
              }
            >
              <input
                type={showPassword ? `text` : `password`}
                placeholder="Password"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
              {showPassword ? (
                <i
                  className="fa-solid fa-eye-slash"
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-eye"
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              )}
            </div>
          </div>
          <button onClick={handleLogin}>Login</button>
        </div>
        <div className={styles.bottom}>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/signup')}
          >
            Dont't have an account! <a>Click here</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
