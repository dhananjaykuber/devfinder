import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/components/Layout.module.css';
import { useContextState } from '../hooks/useContextState';
import { useEffect } from 'react';

const Navbar = () => {
  const navigate = useNavigate();

  const { user, userData, dispatch } = useContextState();

  const handleLogout = () => {
    localStorage.clear('user');
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  useEffect(() => {}, [user, userData, dispatch]);

  return (
    <nav
      className={styles.navbar}
      style={{ background: window.location.pathname !== '/' && '#fdfdfd' }}
    >
      <h4 onClick={() => navigate('/')}>DevFinder</h4>

      <div>
        {user ? (
          <>
            <button className={styles.logout} onClick={handleLogout}>
              Logout <i className="fa-solid fa-right-from-bracket"></i>
            </button>
            <img
              src={userData ? userData?.image : '/images/user.png'}
              alt="profile_image"
              className={styles.profileImage}
              onClick={() => navigate('/profile')}
            />
          </>
        ) : (
          <>
            <a onClick={() => navigate('/signup')}>
              <button className={styles.signup}>Signup</button>
            </a>
            <a onClick={() => navigate('/login')}>
              <button className={styles.login}>Login</button>
            </a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
