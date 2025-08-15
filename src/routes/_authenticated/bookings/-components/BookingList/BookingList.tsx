import { Link } from '@tanstack/react-router';

import { Button } from '@/components/ui';

import { BookingItem } from './components';
import { useBookingList } from './hooks';

export const BookingList = () => {
  const { state } = useBookingList();

  if (state.registrations.length === 0) {
    return (
      <div className='grid place-items-center gap-4 py-10 text-muted-foreground'>
        <p>You have not made any bookings yet</p>
        <Button asChild>
          <Link to='/exams'>Book now</Link>
        </Button>
      </div>
    );
  }

  return state.registrations.map((registration) => (
    <BookingItem key={`${registration.id}${registration.type}`} registration={registration} />
  ));
};
