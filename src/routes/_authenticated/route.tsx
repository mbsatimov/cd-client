import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router';
import { CalendarCheckIcon, HistoryIcon, UserCircleIcon } from 'lucide-react';

import { AppFooter, AppHeader, BaseLayout } from '@/components/layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb.tsx';
import { useAuthStore } from '@/utils/stores';

const AuthenticatedLayout = () => {
  return (
    <div className='flex min-h-svh flex-col'>
      <AppHeader />
      <BaseLayout className='flex-1 space-y-6'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Account</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className='w-full gap-6 lg:flex'>
          <aside className='-ml-3 hidden w-[220px] flex-col gap-1 lg:flex'>
            <Link
              className='flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent'
              activeProps={{ className: 'bg-accent' }}
              to='/profile'
            >
              <UserCircleIcon className='size-4' />
              Profile
            </Link>
            <Link
              className='flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent'
              activeProps={{ className: 'bg-accent' }}
              to='/bookings'
            >
              <CalendarCheckIcon className='size-4' />
              Bookings
            </Link>
            <Link
              className='flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent'
              activeProps={{ className: 'bg-accent' }}
              to='/transactions'
            >
              <HistoryIcon className='size-4' />
              Transactions
            </Link>
          </aside>
          <main className='flex-1'>
            <Outlet />
          </main>
        </div>
      </BaseLayout>
      <AppFooter />
    </div>
  );
};

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    if (!useAuthStore.getState().auth.accessToken) {
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href
        }
      });
    }
  },
  component: AuthenticatedLayout
});
