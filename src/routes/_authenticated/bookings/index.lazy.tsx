import { createLazyFileRoute } from '@tanstack/react-router';

import { BookingList } from './-components';

const BookingsPage = () => {
  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold'>Bookings</h1>
      <BookingList />
    </div>
  );
};

export const Route = createLazyFileRoute('/_authenticated/bookings/')({
  component: BookingsPage
});
