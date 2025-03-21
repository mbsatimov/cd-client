import type { DialogProps } from '@radix-ui/react-dialog';

import { Link } from '@tanstack/react-router';
import { BadgeDollarSignIcon, HistoryIcon } from 'lucide-react';
import React from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui';
import { useAuth } from '@/utils/stores';

export const BalanceDropdown = () => {
  const { user } = useAuth();
  const [openFillBalanceDialog, setOpenFillBalanceDialog] = React.useState(false);

  if (!user) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost'>{(200000).toLocaleString()} UZS</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-56' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium leading-none'>Balance</p>
              <p className='text-xs leading-none text-muted-foreground'>
                {(200000).toLocaleString()} UZS
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setOpenFillBalanceDialog(true)}>
              <BadgeDollarSignIcon />
              Fill balance
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to='/'>
                <HistoryIcon />
                Transactions
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <BalanceFillDialog onOpenChange={setOpenFillBalanceDialog} open={openFillBalanceDialog} />
    </>
  );
};

const BalanceFillDialog = (props: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fill your Balance</DialogTitle>
          <DialogDescription>Choose a way to fill your balance</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
