import type { QueryClient } from '@tanstack/react-query';

import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

import { Spinner, Toaster } from '@/components/ui';
import { NotFoundError } from '@/routes/(errors)/404.lazy';
import { GeneralError } from '@/routes/(errors)/500.lazy';
import { getMe } from '@/utils/api/requests';
import { useAuthStore } from '@/utils/stores';

interface RouterContext {
  queryClient: QueryClient;
}

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  loader: ({ context: { queryClient } }) => {
    if (!useAuthStore.getState().auth.accessToken) return;
    queryClient
      .fetchQuery({
        queryKey: ['me'],
        queryFn: () => getMe()
      })
      .then((res) => {
        useAuthStore.getState().auth.setUser(res.data);
      });
  },
  pendingComponent: () => (
    <div className='grid h-svh place-items-center'>
      <Spinner className='size-10' />
    </div>
  ),
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
