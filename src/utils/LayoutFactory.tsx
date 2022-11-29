import { useRouter } from 'next/router';

import AppShell from '@/components/layouts/AppShell';
import useAuthStore from '@/store/useAuthStore';
import { LOGIN_ROUTE } from '@/utils/hooks/withAuth';

export const LayoutFactory = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore.useIsAuthenticated();

  const router = useRouter();

  const isPathProtected = router.pathname !== LOGIN_ROUTE;

  switch (isAuthenticated && isPathProtected) {
    case true:
      return <AppShell>{children}</AppShell>;
    default:
      return <>{children}</>;
  }
};
