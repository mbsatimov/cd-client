import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { toast } from 'sonner';

import { TooltipProvider } from '@/components/ui/tooltip.tsx';
import { ThemeProvider } from '@/utils/context';

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 10 * 1000 // 10s
    }
  },
  mutationCache
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
              <TooltipProvider>
                <RouterProvider router={router} />
              </TooltipProvider>
            </NuqsAdapter>
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </StrictMode>
  );
}
