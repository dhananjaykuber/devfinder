import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/pages/Home.module.css';

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.about}>
        <img src="/images/about_image.svg" alt="about_image" />
        <div className={styles.aboutContent}>
          <h3>What is DevFinder?</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
            consequatur obcaecati saepe doloribus! Ipsam a voluptatibus
            asperiores expedita dignissimos officia quas minima iusto sequi?
            Corrupti quis eius laborum ex fugiat? Sed officia libero suscipit,
            cum beatae numquam tempora repudiandae aperiam odit, saepe tenetur
            corrupti minus quia voluptatibus iste culpa. Culpa.
          </p>
          <button
            className={styles.outlined}
            onClick={() => navigate('/signup')}
          >
            Create Account
          </button>
        </div>
      </div>
    </>
  );
};

export default About;
