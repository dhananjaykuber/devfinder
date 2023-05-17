import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/pages/Home.module.css';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span>Get Hired With</span>
        <h2>DevFinder</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
          distinctio iusto harum impedit maxime doloribus unde voluptatum ipsum,
          consequuntur est optio et repellendus aut quos.
        </p>

        <div className={styles.buttons}>
          <button className={styles.filled} onClick={() => navigate('/users')}>
            Explore Talent
          </button>
          <button
            className={styles.outlined}
            onClick={() => navigate('/signup')}
          >
            Create account
          </button>
        </div>
      </div>
      <img src="/images/hero_image.svg" alt="hero_image" />
    </div>
  );
};

export default HeroSection;
