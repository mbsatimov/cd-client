import { createLazyFileRoute } from '@tanstack/react-router';
import { Helmet } from 'react-helmet-async';

import { useAuth } from '@/utils/stores';

import { PersonalInfoForm, SecurityForm } from './-components';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className='space-y-6'>
      <Helmet>
        <title>Profile | MOCK - IELTS ZONE</title>
        <meta name='robots' content='noindex, nofollow' />
      </Helmet>
      <h1 className='text-3xl font-bold'>Profile</h1>
      <PersonalInfoForm defaultValues={user || undefined} />
      <SecurityForm />
    </div>
  );
};

export const Route = createLazyFileRoute('/_authenticated/profile/')({
  component: ProfilePage
});
