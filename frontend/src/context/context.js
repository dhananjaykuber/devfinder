import { useEffect } from 'react';
import { createContext, useReducer } from 'react';

export const Context = createContext();

const contextReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    case 'SET_USER':
      return {
        ...state,
        userData: action.payload,
      };
    case 'UPDATE_SKILLS':
      return {
        ...state,
        userData: { ...state.userData, skills: action.payload },
      };

    case 'ADD_PROJECTS':
      return {
        ...state,
        userData: {
          ...state.userData,
          projects: [...state.userData.projects, action.payload],
        },
      };

    case 'DELETE_PROJECTS':
      return {
        ...state,
        userData: {
          ...state.userData,
          projects: state.userData.projects.filter(
            (project) => project._id !== action.payload
          ),
        },
      };

    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contextReducer, {
    user: null,
    userData: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    dispatch({ type: 'LOGIN', payload: user });

    const fetchUser = async () => {
      const response = await fetch(`/api/profile/${user?.id}`);

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_USER', payload: json });
      }
    };

    if (user) {
      fetchUser();
    }
  }, []);

  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Context.Provider>
  );
};
