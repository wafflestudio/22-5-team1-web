import { useNavigate } from 'react-router';

import { PATH } from '@/entities/route';

export const useRouteNavigation = () => {
  const navigate = useNavigate();
  const { INDEX, ECHO, LOGIN } = PATH;

  return {
    toMain: () => {
      void navigate(INDEX);
    },
    toEcho: () => {
      void navigate(ECHO);
    },
    toLogin: () => {
      void navigate(LOGIN);
    },
  };
};
