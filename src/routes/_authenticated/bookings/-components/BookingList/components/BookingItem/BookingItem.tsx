import { Link } from '@tanstack/react-router';
import { format } from 'date-fns';
import { ArrowUpRight, FileTextIcon, MailOpenIcon, MonitorIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui';
import { cn } from '@/lib/utils.ts';
import { registrationStatusMap } from '@/utils/context';

interface Props {
  registration: Registration;
}
export const BookingItem = ({ registration }: Props) => {
  const [showCode, setShowCode] = React.useState(false);

  const onShowCode = () => {
    setShowCode(true);
    toast.warning("Don't share your code with others");
  };
  return (
    <Card>
      <CardHeader className='space-y-0 border-b p-0'>
        <div className='flex justify-between border-b p-4 pb-2'>
          <div className='space-y-2'>
            <CardTitle className='text-xl md:text-2xl'>{registration.exam.location}</CardTitle>
            <CardDescription>
              <a
                href={registration.exam.locationUrl}
                className='inline-flex items-center gap-1 hover:underline'
              >
                Open location in Google Maps
                <ArrowUpRight className='size-4' />
              </a>
            </CardDescription>
          </div>
          <div className='text-right text-sm'>
            <div className='text-lg font-semibold'>{format(registration.speakingTime, 'p')}</div>
            <div className='text-muted-foreground'>
              {format(registration.speakingTime, 'dd MMMM, yyyy')}
            </div>
          </div>
        </div>
        <div className='flex items-center justify-between px-4 py-2'>
          <CardTitle className='text-lg'>Speaking Time</CardTitle>
          <div className='text-right text-sm'>
            <div className='font-semibold'>
              {format(registration.exam.examDateTime, 'dd MMMM, EEE p')}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className='flex justify-between px-4 py-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <Badge
            className={cn(
              registration.status === 'P_MARKED' && 'bg-red-500 hover:bg-red-500',
              registration.status === 'BOOKED' && 'bg-yellow-500 hover:bg-yellow-500',
              registration.status === 'P_MARKED' && 'bg-lime-500 hover:bg-lime-500',
              registration.status === 'MARKED' && 'bg-green-500 hover:bg-green-500'
            )}
          >
            {registrationStatusMap[registration.status]}
          </Badge>
        </div>
        {registration.code &&
          (registration.status === 'BOOKED' || registration.status === 'P_MARKED') && (
            <Button size='sm' variant='outline' onClick={onShowCode}>
              {showCode ? registration.code : 'Show code'}
            </Button>
          )}
        {registration.status === 'MARKED' && (
          <div className='flex items-end'>
            <Button asChild size='sm'>
              <Link
                params={{ id: String(registration.id) }}
                to={registration.type === 'CD' ? '/bookings/$id/cd' : '/bookings/$id/paper'}
              >
                See results
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className='flex items-end justify-between gap-6 p-4 pt-0'>
        <div className='grid flex-1 gap-3 md:grid-cols-2'>
          {registration.type === 'PAPER' && (
            <div className='flex items-center gap-2'>
              <MailOpenIcon className='size-4' />
              <p className='text-sm'>Results expected in 1 to 3 days</p>
            </div>
          )}
          {registration.type === 'CD' && (
            <div className='flex items-center gap-2'>
              <MailOpenIcon className='size-4' />
              <p className='text-sm'>Results expected in 1 to 2 days</p>
            </div>
          )}
          {registration.type === 'PAPER' && (
            <div className='flex items-center gap-2'>
              <FileTextIcon className='size-4' />
              <p className='text-sm'>IELTS on paper</p>
            </div>
          )}
          {registration.type === 'CD' && (
            <div className='flex items-center gap-2'>
              <MonitorIcon className='size-4' />
              <p className='text-sm'>IELTS on computer</p>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
