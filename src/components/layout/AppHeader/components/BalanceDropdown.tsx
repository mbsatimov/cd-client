import { Link } from '@tanstack/react-router';
import { BadgeDollarSignIcon, HistoryIcon } from 'lucide-react';

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
import { formatPrice } from '@/lib/utils.ts';
import { useAuth } from '@/utils/stores';

export const BalanceDropdown = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
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
          <DropdownMenuItem asChild>
            <a href='https://payme.uz/fallback/merchant/?id=67dc152cf52fe817a0c6e808'>
              <BadgeDollarSignIcon />
              Fill balance
            </a>
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
  );
};
