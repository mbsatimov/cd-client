import { createLazyFileRoute } from '@tanstack/react-router';
import { Helmet } from 'react-helmet-async';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';

import { LoginForm } from './-components';

const LoginPage = () => {
  return (
    <Card>
      <Helmet>
        <title>Login | MOCK - IELTS ZONE</title>
      </Helmet>
      <CardHeader className='flex flex-col space-y-2 text-left'>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your phone number and password below <br />
          to log into your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
};

export const Route = createLazyFileRoute('/_auth/login/')({
  component: LoginPage
});
