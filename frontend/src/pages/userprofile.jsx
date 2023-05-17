// @ /profile

import React, { useState, useEffect } from 'react';
import Project from '../components/profile/Project';
import styles from '../styles/pages/Profile.module.css';
import { useContextState } from '../hooks/useContextState';
import Dialog from '../components/Dialog';
import ProjectDialog from '../components/profile/ProjectDialog';
import SkillDialog from '../components/profile/SkillDialog';
import PersonalInfoDialog from '../components/profile/PersonalInfoDialog';

const UserProfile = () => {
  const { user, userData, dispatch } = useContextState();

  // const [data, setData] = useState();

  // Skill dialog
  const [openInfoDialog, setOpenInfoDialog] = useState(false);

  // Skill dialog
  const [openSkillDialog, setOpenSkillDialog] = useState(false);
  const [skillTechnology, setSkillTechnology] = useState('');
  const [openSkillDropdown, setOpenSkillDropdown] = useState(false);
  const [skillError, setSkillError] = useState(null);
  const [showSkillError, setShowSkillError] = useState(false);

  // Project dialog
  const [openProjectDialog, setOpenProjectDialog] = useState(false);
  const [projectTechnology, setProjectTechnology] = useState('');
  const [openProjectDropdown, setOpenProjectDropdown] = useState(false);
  const [projectError, setProjectError] = useState(null);
  const [showProjectError, setProjectShowError] = useState(false);

  useEffect(() => {
    const getUserProfile = async () => {
      const response = await fetch(`/api/profile/${user?.id}`);

      const json = await response.json();

      if (response.ok) {
        // setData(json);
        dispatch({ type: 'SET_USER', payload: json });
      }
    };

    if (user) {
      getUserProfile();
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div
          className={styles.personalInformationEdit}
          onClick={() => setOpenInfoDialog(!openInfoDialog)}
        >
          <i className="fa-solid fa-pencil"></i>
        </div>

        <div className={styles.personalInformation}>
          <img src={userData?.image} alt={`${userData?.name}_profile`} />
          <div className={styles.informationContainer}>
            <div className={styles.information}>
              <h1>{userData?.name}</h1>
              <h4>{userData?.domain}</h4>
              <p>{userData?.bio}</p>

              <div className={styles.socials}>
                {userData?.linkedin && (
                  <a href={userData?.linkedin} target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                )}

                {userData?.github && (
                  <a href={userData?.github} target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-github"></i>
                  </a>
                )}

                {userData?.twitter && (
                  <a href={userData?.twitter} target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                )}

                {userData?.portfolio && (
                  <a
                    href={userData?.portfolio}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-solid fa-link"></i>
                  </a>
                )}
              </div>
              <button>
                <a href={`mailto:${userData?.email}`}>
                  Email &nbsp;
                  <i className="fa-solid fa-envelope"></i>
                </a>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.header}>
          <div></div>
          <h6>Skills and Projects</h6>
          <div></div>
        </div>
        <div className={styles.skillProject}>
          <div
            className={styles.skillEdit}
            onClick={() => setOpenSkillDialog(!openSkillDialog)}
          >
            <i className="fa-solid fa-pencil"></i>
          </div>
          <h2>My Skills</h2>
          <div className={styles.skills}>
            {userData?.skills?.map((skill) => (
              <strong key={skill + Date.now()}>{skill}</strong>
            ))}
          </div>

          <div className={styles.primeProjects}>
            <h2>Prime Projects</h2>
            <div
              className={styles.projectEdit}
              onClick={() => setOpenProjectDialog(!openProjectDialog)}
            >
              <i className="fa-solid fa-plus"></i>
            </div>
          </div>

          <div className={styles.projects}>
            {userData?.projects?.map((project) => (
              <Project key={project?._id} project={project} />
            ))}
          </div>
        </div>

        {/* {!data.student && (
          <>
            <div className={styles.header}>
              <div></div>
              <h6>Industrial Experience</h6>
              <div></div>
            </div>
            <div className={styles.workExperience}>
              <i className="fa-solid fa-building"></i>
              <div className={styles.workInformation}>
                <h3>{data.position}</h3>
                <h4>
                  <strong>at</strong> {data.companyName}
                </h4>
                <h5>{data.city}</h5>
                <h6>{data.experience} of experience</h6>
              </div>
            </div>
          </>
        )} */}
      </div>

      {/* Personal Information Dialog */}
      <Dialog
        openDialog={openInfoDialog}
        setOpenDialog={setOpenInfoDialog}
        title="Update Personal Information"
        children={
          <PersonalInfoDialog
            openDialog={openInfoDialog}
            setOpenDialog={setOpenInfoDialog}
          />
        }
      />

      {/* Skill Dialog */}
      <Dialog
        openDialog={openSkillDialog}
        setOpenDialog={setOpenSkillDialog}
        title="Update Skills"
        children={
          <SkillDialog
            technology={skillTechnology}
            setTechnology={setSkillTechnology}
            openDropdown={openSkillDropdown}
            setOpenDropdown={setOpenSkillDropdown}
            error={skillError}
            setError={setSkillError}
            showError={showSkillError}
            setShowError={setShowSkillError}
            setOpenDialog={setOpenSkillDialog}
            skills={userData?.skills}
          />
        }
      />

      {/* Project Dialog */}
      <Dialog
        openDialog={openProjectDialog}
        setOpenDialog={setOpenProjectDialog}
        title="Add Project"
        children={
          <ProjectDialog
            technology={projectTechnology}
            setTechnology={setProjectTechnology}
            openDropdown={openProjectDropdown}
            setOpenDropdown={setOpenProjectDropdown}
            error={projectError}
            setError={setProjectError}
            showError={showProjectError}
            setShowError={setProjectShowError}
            setOpenDialog={setOpenProjectDialog}
            openDialog={openProjectDialog}
          />
        }
      />
    </div>
  );
};

export default UserProfile;
