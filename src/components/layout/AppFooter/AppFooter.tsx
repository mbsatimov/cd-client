import { Link } from '@tanstack/react-router';
import { InstagramIcon, SendIcon, YoutubeIcon } from 'lucide-react';
import React from 'react';

import { BaseLayout } from '@/components/layout';
import { Button, Separator } from '@/components/ui';
import { cn } from '@/lib/utils.ts';
import { useAuth } from '@/utils/stores';

interface Props extends React.ComponentProps<'footer'> {}

export const AppFooter = React.forwardRef<React.ElementRef<'footer'>, Props>(
  ({ className, children, ...props }, ref) => {
    const { user } = useAuth();

    return (
      <footer ref={ref} className={cn('pt-10', className)} {...props}>
        <BaseLayout>
          <div className='gap-10 md:grid md:grid-cols-3'>
            <div>
              <div>
                <Link className='flex w-fit items-center gap-2' to='/'>
                  <img alt='IELTS ZONE' className='h-10 dark:hidden' src='/logo.png' />
                  <img alt='IELTS ZONE' className='hidden h-10 dark:inline' src='/logo-dark.png' />
                </Link>
              </div>
              <p className='mt-6 text-sm text-muted-foreground'>
                The best platform for mocking your english skills.
              </p>
              <div className='my-8 flex gap-3'>
                <Button asChild size='icon' variant='secondary'>
                  <a href='https://www.youtube.com/@ieltszone/' rel='noreferrer' target='_blank'>
                    <YoutubeIcon className='size-6' />
                  </a>
                </Button>
                <Button asChild size='icon' variant='secondary'>
                  <a
                    href='https://www.instagram.com/ieltszone.uz/'
                    rel='noreferrer'
                    target='_blank'
                  >
                    <InstagramIcon className='size-6' />
                  </a>
                </Button>
                <Button asChild size='icon' variant='secondary'>
                  <a href='https://t.me/ieltszone_uz' rel='noreferrer' target='_blank'>
                    <SendIcon className='size-6' />
                  </a>
                </Button>
              </div>
            </div>
            <div className='mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 md:col-span-2 md:mt-0'>
              <div>
                <h3 className='text-sm font-semibold leading-6'>Contacts</h3>
                <ul className='mt-6 space-y-4'>
                  <li>
                    <a
                      href='tel:+998555110909'
                      className='text-sm leading-6 text-muted-foreground hover:text-foreground'
                      rel='noreferrer'
                      target='_blank'
                    >
                      +998 (55) 511-09-09
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://t.me/ieltszone_community'
                      className='text-sm leading-6 text-muted-foreground hover:text-foreground'
                      rel='noreferrer'
                      target='_blank'
                    >
                      Telegram
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className='text-sm font-semibold leading-6'>
                  <a href='https://ieltszone.uz' rel='noreferrer' target='_blank'>
                    IELTS ZONE
                  </a>
                </h3>
                <ul className='mt-6 space-y-4'>
                  <li>
                    <a
                      href='https://ieltszone.uz/courses'
                      className='text-sm leading-6 text-muted-foreground hover:text-foreground'
                      rel='noreferrer'
                      target='_blank'
                    >
                      Courses
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://ieltszone.uz/events'
                      className='text-sm leading-6 text-muted-foreground hover:text-foreground'
                      rel='noreferrer'
                      target='_blank'
                    >
                      Events
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://ieltszone.uz/vacancies'
                      className='text-sm leading-6 text-muted-foreground hover:text-foreground'
                      rel='noreferrer'
                      target='_blank'
                    >
                      Vacancies
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className='mt-10 text-sm font-semibold leading-6 sm:mt-0'>Account</h3>
                {user ? (
                  <ul className='mt-6 space-y-4'>
                    <li>
                      <Link
                        className='text-sm leading-6 text-muted-foreground hover:text-foreground'
                        to='/profile'
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className='text-sm leading-6 text-muted-foreground hover:text-foreground'
                        to='/bookings'
                      >
                        Bookings
                      </Link>
                    </li>
                    <li>
                      <Link
                        className='text-sm leading-6 text-muted-foreground hover:text-foreground'
                        to='/transactions'
                      >
                        Transactions
                      </Link>
                    </li>
                  </ul>
                ) : (
                  <ul className='mt-6 space-y-4'>
                    <li>
                      <Link
                        className='text-sm leading-6 text-muted-foreground hover:text-foreground'
                        to='/login'
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        className='text-sm leading-6 text-muted-foreground hover:text-foreground'
                        to='/register'
                      >
                        Sign up
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>

          <Separator className='my-6 md:my-10' />

          <div className='flex flex-col justify-between gap-6 lg:flex-row'>
            <p className='text-sm text-muted-foreground'>
              Copyright © {new Date().getFullYear()}. All Rights Reserved.
            </p>
          </div>
        </BaseLayout>
      </footer>
    );
  }
);
AppFooter.displayName = 'AppFooter';
