import { CircleAlertIcon } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button
} from '@/components/ui';

interface Props {
  onConfirm: () => void;
}

export const FinishTestAction = ({ onConfirm }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive'>Finish</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='max-w-[400px]'>
        <div className='flex flex-col items-center gap-2'>
          <div
            aria-hidden='true'
            className='flex size-9 shrink-0 items-center justify-center rounded-full border border-border'
          >
            <CircleAlertIcon className='opacity-80' size={16} strokeWidth={2} />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle className='sm:text-center'>Finish Test</AlertDialogTitle>
            <AlertDialogDescription className='sm:text-center'>
              You still have time to finish the test. Are you sure you want to finish the test?
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter className='gap-2'>
          <AlertDialogCancel asChild>
            <Button className='flex-1' type='button' variant='outline'>
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button className='flex-1' type='button' variant='destructive' onClick={onConfirm}>
              Finish
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
