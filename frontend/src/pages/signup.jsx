import React, { useState } from 'react';
import styles from '../styles/pages/Forms.module.css';
import { useNavigate } from 'react-router-dom';
import { useContextState } from '../hooks/useContextState';
import { AiFillCloseCircle } from 'react-icons/ai';

const Signup = () => {
  const technologies = [
    'C',
    'CPP',
    'Java',
    'Python',
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'React',
    'NextJS',
    'ReactNative',
    'Firebase',
    'Redux',
    'DevOps',
    'Django',
    'Wordpress',
    'Cloud',
    'AWS',
    'Azure',
  ];

  const { dispatch } = useContextState();

  const navigate = useNavigate();

  const [activeWizard, setActiveWizard] = useState('1');

  const [openDropdown, setOpenDropdown] = useState(false);
  const [technology, setTechnology] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);

  const [userData, setUserData] = useState({
    image: '/images/user.png',
    name: '',
    gender: '',
    accountType: 'Developer',
    email: '',
    contactNumber: '',
    bio: '',
    domain: '',
    skills: [],
    linkedin: '',
    github: '',
    twitter: '',
    portfolio: '',
    password: '',
    projects: [],
  });

  const handleChangeWizard = (wizardNumber) => {
    setError(null);
    setShowError(false);
    setActiveWizard(wizardNumber);
  };

  const handleFirstWizard = () => {
    setError(null);
    setShowError(false);

    if (
      userData.name.length <= 0 ||
      userData.gender.length <= 0 ||
      userData.email.length <= 0 ||
      userData.contactNumber.length <= 0
    ) {
      setError('All fields are required!');
      setShowError(true);
    } else {
      handleChangeWizard('2');
      setError(null);
      setShowError(false);
    }
  };

  const handleSecondWizard = () => {
    setError(null);
    setShowError(false);

    if (userData.bio.length <= 0 || userData.skills.length <= 0) {
      setError('All fields are required!');
      setShowError(true);
    } else if (userData.skills.length < 3) {
      setError('Select at least 3 skills!');
      setShowError(true);
    } else {
      handleChangeWizard('3');
    }
  };

  const handleSignup = async () => {
    setError(null);
    setShowError(false);

    if (
      userData.linkedin.length <= 0 ||
      userData.github.length <= 0 ||
      userData.password.length <= 0
    ) {
      setError('Please fill required fields!');
      setShowError(true);
    } else {
      const response = await fetch(`/api/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...userData }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setShowError(true);
      }
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(json));
        dispatch({ type: 'LOGIN', payload: json });
        navigate('/profile');
      }
    }
  };

  return (
    <div id={styles.formContainer}>
      <div className={styles.heroSection}>
        <h3>Create your account.</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis,
          modi! Dolorem sequi quia fuga nulla.
        </p>
        <img src="/images/create_profile.svg" alt="create_profile" />
      </div>

      <div className={styles.profileForm}>
        <div className={styles.wizard}>
          <div
            className={
              activeWizard === '1'
                ? `${styles.wizardItem} ${styles.activeWizard}`
                : `${styles.wizardItem}`
            }
            onClick={() => handleChangeWizard('1')}
          >
            <i
              className={`fa-solid fa-user ${
                activeWizard === '1' && styles.activeWizardItem
              }`}
            ></i>
          </div>
          <div className={styles.line}></div>
          <div
            className={
              activeWizard === '2'
                ? `${styles.wizardItem} ${styles.activeWizard}`
                : `${styles.wizardItem}`
            }
            onClick={() => handleChangeWizard('2')}
          >
            <i
              className={`fa-solid fa-wrench ${
                activeWizard === '2' && styles.activeWizardItem
              }`}
            ></i>
          </div>
          <div className={styles.line}></div>
          <div
            className={
              activeWizard === '3'
                ? `${styles.wizardItem} ${styles.activeWizard}`
                : `${styles.wizardItem}`
            }
            onClick={() => handleChangeWizard('3')}
          >
            <i
              className={`fa-solid fa-share-nodes ${
                activeWizard === '3' && styles.activeWizardItem
              }`}
            ></i>
          </div>
        </div>

        <div className={styles.form}>
          {/* Section 1 */}

          {showError && (
            <div className={styles.error}>
              <p>
                {error}
                <AiFillCloseCircle
                  size={20}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setShowError(false);
                    setEmptyFields([]);
                  }}
                />
              </p>
            </div>
          )}

          <div
            className={styles.profilePicker}
            style={
              activeWizard === '1' ? { display: 'flex' } : { display: 'none' }
            }
          >
            <img src="/images/profile_picker.svg" alt="profile_picker" />

            <input
              type="file"
              name="image-picker"
              id="picker"
              accept="image/*"
            />
            <label htmlFor="picker">Upload Profile Picture</label>
          </div>

          <div
            className={styles.section}
            style={
              activeWizard === '1' ? { display: 'block' } : { display: 'none' }
            }
          >
            <div className={styles.divider}>
              <div></div>
              <h4>Personal Details</h4>
              <div></div>
            </div>

            <div className={styles.field}>
              <p>Name *</p>
              <input
                type="text"
                placeholder="Name"
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            </div>

            <div className={styles.row1}>
              <div className={styles.field}>
                <p>Gender *</p>
                <span>
                  Male
                  <input
                    type="radio"
                    value="Male"
                    name="gender"
                    onChange={(e) =>
                      setUserData({ ...userData, gender: e.target.value })
                    }
                  />
                </span>
                <span>
                  Female
                  <input
                    type="radio"
                    value="Female"
                    name="gender"
                    onChange={(e) =>
                      setUserData({ ...userData, gender: e.target.value })
                    }
                  />
                </span>
              </div>

              <div className={styles.field}>
                <p>Select account type *</p>
                <select
                  onChange={(e) =>
                    setUserData({ ...userData, accountType: e.target.value })
                  }
                >
                  <option value="Developer">Developer</option>
                  <option value="Recruiter">Recruiter</option>
                </select>
              </div>
            </div>

            <div className={styles.field}>
              <p>Personal email *</p>
              <input
                type="email"
                placeholder="Personal email"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>

            <div className={styles.field}>
              <p>Contact number *</p>
              <input
                type="text"
                placeholder="Contact number"
                onChange={(e) =>
                  setUserData({ ...userData, contactNumber: e.target.value })
                }
              />
            </div>
            <button onClick={handleFirstWizard}>Next</button>
          </div>

          {/* Section 2 */}
          <div
            className={styles.section}
            style={
              activeWizard === '2' ? { display: 'block' } : { display: 'none' }
            }
          >
            <div className={styles.divider}>
              <div></div>
              <h4>Skills and Experience</h4>
              <div></div>
            </div>
            <div className={styles.field}>
              <p>Write something about you</p>
              <textarea
                type="text"
                rows={4}
                placeholder="About yourself"
                onChange={(e) =>
                  setUserData({ ...userData, bio: e.target.value })
                }
              />
            </div>

            <div className={styles.field}>
              <p>Doamin *</p>
              <input
                type="text"
                placeholder="Domain"
                onChange={(e) =>
                  setUserData({ ...userData, domain: e.target.value })
                }
              />
            </div>

            <div className={styles.field}>
              <p>Select Skills *</p>
              <div className={styles.skills}>
                {userData.skills.length > 0
                  ? userData.skills.map((skill) => (
                      <span key={skill} id={skill}>
                        {skill}
                        <i
                          className="fa-solid fa-xmark"
                          onClick={() => {
                            userData.skills.splice(
                              userData.skills.indexOf(skill),
                              1
                            );
                            document.getElementById(skill).remove();
                            // console.log(userData.skills);
                          }}
                        ></i>
                      </span>
                    ))
                  : (document.getElementsByClassName('skills').textContent =
                      'Ex. C, Java, AWS (Max 10)')}
                <i
                  className="fa-solid fa-chevron-down"
                  onClick={() => setOpenDropdown(!openDropdown)}
                  style={{
                    position: 'absolute',
                    right: 6,
                    cursor: 'pointer',
                  }}
                ></i>
              </div>
            </div>

            <div
              className={
                openDropdown
                  ? `${styles.dropdownScrollView} ${styles.show}`
                  : `${styles.dropdownScrollView}`
              }
            >
              <div className={styles.dropdownContent}>
                <input
                  type="text"
                  placeholder="Type to search"
                  value={technology}
                  onChange={(e) => setTechnology(e.target.value)}
                />
                {technologies
                  .filter((tech) =>
                    tech.toLowerCase().includes(technology?.toLowerCase())
                  )
                  .map((technology) => (
                    <span
                      key={technology}
                      onClick={() => {
                        if (!userData.skills.includes(technology)) {
                          setUserData({
                            ...userData,
                            skills: [...userData.skills, technology],
                          });
                        }
                        setTechnology('');
                      }}
                    >
                      {technology}
                    </span>
                  ))}
              </div>
            </div>
            <button
              onClick={() => {
                setError(null);
                setShowError(false);
                setActiveWizard('1');
              }}
            >
              Back
            </button>
            <button style={{ marginTop: '15px' }} onClick={handleSecondWizard}>
              Next
            </button>
          </div>

          {/* Section 3 */}
          <div
            className={styles.section}
            style={
              activeWizard === '3' ? { display: 'block' } : { display: 'none' }
            }
          >
            <div className={styles.divider}>
              <div></div>
              <h4>Social Links</h4>
              <div></div>
            </div>

            <div className={styles.socialLinks}>
              <div className={styles.linkRow1}>
                <div className={styles.link}>
                  <div className={styles.linkHeader}>
                    <i className="fa-brands fa-linkedin"></i>
                    <p>LinkedIn *</p>
                  </div>
                  <input
                    type="text"
                    placeholder="LinkedIn"
                    onChange={(e) =>
                      setUserData({ ...userData, linkedin: e.target.value })
                    }
                  />
                </div>
                <div className={styles.link}>
                  <div className={styles.linkHeader}>
                    <i className="fa-brands fa-github"></i>
                    <p>Github *</p>
                  </div>
                  <input
                    type="text"
                    placeholder="Github"
                    onChange={(e) =>
                      setUserData({ ...userData, github: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className={styles.linkRow2}>
                <div className={styles.link}>
                  <div className={styles.linkHeader}>
                    <i className="fa-brands fa-twitter"></i>
                    <p>Twitter</p>
                  </div>
                  <input
                    type="text"
                    placeholder="Twitter"
                    onChange={(e) =>
                      setUserData({ ...userData, twitter: e.target.value })
                    }
                  />
                </div>
                <div className={styles.link}>
                  <div className={styles.linkHeader}>
                    <i className="fa-solid fa-link"></i>
                    <p>Portfolio</p>
                  </div>
                  <input
                    type="text"
                    placeholder="Portfolio"
                    onChange={(e) =>
                      setUserData({ ...userData, portfolio: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className={styles.field}>
                <p>Password *</p>
                <div className={styles.password}>
                  <input
                    type={showPassword ? `text` : `password`}
                    placeholder="Password"
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                  />
                  {showPassword ? (
                    <i
                      className="fa-solid fa-eye-slash"
                      onClick={() => setShowPassword(!showPassword)}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-eye"
                      onClick={() => setShowPassword(!showPassword)}
                    ></i>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  setError(null);
                  setShowError(false);
                  setActiveWizard('2');
                }}
              >
                Back
              </button>
              <button style={{ marginTop: '15px' }} onClick={handleSignup}>
                Signup
              </button>
            </div>
          </div>
        </div>
        <div
          className={styles.bottom}
          style={
            activeWizard === '1' ? { display: 'flex' } : { display: 'none' }
          }
        >
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/login')}
          >
            Already have an account! <a>Click here</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
