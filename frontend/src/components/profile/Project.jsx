import React from 'react';
import styles from '../../styles/components/profile/Project.module.css';
import { IoIosAddCircle } from 'react-icons/io';
import { useContextState } from '../../hooks/useContextState';
import { useLocation } from 'react-router-dom';

const Project = ({ project }) => {
  const { user, userData, dispatch } = useContextState();

  const location = useLocation();

  const handleDeleteProject = async () => {
    const projcts = userData?.projects?.filter(
      (proj) => proj._id !== project?._id
    );

    const response = await fetch(`/api/profile/${user?.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ ...userData, projects: [...projcts] }),
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_PROJECTS', payload: project._id });
    }

    if (!response.ok) {
      console.log(json.error);
    }
  };

  return (
    <div className={styles.project} onClick={handleDeleteProject}>
      {location?.pathname === '/profile' && (
        <IoIosAddCircle
          size={20}
          color="#5c3ba3"
          className={styles.deleteIcon}
        />
      )}

      <h4>{project?.title}</h4>
      <p>
        {project?.description?.length > 25
          ? `${project?.description.slice(0, 80)}...`
          : project?.description}
      </p>
      <div className={styles.links}>
        {project?.github_link && (
          <a href={project?.github_link} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-github"></i>
          </a>
        )}
        {project?.live_link && (
          <a href={project?.live_link} target="_blank" rel="noreferrer">
            <i className="fa-solid fa-link"></i>
          </a>
        )}
      </div>
      <div className={styles.technologies}>
        {project?.tags.map((tag) => (
          <strong key={tag}>{tag}</strong>
        ))}
      </div>
    </div>
  );
};

export default Project;
