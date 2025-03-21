import { createFileRoute, Outlet } from '@tanstack/react-router';

import { AppFooter, AppHeader } from '@/components/layout';

const LandingLayout = () => {
  return (
    <div className='flex min-h-svh flex-col'>
      <AppHeader />
      <div className='flex-1'>
        <Outlet />
      </div>
      <AppFooter />
    </div>
  );
};

export const Route = createFileRoute('/_landing')({
  component: LandingLayout
});
