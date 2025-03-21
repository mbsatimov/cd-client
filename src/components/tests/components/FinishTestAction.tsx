import { CircleAlertIcon } from 'lucide-react';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui';

interface Props {
  onConfirm: () => void;
}

export const FinishTestAction = ({ onConfirm }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='destructive'>Finish</Button>
      </DialogTrigger>
      <DialogContent className='max-w-[400px]'>
        <div className='flex flex-col items-center gap-2'>
          <div
            aria-hidden='true'
            className='flex size-9 shrink-0 items-center justify-center rounded-full border border-border'
          >
            <CircleAlertIcon className='opacity-80' size={16} strokeWidth={2} />
          </div>
          <DialogHeader>
            <DialogTitle className='sm:text-center'>Finish Test</DialogTitle>
            <DialogDescription className='sm:text-center'>
              You still have time to finish the test. Are you sure you want to finish the test?
            </DialogDescription>
          </DialogHeader>
        </div>
        <DialogFooter className='gap-2'>
          <DialogClose asChild>
            <Button className='flex-1' type='button' variant='outline'>
              Cancel
            </Button>
          </DialogClose>
          <Button className='flex-1' type='button' variant='destructive' onClick={onConfirm}>
            Finish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
