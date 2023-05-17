import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import styles from '../styles/pages/Profile.module.css';

const Dialog = ({ openDialog, setOpenDialog, title, children }) => {
  return (
    <div
      className={
        openDialog ? `${styles.dialog} ${styles.opened}` : styles.dialog
      }
    >
      <div className={styles.dialogContent}>
        <div className={styles.dialogHeader}>
          <AiFillCloseCircle
            size={20}
            color={'#333333'}
            onClick={() => setOpenDialog(!openDialog)}
          />
          <h4>{title}</h4>
        </div>

        <div className={styles.contentWrapper}>{children}</div>
      </div>

      <div
        className={styles.dialogMask}
        onClick={() => setOpenDialog(!openDialog)}
      ></div>
    </div>
  );
};

export default Dialog;
