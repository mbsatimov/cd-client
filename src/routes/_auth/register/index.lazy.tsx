import { createLazyFileRoute } from '@tanstack/react-router';
import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';

import { RegisterForm, VerifyForm } from './-components';

const LoginPage = () => {
  const [otpKey, setOtpKey] = React.useState<number | null>(null);

  if (!otpKey) {
    return (
      <Card>
        <Helmet>
          <title>Sign Up | MOCK - IELTS ZONE</title>
        </Helmet>
        <CardHeader className='flex flex-col space-y-2 text-left'>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Enter your credentials below
            <br />
            to register an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm onSuccess={setOtpKey} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className='flex flex-col space-y-2 text-left'>
        <CardTitle>Verify</CardTitle>
        <CardDescription>
          Enter the verification code sent to your phone
          <br />
          to verify your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <VerifyForm setOtpKey={setOtpKey} otpKey={otpKey} />
      </CardContent>
    </Card>
  );
};

export const Route = createLazyFileRoute('/_auth/register/')({
  component: LoginPage
});
