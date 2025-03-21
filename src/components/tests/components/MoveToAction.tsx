import { ArrowRightFromLineIcon } from 'lucide-react';

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
import { useIsMobile } from '@/hooks';

interface Props {
  type: IeltsTestType;
  onConfirm: () => void;
}

export const MoveToAction = ({ type, onConfirm }: Props) => {
  const isMobile = useIsMobile();
  return (
    <Dialog>
      <DialogTrigger asChild>
        {isMobile ? (
          <Button size='icon'>
            <ArrowRightFromLineIcon />
          </Button>
        ) : (
          <Button>Move to {type}</Button>
        )}
      </DialogTrigger>
      <DialogContent className='max-w-[400px]'>
        <div className='flex flex-col items-center gap-2'>
          <DialogHeader>
            <DialogTitle className='my-2 sm:text-center'>
              Move to {type.charAt(0).toUpperCase() + type.slice(1)}
            </DialogTitle>
            <DialogDescription className='sm:text-center'>
              You still have time to finish the test. Are you sure you want to move to {type} test?
            </DialogDescription>
          </DialogHeader>
        </div>
        <DialogFooter className='gap-2'>
          <DialogClose asChild>
            <Button className='flex-1' type='button' variant='outline'>
              Cancel
            </Button>
          </DialogClose>
          <Button className='flex-1' type='button' onClick={onConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
