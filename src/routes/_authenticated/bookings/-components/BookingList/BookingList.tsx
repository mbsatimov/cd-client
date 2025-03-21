import { Spinner } from '@/components/ui';

import { BookingItem } from './components';
import { useBookingList } from './hooks';

export const BookingList = () => {
  const { state } = useBookingList();

  if (state.isLoading) {
    return (
      <div className='mt-10 grid place-items-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {state.registrations?.length ? (
        state.registrations.map((registration) => (
          <BookingItem key={registration.id} registration={registration} />
        ))
      ) : (
        <div className='my-10 text-center text-muted-foreground'>No exams found</div>
      )}
    </div>
  );
};
