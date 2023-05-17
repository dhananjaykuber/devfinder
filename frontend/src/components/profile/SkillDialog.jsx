import React, { useState } from 'react';
import formComponentStyle from '../../styles/pages/Forms.module.css';
import { AiFillCloseCircle } from 'react-icons/ai';

// context
import { useContextState } from '../../hooks/useContextState';

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

const SkillDialog = ({
  technology,
  setTechnology,
  openDropdown,
  setOpenDropdown,
  error,
  setError,
  showError,
  setShowError,
  setOpenDialog,
  skills,
}) => {
  const { user, userData, dispatch } = useContextState();

  // dropdown issue handling state
  const [state, setState] = useState(false);

  const handleUpdateSkills = async () => {
    setError(null);
    setShowError(false);
    if (skills.length < 5) {
      setError('Select at least 5 skills!');
      setShowError(true);
    } else if (skills.length > 9) {
      setError('You can only select at max 10 skills!');
      setShowError(true);
    } else {
      const response = await fetch(`/api/profile/${user?.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ ...userData }),
      });

      if (response.ok) {
        dispatch({ type: 'UPDATE_SKILLS', payload: skills });
        setOpenDialog(false);
      }
      if (!response.ok) {
        setError('Could not update skills!');
        setShowError(true);
      }
    }
  };

  return (
    <div
      className={formComponentStyle.form}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      {showError && (
        <div
          className={formComponentStyle.error}
          style={{ width: '250px', marginBottom: '10px' }}
        >
          <p>
            {error}
            <AiFillCloseCircle
              size={20}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setShowError(false);
              }}
            />
          </p>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div className={formComponentStyle.field}>
          <div
            className={formComponentStyle.skills}
            style={{ width: '250px', marginTop: '10px' }}
          >
            {skills?.length > 0
              ? skills?.map((tag) => (
                  <span key={tag} id={tag}>
                    {tag}
                    <i
                      className="fa-solid fa-xmark"
                      onClick={() => {
                        skills?.splice(skills?.indexOf(tag), 1);
                        setState(!state);
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
              ? `${formComponentStyle.dropdownScrollView} ${formComponentStyle.show}`
              : `${formComponentStyle.dropdownScrollView}`
          }
          style={{ width: '90%', maxHeight: '50px', marginLeft: '-16px' }}
        >
          <div className={formComponentStyle.dropdownContent}>
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
                    if (skills?.length < 10) {
                      if (!skills?.includes(technology)) {
                        skills.push(technology);
                      }
                      setState(!state);
                    }
                    setTechnology('');
                  }}
                >
                  {technology}
                </span>
              ))}
          </div>
        </div>

        <button style={{ marginTop: '10px' }} onClick={handleUpdateSkills}>
          Update Skills
        </button>
      </div>
    </div>
  );
};

export default SkillDialog;
