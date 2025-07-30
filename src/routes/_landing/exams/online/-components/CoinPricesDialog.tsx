import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Wallet } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

import { FillBalanceDialog } from '@/components/FillBalanceDialog.tsx';
import {
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label
} from '@/components/ui';
import { useAuth } from '@/hooks/useAuth.ts';
import { cn, formatPrice } from '@/lib/utils.ts';
import { getCDOnlinePricing, postBuyCoins } from '@/utils/api/requests';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CoinPricesDialog = ({ open, onOpenChange }: Props) => {
  const getCDOnlinePricingQuery = useSuspenseQuery({
    queryKey: ['cd-online-prices'],
    queryFn: () => getCDOnlinePricing()
  });

  const { user } = useAuth();
  const pricing = getCDOnlinePricingQuery.data.data;

  const [openFillBalanceDialog, setOpenFillBalanceDialog] = React.useState(false);

  const values = [
    { name: '200 Coins', value: 200, price: pricing.twoHundredCoinsExchangeRate },
    { name: '100 Coins', value: 100, price: pricing.oneHundredCoinsExchangeRate },
    { name: '50 Coins', value: 50, price: pricing.fiftyCoinsExchangeRate },
    { name: '10 Coins', value: 10, price: pricing.tenCoinsExchangeRate },
    { name: '1 Coin', value: 1, price: pricing.oneCoinExchangeRate }
  ];

  function calculateCoinPriceBreakdown(count: number) {
    const breakdown = [];

    let remaining = count;
    let totalPrice = 0;

    for (const bundle of values) {
      const qty = Math.floor(remaining / bundle.value);
      if (qty > 0) {
        breakdown.push({ ...bundle, quantity: qty });
        totalPrice += qty * bundle.price;
        remaining %= bundle.value;
      }
    }

    return { breakdown, totalPrice };
  }

  const postBuyCoinsMutation = useMutation({
    mutationFn: postBuyCoins,
    onSuccess: () => {
      onOpenChange(false);
      toast.success('Coins purchased successfully! 🎉');
    }
  });

  const [coinCount, setCoinCount] = React.useState(1);
  const { totalPrice } = calculateCoinPriceBreakdown(coinCount);

  const onBuyCoins = () => {
    if (user.balance < totalPrice) {
      toast.error('Insufficient balance. Please add funds to your account.');
      setOpenFillBalanceDialog(true);
      return;
    }
    postBuyCoinsMutation.mutate({ config: { params: { amount: totalPrice } } });
  };

  const hasEnoughBalance = user.balance >= totalPrice;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className='max-h-svh max-w-lg overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Purchase Coins</DialogTitle>
          <DialogDescription>
            Enter the number of coins you&apos;d like to purchase
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4 md:space-y-6 md:py-2'>
          {/* Current Balance */}
          <Card className='bg-muted/50 p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Wallet className='h-4 w-4 text-muted-foreground' />
                <span className='text-sm font-medium'>Current Balance</span>
              </div>
              <span className='font-semibold'>{formatPrice(user.balance)}</span>
            </div>
          </Card>
          <div className='grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2'>
            {values.reverse().map((price) => (
              <Card
                key={price.name}
                className={cn('cursor-pointer', {
                  'border-primary bg-primary/20': totalPrice === price.price
                })}
                onClick={() => setCoinCount(price.value)}
              >
                <CardHeader className='p-2 text-center'>
                  <h3 className='flex items-center justify-center gap-2 text-sm font-bold'>
                    <img alt='coin' className='size-4' height={24} src='/coin.png' width={24} />
                    {price.name}
                  </h3>
                  <div className='text-sm'>{formatPrice(price.price)}</div>
                </CardHeader>
              </Card>
            ))}
          </div>
          {/* Coin Input */}
          <div className='space-y-2'>
            <Label className='text-sm font-medium' htmlFor='coin-count'>
              Number of Coins
            </Label>
            <div className='flex items-center gap-2'>
              <Button
                className='shrink-0'
                size='icon'
                variant='outline'
                onClick={() => setCoinCount(Math.max(1, coinCount - 1))}
              >
                <MinusIcon />
              </Button>
              <Input
                className='text-center text-lg font-semibold'
                id='coin-count'
                min={1}
                type='number'
                value={coinCount}
                onChange={(e) => setCoinCount(Math.max(1, Number(e.target.value)))}
                onFocus={(e) => e.target.select()}
                placeholder='Enter amount'
              />
              <Button
                className='shrink-0'
                size='icon'
                variant='outline'
                onClick={() => setCoinCount(coinCount + 1)}
              >
                <PlusIcon />
              </Button>
            </div>
          </div>

          {/* Total Price Display */}
          <Card
            className={`border-2 p-4 ${hasEnoughBalance ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20' : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20'}`}
          >
            <div className='space-y-1 text-center'>
              <p className='text-sm text-muted-foreground'>Total Cost</p>
              <p className='text-2xl font-bold'>{formatPrice(totalPrice)}</p>
              {!hasEnoughBalance && (
                <p className='text-sm text-red-600 dark:text-red-400'>
                  Need {formatPrice(totalPrice - user.balance)} more
                </p>
              )}
            </div>
          </Card>
        </div>

        <DialogFooter className='gap-2'>
          <DialogClose asChild>
            <Button className='flex-1 bg-transparent' variant='outline'>
              Cancel
            </Button>
          </DialogClose>
          {!hasEnoughBalance ? (
            <Button
              className='flex-1'
              variant='default'
              onClick={() => setOpenFillBalanceDialog(true)}
            >
              Fill Balance
            </Button>
          ) : (
            <Button
              className='flex-1'
              disabled={coinCount < 1}
              loading={postBuyCoinsMutation.isPending}
              onClick={onBuyCoins}
            >
              Purchase Coins
            </Button>
          )}
        </DialogFooter>

        <FillBalanceDialog
          key={totalPrice}
          defaultAmount={String(Math.max(1000, totalPrice - user.balance))}
          onOpenChange={setOpenFillBalanceDialog}
          open={openFillBalanceDialog}
        />
      </DialogContent>
    </Dialog>
  );
};
