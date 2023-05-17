import { useState, useEffect } from 'react';
import formComponentStyle from '../../styles/pages/Forms.module.css';
import { useContextState } from '../../hooks/useContextState';

const labelStyle = {
  fontSize: '13px',
  fontWeight: '600',
  position: 'absolute',
  top: '-10px',
  left: '8px',
  background: '#fdfdfd',
  padding: '0px 4px',
  color: '#707070',
};

const PersonalInfoDialog = ({ openDialog, setOpenDialog }) => {
  const { user, userData, dispatch } = useContextState();

  const [personalInfo, setPersonalInfo] = useState({
    name: userData?.name,
    domain: userData?.domain,
    bio: userData?.bio,
  });

  useEffect(() => {
    setPersonalInfo({
      ...personalInfo,
      name: userData?.name,
      domain: userData?.domain,
      bio: userData?.bio,
    });
  }, [openDialog]);

  const hanldeUpdatePersonalInfo = async () => {
    const response = await fetch(`/api/profile/${user?.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ ...userData, ...personalInfo }),
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({
        type: 'UPDATE_PERSONAL_INFO',
        payload: personalInfo,
      });
      setOpenDialog(false);
    }
    if (!response.ok) {
      // setError('Could not update skills!');
      // setShowError(true);
      console.log(json.error);
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
      {/* {showError && (
        <div
          className={formComponentStyle.error}
          style={{ width: '230px', marginBottom: '10px' }}
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
      )} */}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          className={formComponentStyle.field}
          style={{ marginTop: '5px', position: 'relative' }}
        >
          <label style={labelStyle}>Name *</label>
          <input
            type="text"
            placeholder="Name *"
            style={{ width: '230px' }}
            value={personalInfo?.name}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, name: e.target.value })
            }
          />
        </div>
        <div
          className={formComponentStyle.field}
          style={{ marginTop: '18px', position: 'relative' }}
        >
          <label style={labelStyle}>Domain *</label>
          <input
            type="text"
            placeholder="Domain *"
            style={{ width: '230px' }}
            value={personalInfo?.domain}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, domain: e.target.value })
            }
          />
        </div>
        <div
          className={formComponentStyle.field}
          style={{ marginTop: '18px', position: 'relative' }}
        >
          <label style={labelStyle}>Bio *</label>
          <textarea
            type="text"
            placeholder="Bio *"
            style={{ width: '230px' }}
            value={personalInfo?.bio}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, bio: e.target.value })
            }
          />
        </div>

        <button
          style={{ marginTop: '10px' }}
          onClick={hanldeUpdatePersonalInfo}
        >
          Update Personal Information
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoDialog;
