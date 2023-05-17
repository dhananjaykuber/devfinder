import React from 'react';
import About from '../components/home/About';
import Dropdown from '../components/home/Dropdown';
import HeroSection from '../components/home/HeroSection';
import styles from '../styles/pages/Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <HeroSection />
      <Dropdown />
      <About />
    </div>
  );
};

export default Home;
