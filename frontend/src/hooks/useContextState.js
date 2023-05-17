import { useContext } from 'react';
import { Context } from '../context/context';

export const useContextState = () => {
  const context = useContext(Context);

  return context;
};
