// @ /users/47854125

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Project from '../components/profile/Project';
import styles from '../styles/pages/Profile.module.css';

const Profile = () => {
  const { id } = useParams();

  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/profile/${id}`);

      const json = await response.json();

      if (response.ok) {
        setUser(json);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {user && (
        <div className={styles.container}>
          <div className={styles.profile}>
            <div className={styles.personalInformation}>
              <img src={user?.image} alt={`${user?.name}_profile`} />

              <div className={styles.informationContainer}>
                <div className={styles.information}>
                  <h1>{user.name}</h1>

                  <p>{user.bio}</p>

                  <div className={styles.socials}>
                    {user?.linkedin && (
                      <a href={user.linkedin} target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-linkedin"></i>
                      </a>
                    )}

                    {user?.github && (
                      <a href={user.github} target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-github"></i>
                      </a>
                    )}

                    {user?.twitter && (
                      <a href={user.twitter} target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-twitter"></i>
                      </a>
                    )}

                    {user?.portfolio && (
                      <a href={user.portfolio} target="_blank" rel="noreferrer">
                        <i className="fa-solid fa-link"></i>
                      </a>
                    )}
                  </div>
                  <button>
                    <a href={`mailto:${user.email}`}>
                      Email &nbsp;
                      <i className="fa-solid fa-envelope"></i>
                    </a>
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.header}>
              <div></div>
              <h6>My Skills and Projects</h6>
              <div></div>
            </div>
            <div className={styles.skillProject}>
              <h2>Skills</h2>
              <div className={styles.skills}>
                {user.skills.map((skill) => (
                  <strong key={skill}>{skill}</strong>
                ))}
              </div>
              <h2>Projects</h2>
              <div className={styles.projects}>
                {user.projects.map((project) => (
                  <Project key={project._id} project={project} />
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
              <i class="fa-solid fa-building"></i>
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
        </div>
      )}
    </>
  );
};

export default Profile;

/*
const data = {
    image: '/images/profile1.png',
    name: 'Viktor Fedorov',
    bio: "I'm a web developer. I spend my whole day, practically every day, experimenting with HTML, CSS, and JavaScript",
    branch: 'Computer Science & Technology',
    email: 'viktorfedorov@gmail.com',
    socials: {
      linkedin: 'https://www.linkedin.com/in/dhananjay-kuber-778a2b200/',
      github: 'https://www.github.com/dhananjaykuber',
      twitter: 'https://twitter.com/dhananjaykuber_',
      portfolio: 'https://dhananjaykuber.netlify.app/',
    },
    skills: [
      {
        skill_id: '1',
        skill_title: 'HTML',
      },
      {
        skill_id: '2',
        skill_title: 'CSS',
      },
      {
        skill_id: '3',
        skill_title: 'JavaScript',
      },
      {
        skill_id: '4',
        skill_title: 'ReactJS',
      },
      {
        skill_id: '5',
        skill_title: 'MaterialUI',
      },
    ],
    projects: [
      {
        title: 'Wordle Clone',
        githubRepo: 'https://github.com/dhananjaykuber/wordle-clone',
        deployedLink: 'https://wordle-clone-app.vercel.app/',
        description:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo consequuntur molestiae molestias aperiam enim? Laboriosam blanditiis eaque temporibus, saepe libero itaque perspiciatis! Recusandae repellendus reiciendis deleniti labore officiis repellat tempora!',
        technologies: ['Javascript', 'HTML', 'Django'],
      },
      {
        title: 'ChatBae',
        githubRepo: 'https://github.com/dhananjaykuber/ChatBae',
        deployedLink: '',
        description:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo consequuntur molestiae molestias aperiam enim? Laboriosam blanditiis eaque temporibus, saepe libero itaque perspiciatis! Recusandae repellendus reiciendis deleniti labore officiis repellat tempora!',
        technologies: ['React Native', 'Firebase', 'Javascript'],
      },
    ],
    companyName: 'Google',
    position: 'Junior Cloud Engineer',
    city: 'Pune',
    experience: '3 years',
  };
*/
