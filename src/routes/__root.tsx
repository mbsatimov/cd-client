import type { QueryClient } from '@tanstack/react-query';

import { useQuery } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

import { Spinner, Toaster } from '@/components/ui';
import { NotFoundError } from '@/routes/(errors)/404.lazy';
import { GeneralError } from '@/routes/(errors)/500.lazy';
import { getMe } from '@/utils/api/requests';
import { useAuth } from '@/utils/stores';

interface RouterContext {
  queryClient: QueryClient;
}

const RootLayout = () => {
  const { setUser } = useAuth();
  const getMeQuery = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await getMe();
      if (res.data) setUser(res.data);
      return res;
    }
  });

  if (getMeQuery.isLoading)
    return (
      <div className='grid h-svh place-items-center'>
        <Spinner className='size-10' />
      </div>
    );

  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  pendingComponent: () => (
    <div className='grid h-svh place-items-center'>
      <Spinner className='size-10' />
    </div>
  ),
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
