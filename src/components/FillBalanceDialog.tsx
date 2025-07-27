import { useMutation } from '@tanstack/react-query';
import { SquareArrowOutUpRight } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem
} from '@/components/ui';
import { cn } from '@/lib/utils.ts';
import { postFillBalance } from '@/utils/api/requests/transactions';

interface Props extends React.ComponentProps<typeof Dialog> {}

interface FormValues {
  amount: string;
  type: TransactionSource;
}

export const FillBalanceDialog = ({ ...props }: Props) => {
  const [url, setUrl] = React.useState<string | null>(null);
  const form = useForm<FormValues>({
    defaultValues: {
      type: 'CLICK',
      amount: ''
    }
  });

  const postFillBalanceMutation = useMutation({
    mutationFn: postFillBalance,
    onSuccess: ({ data }) => {
      window.open(data);
      setUrl(data);
    }
  });

  const onSubmit = (data: FormValues) => {
    postFillBalanceMutation.mutate({
      config: { params: { amount: data.amount, type: data.type } }
    });
  };

  const formatPrice = (numStr: string) => {
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fill Balance</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Payment type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className='grid grid-cols-2 gap-2'
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <button type='button'>
                        <RadioGroupItem
                          aria-label='Click'
                          className='sr-only'
                          id='click'
                          value='CLICK'
                        />
                        <Label
                          className={cn(
                            'flex h-20 flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground',
                            { 'border-primary bg-muted': field.value === 'CLICK' }
                          )}
                          htmlFor='click'
                        >
                          <img
                            alt='Click Uz'
                            className='size-full object-contain'
                            src='/click.png'
                          />
                        </Label>
                      </button>
                      <button type='button'>
                        <RadioGroupItem
                          aria-label='Payme'
                          className='sr-only'
                          id='payme'
                          value='PAYME'
                        />
                        <Label
                          className={cn(
                            'flex h-20 flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground',
                            { 'border-primary bg-muted': field.value === 'PAYME' }
                          )}
                          htmlFor='payme'
                        >
                          <img alt='Payme' className='size-full object-contain' src='/payme.png' />
                        </Label>
                      </button>
                      {/*<button type='button'>*/}
                      {/*  <RadioGroupItem*/}
                      {/*    aria-label='Uzum'*/}
                      {/*    className='sr-only'*/}
                      {/*    id='uzum'*/}
                      {/*    value='UZUM'*/}
                      {/*  />*/}
                      {/*  <Label*/}
                      {/*    className={cn(*/}
                      {/*      'flex h-20 flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground',*/}
                      {/*      { 'border-primary bg-muted': field.value === 'UZUM' }*/}
                      {/*    )}*/}
                      {/*    htmlFor='uzum'*/}
                      {/*  >*/}
                      {/*    <img alt='Uzum' className='size-full object-contain' src='/uzum.png' />*/}
                      {/*  </Label>*/}
                      {/*</button>*/}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='type'
              control={form.control}
            />

            <FormField
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel required>Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter amount'
                      {...field}
                      value={formatPrice(field.value)}
                      onChange={(e) => {
                        const input = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
                        field.onChange(input);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              rules={{
                required: true
              }}
              name='amount'
              control={form.control}
            />
            {!url ? (
              <Button className='w-full' type='submit' loading={postFillBalanceMutation.isPending}>
                Fill balance
              </Button>
            ) : (
              <Button className='w-full' variant='secondary' onClick={() => window.open(url)}>
                Open payment page
                <SquareArrowOutUpRight />
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
