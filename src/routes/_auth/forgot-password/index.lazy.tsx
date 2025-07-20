import { createLazyFileRoute } from '@tanstack/react-router';
import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';

import { ForgotPasswordForm, VerifyForm } from './-components';

const ForgotPasswordPage = () => {
  const [otpKey, setOtpKey] = React.useState<number | null>(null);

  if (!otpKey)
    return (
      <Card className='w-full'>
        <Helmet>
          <title>Forgot Password | MOCK - IELTS ZONE</title>
          <meta name='robots' content='noindex, nofollow' />
        </Helmet>
        <CardHeader className='flex flex-col space-y-2 text-left'>
          <CardTitle>Forgot password</CardTitle>
          <CardDescription>Enter your phone number below and new password</CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm onSuccess={setOtpKey} />
        </CardContent>
      </Card>
    );

  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-col space-y-2 text-left'>
        <CardTitle>Verify</CardTitle>
        <CardDescription>
          Enter the verification code sent via SMS, or open the Telegram bot below to retrieve your
          code.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <VerifyForm setOtpKey={setOtpKey} otpKey={otpKey} />
      </CardContent>
    </Card>
  );
};

export const Route = createLazyFileRoute('/_auth/forgot-password/')({
  component: ForgotPasswordPage
});
