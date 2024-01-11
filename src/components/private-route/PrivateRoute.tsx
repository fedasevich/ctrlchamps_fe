import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { DEFAULT_REDIRECT_PATH, USER_ROLE } from 'src/constants';
import { UserRole } from 'src/redux/slices/userSlice';
import { useTypedSelector } from 'src/redux/store';
import { ROUTES } from 'src/routes';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function PrivateRoute({ children, allowedRoles }: PrivateRouteProps): JSX.Element | null {
  const router = useRouter();
  const pathname = usePathname();

  const [isAllowedToEnter, setIsAllowedToEnter] = useState<boolean>(false);

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

    if (
      !user.isProfileFilled &&
      pathname !== `${ROUTES.profile}/` &&
      pathname !== `${ROUTES.account_verification}/` &&
      user.role === USER_ROLE.Caregiver
    ) {
      router.replace(ROUTES.profile);

      return;
    }

    if (
      (user.role === USER_ROLE.Admin || user.role === USER_ROLE.SuperAdmin) &&
      !pathname?.includes(ROUTES.adminPanel)
    ) {
      router.replace(ROUTES.users);

      return;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      router.replace(ROUTES.home);

      return;
    }

    setIsAllowedToEnter(true);
  }, [user, allowedRoles, router, pathname]);

  return <>{isAllowedToEnter && user && children}</>;
}
