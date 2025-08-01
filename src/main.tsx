import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { toast } from 'sonner';

import { postRefresh } from '@/utils/api/requests';
import { ThemeProvider } from '@/utils/context';
import { useAuthStore } from '@/utils/stores';

import { routeTree } from './routeTree.gen';

import './index.css';

const mutationCache = new MutationCache({
  onSuccess: () => {
    queryClient.invalidateQueries();
  },
  onError: (error: any) => {
    toast.error(error.response.data.message || 'Something went wrong');
  }
});

const queryCache = new QueryCache({
  onError: (error) => {
    if (!(error instanceof AxiosError)) return;

    if (error.response?.status === 401) {
      useAuthStore.getState().auth.reset();
      postRefresh({ config: { headers: { Authorization: undefined } } })
        .then(({ data }) => {
          useAuthStore.getState().auth.setAccessToken(data.token);
          queryClient.invalidateQueries();
        })
        .catch((err) => {
          if (err.response?.status === 401) {
            const redirect = `${router.history.location.href}`;
            router.navigate({ to: '/login', search: { redirect } });
          }
        });
    } else if (error.response?.status === 500) {
      router.navigate({ to: '/500' });
    } else if (error.response?.status === 403) {
      router.navigate({ to: '/403', replace: true });
    }
  }
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 10 * 1000 // 10s
    }
  },
  mutationCache,
  queryCache
});

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
            <NuqsAdapter>
              <RouterProvider router={router} />
            </NuqsAdapter>
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </StrictMode>
  );
}
