import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from '../styles/components/Layout.module.css';

const Layout = ({ children, title }) => {
  return (
    <div>
      <Navbar />
      <div className={styles.children}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
