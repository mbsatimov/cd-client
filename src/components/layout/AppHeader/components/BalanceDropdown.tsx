import { LaptopIcon } from '@radix-ui/react-icons';
import { Link } from '@tanstack/react-router';
import { BadgeDollarSignIcon, HistoryIcon } from 'lucide-react';
import React from 'react';

import { FillBalanceDialog } from '@/components/FillBalanceDialog.tsx';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { formatPrice } from '@/lib/utils.ts';
import { CoinPricesDialog } from '@/routes/_landing/exams/online/-components/CoinPricesDialog.tsx';

export const BalanceDropdown = () => {
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openPricesDialog, setOpenPricesDialog] = React.useState(false);

  return (
    <div className='flex items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className='shrink-0 gap-0.5' size='sm' variant='ghost'>
            <span>{user?.coins}</span>
            <img alt='coin' className='size-5' height={32} src='/coin.png' width={32} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-44' forceMount>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link to='/exams/online'>
                <LaptopIcon />
                Try cd online
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenPricesDialog(true)}>
              <BadgeDollarSignIcon />
              Buy coins
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
      <CoinPricesDialog onOpenChange={setOpenPricesDialog} open={openPricesDialog} />
      <FillBalanceDialog onOpenChange={setOpenDialog} open={openDialog} />
    </div>
  );
};
