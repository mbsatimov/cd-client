import { useMutation } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import React from 'react';

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui';
import { cn } from '@/lib/utils.ts';
import { postCDOnlineParticipation } from '@/utils/api/requests';

interface Props {
  item: CDOnline;
}

export const CDOnlineItem = ({ item }: Props) => {
  const [openForm, setOpenForm] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [participationId, setParticipationId] = React.useState<string | null>(null);
  const [testTypes, setTestTypes] = React.useState<CDOnlineType[]>([
    'LISTENING',
    'READING',
    'WRITING'
  ]);
  const postCDOnlineParticipationMutation = useMutation({
    mutationFn: postCDOnlineParticipation,
    onSuccess: ({ data }) => {
      setOpenForm(false);
      setOpenAlert(true);
      setParticipationId(data.id);
    }
  });

  const onBuyTest = () => {
    postCDOnlineParticipationMutation.mutate({
      data: testTypes,
      config: {
        params: { cdOnlineId: item.id }
      }
    });
  };

  const toggleTestType = (testType: CDOnlineType) => {
    if (testTypes.includes(testType)) {
      setTestTypes(testTypes.filter((type) => type !== testType));
    } else {
      setTestTypes([...testTypes, testType]);
    }
  };

  return (
    <>
      <Card
        key={item.id}
        className='group relative grid aspect-[3/4] cursor-pointer place-items-center overflow-hidden bg-transparent bg-gradient-to-br from-background/80 to-primary/50 ring-0 ring-primary/30 transition-all duration-500 hover:border-primary hover:ring-4'
        onClick={() => setOpenForm(true)}
      >
        <img
          alt=''
          className='absolute inset-0 z-[-1] size-full object-cover transition-transform duration-500 group-hover:scale-110'
          src='/landing/exams/ielts-paper-bg.png'
        />
        <CardHeader>
          <CardTitle className='text-center text-5xl'>{item.title}</CardTitle>
        </CardHeader>
      </Card>
      <Dialog onOpenChange={setOpenForm} open={openForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{item.title}</DialogTitle>
            <DialogDescription>Choose the test types you want to take.</DialogDescription>
          </DialogHeader>
          <div className='space-y-2'>
            {(['LISTENING', 'READING', 'WRITING'] as CDOnlineType[]).map((testType) => (
              <button
                key={testType}
                className={cn(`flex w-full items-center gap-3 rounded-md border p-3 outline-none`, {
                  'border-primary': testTypes.includes(testType)
                })}
                type='button'
                onClick={() => toggleTestType(testType)}
              >
                <Checkbox checked={testTypes.includes(testType)} id={testType} />
                <div className='flex-1 text-start font-medium uppercase'>{testType}</div>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-semibold'>10 000</span>
                  <span className='text-sm text-muted-foreground'>som</span>
                </div>
              </button>
            ))}
          </div>
          <Button disabled={testTypes.length === 0} onClick={onBuyTest}>
            BUY TEST
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog onOpenChange={setOpenAlert} open={openAlert}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{item.title}</DialogTitle>
            <DialogDescription>
              You can start the test now or later when you are ready. The exam will be accessible
              from your profile page.
            </DialogDescription>
          </DialogHeader>
          <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
            <Button onClick={() => setOpenAlert(false)}>Later</Button>
            {participationId && (
              <Button asChild>
                <Link params={{ id: participationId }} to='/exam/online/$id'>
                  Start now
                </Link>
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
