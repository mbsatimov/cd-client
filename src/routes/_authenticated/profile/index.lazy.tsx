import { createLazyFileRoute } from '@tanstack/react-router';

import { useAuth } from '@/utils/stores';

import { PersonalInfoForm, SecurityForm } from './-components';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold'>Profile</h1>
      <PersonalInfoForm defaultValues={user || undefined} />
      <SecurityForm />
    </div>
  );
};

export const Route = createLazyFileRoute('/_authenticated/profile/')({
  component: ProfilePage
});
