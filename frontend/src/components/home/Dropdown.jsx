import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/pages/Home.module.css';

const Dropdown = () => {
  const technologies = [
    'C',
    'CPP',
    'Java',
    'Python',
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Redux',
    'DevOps',
    'Django',
    'Wordpress',
    'Cloud',
    'AWS',
    'Azure',
  ];

  const inputRef = useRef();

  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(false);

  const [technology, setTechnology] = useState('');

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const setEmpty = () => {
    setTechnology('');
  };

  const handleOpenDropdown = () => {
    setEmpty();
    setOpenDropdown(!openDropdown);
    inputRef.current.focus();
  };

  const handleSearchBySkill = () => {
    if (technology.length > 0) {
      navigate(`/users?skill=${technology}`);
    }
  };

  return (
    <div className={styles.dropdownContainer}>
      <h2>
        Search Developers <br /> By <span>Tech-Stack!</span>
      </h2>
      <div className={styles.dropdown}>
        <div className={styles.dropdownWrapper}>
          <div className={styles.dropdownHeading} onClick={handleOpenDropdown}>
            <div>
              <h4>Technology</h4>
              <p>What tech you are looking for?</p>
            </div>
            {openDropdown ? (
              <i
                className="fa-solid fa-angle-up"
                style={{ fontSize: '12px' }}
                onClick={() => setOpenDropdown(!openDropdown)}
              ></i>
            ) : (
              <i
                className="fa-solid fa-chevron-down"
                style={{ fontSize: '12px' }}
                onClick={handleOpenDropdown}
              ></i>
            )}
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
                ref={inputRef}
                placeholder="Type skill to search"
                value={technology}
                onChange={(e) => setTechnology(e.target.value)}
              />
              {technologies
                .filter((tech) =>
                  tech.toLowerCase().includes(technology.toLowerCase())
                )
                .map((tech) => (
                  <span key={tech} onClick={() => setTechnology(tech)}>
                    {tech}
                  </span>
                ))}
              {/* {technologies
                .filter((tech) =>
                  tech.language.toLowerCase().includes(technology.toLowerCase())
                )
                .map((tech) => (
                  <span
                    key={tech.language}
                    onClick={() => setTechnology(tech.language)}
                    className={styles.technologyList}
                  >
                    {tech.language}
                    <tech.icon size={23} style={{ marginLeft: '5px' }} />
                  </span>
                ))} */}
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <button className={styles.search} onClick={handleSearchBySkill}>
          Search
          <i
            className="fa-solid fa-magnifying-glass"
            style={{ marginLeft: '10px', fontSize: '12px' }}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
