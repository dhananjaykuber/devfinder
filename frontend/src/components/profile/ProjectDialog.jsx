import { useState, useEffect } from 'react';
import formComponentStyle from '../../styles/pages/Forms.module.css';
import { AiFillCloseCircle } from 'react-icons/ai';
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

const ProjectDialog = ({
  technology,
  setTechnology,
  openDropdown,
  setOpenDropdown,
  error,
  setError,
  showError,
  setShowError,
  setOpenDialog,
  openDialog,
}) => {
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    github_link: '',
    live_link: '',
    tags: [],
  });

  const { user, userData, dispatch } = useContextState();

  // dropdown issue handling state
  const [state, setState] = useState(false);

  useEffect(() => {
    setProjectData({
      ...projectData,
      title: '',
      description: '',
      github_link: '',
      live_link: '',
      tags: [],
    });
  }, [openDialog]);

  const handleUploadProjects = async () => {
    setError(null);
    setShowError(false);

    if (
      projectData.title <= 0 ||
      projectData.description <= 0 ||
      projectData.github_link <= 0
    ) {
      setError('Please fill required fieds!');
      setShowError(true);
    } else if (projectData.tags.length <= 0) {
      setError('Select technology tags!');
      setShowError(true);
    } else {
      // dispatch({ type: 'ADD_PROJECTS', payload: projectData });

      // const projects = userData?.projects?.push(projectData);
      // console.log(projects);
      const response = await fetch(`/api/profile/${user?.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          ...userData,
          projects: [...userData.projects, projectData],
        }),
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'ADD_PROJECTS', payload: projectData });

        setProjectData({
          ...projectData,
          title: '',
          description: '',
          github_link: '',
          live_link: '',
          tags: [],
        });

        setOpenDialog(false);
      }

      if (!response.ok) {
        setError(json.error);
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
      )}

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
          <label style={labelStyle}>Title *</label>
          <input
            type="text"
            placeholder="Project title"
            style={{ width: '230px' }}
            value={projectData?.title}
            onChange={(e) =>
              setProjectData({ ...projectData, title: e.target.value })
            }
          />
        </div>
        <div
          className={formComponentStyle.field}
          style={{ marginTop: '18px', position: 'relative' }}
        >
          <label style={labelStyle}>Description *</label>
          <textarea
            type="text"
            placeholder="Project description"
            style={{ width: '230px' }}
            value={projectData?.description}
            onChange={(e) =>
              setProjectData({ ...projectData, description: e.target.value })
            }
          />
        </div>
        <div
          className={formComponentStyle.field}
          style={{ marginTop: '14px', position: 'relative' }}
        >
          <label style={labelStyle}>Github link *</label>
          <input
            type="text"
            placeholder="Github link"
            style={{ width: '230px' }}
            value={projectData?.github_link}
            onChange={(e) =>
              setProjectData({ ...projectData, github_link: e.target.value })
            }
          />
        </div>
        <div
          className={formComponentStyle.field}
          style={{ marginTop: '18px', position: 'relative' }}
        >
          <label style={labelStyle}>Live link *</label>
          <input
            type="text"
            placeholder="Project live link"
            style={{ width: '230px' }}
            value={projectData?.live_link}
            onChange={(e) =>
              setProjectData({ ...projectData, live_link: e.target.value })
            }
          />
        </div>

        <div className={formComponentStyle.field}>
          <div
            className={formComponentStyle.skills}
            style={{ width: '230px', marginTop: '12px' }}
          >
            {projectData?.tags?.length > 0
              ? projectData?.tags?.map((tag) => (
                  <span key={tag} id={tag}>
                    {tag}
                    <i
                      className="fa-solid fa-xmark"
                      onClick={() => {
                        projectData?.tags?.splice(
                          projectData?.tags?.indexOf(tag),
                          1
                        );
                        setState(!state);
                      }}
                    ></i>
                  </span>
                ))
              : (document.getElementsByClassName('skills').textContent =
                  'Ex. C, Java, AWS (Max 3)')}
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
                    if (projectData?.tags?.length < 3) {
                      if (!projectData?.tags?.includes(technology)) {
                        setProjectData({
                          ...projectData,
                          tags: [...projectData?.tags, technology],
                        });
                      }
                    }
                    setTechnology('');
                  }}
                >
                  {technology}
                </span>
              ))}
          </div>
        </div>

        <button style={{ marginTop: '10px' }} onClick={handleUploadProjects}>
          Add Project
        </button>
      </div>
    </div>
  );
};

export default ProjectDialog;
