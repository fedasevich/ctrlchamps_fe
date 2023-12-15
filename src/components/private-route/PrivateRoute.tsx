import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { UserRole } from 'src/redux/slices/userSlice';
import { useTypedSelector } from 'src/redux/store';
import { ROUTES } from 'src/routes';
import { DEFAULT_REDIRECT_PATH, REDIRECT_PATHS } from './constants';

interface PrivateRouteProps {
  children?: React.ReactNode;
  allowedRole?: UserRole;
  isIndex?: boolean;
}

export function PrivateRoute({
  children,
  allowedRole,
  isIndex,
}: PrivateRouteProps): JSX.Element | null {
  const router = useRouter();
  const pathname = usePathname();

  const [isAllowedToEnter, setIsAllowedToEnter] = useState(false);

  const user = useTypedSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      router.replace(DEFAULT_REDIRECT_PATH);
      return;
    }

    if (!user.isVerified && pathname !== `${ROUTES.account_verification}/`) {
      router.replace(ROUTES.account_verification);
      return;
    }

    if ((allowedRole && user.role !== allowedRole) || isIndex) {
      router.replace(REDIRECT_PATHS[user.role]);
      return;
    }

    setIsAllowedToEnter(true);
  }, [user, allowedRole, router, isIndex, pathname]);

  return <>{isAllowedToEnter && user && children}</>;
}
