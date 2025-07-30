import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { AlertCircleIcon } from 'lucide-react';
import React from 'react';

import {
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertTitle,
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
import { getCDOnlinePricing, getMe, postCDOnlineParticipation } from '@/utils/api/requests';

import { CoinPricesDialog } from './CoinPricesDialog.tsx';

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
  const [openCoinPricesDialog, setOpenCoinPricesDialog] = React.useState(false);
  const getMeQuery = useSuspenseQuery({
    queryKey: ['me'],
    queryFn: () => getMe()
  });
  const user = getMeQuery.data.data;
  const getCDOnlinePricingQuery = useSuspenseQuery({
    queryKey: ['cd-online-prices'],
    queryFn: () => getCDOnlinePricing()
  });
  const pricing = getCDOnlinePricingQuery.data.data;

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

  const priceMap: Record<CDOnlineType, number> = {
    LISTENING: pricing.listeningPrice,
    READING: pricing.readingPrice,
    WRITING: pricing.writingPrice
  };

  const totalPrice = testTypes.map((testType) => priceMap[testType]).reduce((a, b) => a + b, 0);

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
          <CardTitle className='text-center text-2xl sm:text-3xl md:text-5xl'>
            {item.title}
          </CardTitle>
        </CardHeader>
      </Card>
      <Dialog onOpenChange={setOpenForm} open={openForm}>
        <DialogContent className='max-h-svh overflow-y-auto'>
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
                  <span className='text-sm font-semibold'>
                    {priceMap[testType].toLocaleString()}
                  </span>
                  <img alt='coin' className='size-4' height={16} src='/coin.png' width={16} />
                </div>
              </button>
            ))}
          </div>
          <div className='flex justify-between border-t px-2 pt-4'>
            <div className='font-semibold'>Total</div>
            <div className='flex items-center gap-2 font-semibold'>
              <span>{totalPrice.toLocaleString()} </span>
              <img alt='coin' className='size-4' height={16} src='/coin.png' width={16} />
            </div>
          </div>
          {user.coins < totalPrice && (
            <>
              <Alert variant='destructive'>
                <AlertCircleIcon className='size-4' />
                <AlertTitle>Oops!</AlertTitle>
                <AlertDescription>
                  You do not have enough coins to purchase these tests. Please buy more coins to
                  participate in the CD Online exam.
                </AlertDescription>
              </Alert>
              <Button size='sm' variant='outline' onClick={() => setOpenCoinPricesDialog(true)}>
                Buy coins
              </Button>
            </>
          )}
          <CoinPricesDialog onOpenChange={setOpenCoinPricesDialog} open={openCoinPricesDialog} />
          <Button
            disabled={testTypes.length === 0 || user?.coins < totalPrice}
            loading={postCDOnlineParticipationMutation.isPending}
            onClick={onBuyTest}
          >
            BUY TESTS
          </Button>
        </DialogContent>
      </Dialog>
      <AlertDialog onOpenChange={setOpenAlert} open={openAlert}>
        <AlertDialogContent className='max-w-[400px]'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center'>{item.title}</AlertDialogTitle>
            <AlertDialogDescription className='text-center'>
              You can start the test now or later when you are ready. The exam will be accessible
              from your profile page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
            <Button variant='outline' onClick={() => setOpenAlert(false)}>
              Later
            </Button>
            {participationId && (
              <Button asChild>
                <Link params={{ id: participationId }} to='/exam/online/$id'>
                  Start now
                </Link>
              </Button>
            )}
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
