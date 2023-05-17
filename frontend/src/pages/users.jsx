import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from '../../src/styles/pages/Users.module.css';
import dropdownStyle from '../styles/pages/Home.module.css';
import User from '../components/User';
import { useNavigate } from 'react-router-dom';

const technologies = [
  'All',
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

const Users = () => {
  const navigate = useNavigate();

  const [searchParam, setSearchParam] = useSearchParams();

  const [openDropdown, setOpenDropdown] = useState(false);

  const [technology, setTechnology] = useState('');

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const skill = searchParam.get('skill');

    const fetchData = async () => {
      let response;

      if (skill === 'All') {
        response = await fetch(`/api/profile`);
      } else if (skill) {
        response = await fetch(`/api/profile?skill=${skill}`);
      } else {
        response = await fetch(`/api/profile`);
      }

      const json = await response.json();

      if (response.ok) {
        setUsers(json);
      }
    };

    fetchData();
  }, [searchParam.get('skill')]);

  const setEmpty = () => {
    setTechnology('');
  };

  const handleOpenDropdown = () => {
    setEmpty();
    setOpenDropdown(!openDropdown);
  };

  const handleSearchBySkill = () => {
    if (technology.length > 0) {
      navigate(`/users?skill=${technology}`);
    }
    setOpenDropdown(!openDropdown);
  };

  return (
    <div className={styles.users}>
      <div
        className={dropdownStyle.dropdownContainer}
        style={{ marginBottom: openDropdown ? '200px' : '30px' }}
      >
        <div className={dropdownStyle.dropdown}>
          <div className={dropdownStyle.dropdownWrapper}>
            <div
              className={dropdownStyle.dropdownHeading}
              onClick={handleOpenDropdown}
              style={{ marginRight: '20px' }}
            >
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
                  ? `${dropdownStyle.dropdownScrollView} ${dropdownStyle.show}`
                  : `${dropdownStyle.dropdownScrollView}`
              }
              style={{ marginTop: '0px' }}
            >
              <div className={dropdownStyle.dropdownContent}>
                <input
                  type="text"
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
                    className={dropdownStyle.technologyList}
                  >
                    {tech.language}
                    <tech.icon size={23} style={{ marginLeft: '5px' }} />
                  </span>
                ))} */}
              </div>
            </div>
          </div>

          {/* <div className={dropdownStyle.divider}></div> */}

          <button
            className={dropdownStyle.search}
            onClick={handleSearchBySkill}
          >
            Search
            <i
              className="fa-solid fa-magnifying-glass"
              style={{ marginLeft: '10px', fontSize: '12px' }}
            ></i>
          </button>
        </div>
      </div>

      {users ? (
        users?.map((user) => <User key={user?._id} user={user} />)
      ) : (
        <h2>So developers available for this skill!</h2>
      )}
    </div>
  );
};

export default Users;
