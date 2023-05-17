import React from 'react';
import styles from '../../styles/pages/Home.module.css';

const Card = ({ technology }) => {
  return (
    <div className={styles.card}>
      <img src={technology.link} alt={`technology-${technology.name}`} />
      <h4>{technology.name}</h4>
    </div>
  );
};

export default Card;
