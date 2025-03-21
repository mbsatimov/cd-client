import { createLazyFileRoute } from '@tanstack/react-router';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';

import { LoginForm } from './-components';

const LoginPage = () => {
  return (
    <Card>
      <CardHeader className='flex flex-col space-y-2 text-left'>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email and password below <br />
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
