import React from 'react';
import styles from '../../src/styles/components/User.module.css';
import { useNavigate } from 'react-router-dom';
import { DiCode } from 'react-icons/di';

const User = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.user}
      key={user?._id}
      onClick={() => navigate(`/users/${user?._id}`)}
    >
      <img src={user?.image} alt={`profile_${user?.name}`} />
      <div className={styles.information}>
        <div className={styles.profileHeader}>
          <h3>{user?.name}</h3>
        </div>
        <h4>{user?.domain}</h4>
        <p>
          {user?.bio?.length > 10
            ? user?.bio?.slice(0, 110) + ' ...'
            : user?.bio}
        </p>
        <div className={styles.skills}>
          {user?.skills?.map((skill) => (
            <span key={skill}>
              {skill}
              <DiCode size={18} color="#2d204a" style={{ marginLeft: '2px' }} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
