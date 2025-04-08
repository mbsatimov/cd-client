import { useMutation } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { BadgeDollarSignIcon, HistoryIcon } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Radio,
  RadioGroup
} from '@/components/ui';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn, formatPrice } from '@/lib/utils.ts';
import { postFillBalance } from '@/utils/api/requests/transactions';
import { useAuth } from '@/utils/stores';

export const BalanceDropdown = () => {
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = React.useState(false);

  if (!user) return null;

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className='shrink-0' size='sm' variant='ghost'>
            {formatPrice(user.balance)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-56' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium leading-none'>Balance</p>
              <p className='text-xs leading-none text-muted-foreground'>
                {formatPrice(user.balance)}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setOpenDialog(true)}>
              <BadgeDollarSignIcon />
              Fill balance
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to='/transactions'>
                <HistoryIcon />
                Transactions
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <FillBalanceDialog onOpenChange={setOpenDialog} open={openDialog} />
    </div>
  );
};

interface Props extends React.ComponentProps<typeof Dialog> {}

interface FormValues {
  amount: string;
  type: TransactionSource;
}

const FillBalanceDialog = ({ ...props }: Props) => {
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
    }
  });

  const onSubmit = (data: FormValues) => {
    postFillBalanceMutation.mutate({
      config: { params: { amount: data.amount, type: data.type } }
    });
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
                      onChange={field.onChange}
                    >
                      <button type='button'>
                        <Radio aria-label='Click' className='sr-only' id='click' value='CLICK' />
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
                        <Radio aria-label='Payme' className='sr-only' id='payme' value='PAYME' />
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
                    <Input type='number' placeholder='Enter amount' {...field} />
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
            <Button className='w-full' type='submit' loading={postFillBalanceMutation.isPending}>
              Fill balance
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
