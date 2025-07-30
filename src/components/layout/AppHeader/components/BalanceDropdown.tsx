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
