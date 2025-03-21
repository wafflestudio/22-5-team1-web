import { Outlet } from 'react-router';

import { ReSignInModal } from '@/components/modal/ReSignInModal';
import { PATH } from '@/entities/route';
import type { UserRole } from '@/entities/user';
import { useGuardContext } from '@/shared/context/hooks';
import { RoleContext } from '@/shared/context/RoleContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { RouteNavigator } from '@/shared/route/RouteNavigator';

export const ProtectedRoute = ({ role }: { role: UserRole | 'SIGN_IN' }) => {
  const { token } = useGuardContext(TokenContext);
  const { role: currentRole } = useGuardContext(RoleContext);

  if (token === null) {
    return <ReSignInModal />;
  }

  if (role === 'SIGN_IN') {
    return <Outlet />;
  }

  if (currentRole === role) {
    return <Outlet />;
  }

  return <RouteNavigator link={PATH.INDEX} />;
};
