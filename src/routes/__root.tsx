import { useQuery } from '@tanstack/react-query';
import { createRootRoute, Outlet } from '@tanstack/react-router';

import { Spinner, Toaster } from '@/components/ui';
import { NotFoundError } from '@/routes/(errors)/404.lazy';
import { GeneralError } from '@/routes/(errors)/500.lazy';
import { getMe } from '@/utils/api/requests';
import { useAuth } from '@/utils/stores';

const RootLayout = () => {
  const { setUser, accessToken } = useAuth();

  const getMeQuery = useQuery({
    queryKey: ['me'],
    enabled: !!accessToken,
    queryFn: async () => {
      const res = await getMe();
      if (res.data) setUser(res.data);
      return res;
    }
  });

  if (getMeQuery.isLoading) {
    return (
      <div className='grid h-svh place-items-center'>
        <Spinner className='size-10' />
      </div>
    );
  }

  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
