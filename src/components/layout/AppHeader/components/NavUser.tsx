import { Link, useRouter } from '@tanstack/react-router';
import {
  CalendarCheckIcon,
  HistoryIcon,
  LogOutIcon,
  UserCircleIcon,
  UserCogIcon
} from 'lucide-react';

import { PermissionWrapper } from '@/components/PermissionWrapper.tsx';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui';
import { formatPhoneNumber } from '@/lib/utils.ts';
import { useAuth } from '@/utils/stores';

export const NavUser = () => {
  const { user, reset } = useAuth();
  const router = useRouter();

  const onLogout = () => {
    reset();
    router.navigate({ to: '/' });
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='relative h-8 w-8 shrink-0 rounded-full' variant='ghost'>
          <Avatar className='h-8 w-8'>
            <AvatarImage alt='@shadcn' src='/avatars/01.png' />
            <AvatarFallback>{user.firstName[0] + user.lastName[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{`${user.firstName} ${user.lastName}`}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {formatPhoneNumber(user.phoneNumber)}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to='/profile'>
              <UserCircleIcon />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to='/bookings'>
              <CalendarCheckIcon />
              Bookings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to='/transactions'>
              <HistoryIcon />
              Transactions
            </Link>
          </DropdownMenuItem>
          <PermissionWrapper allowedRoles={['ADMIN', 'PLACEMENT_TESTER']}>
            <DropdownMenuItem asChild>
              <Link to='/placements'>
                <UserCogIcon />
                Placements
              </Link>
            </DropdownMenuItem>
          </PermissionWrapper>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-red-500' onClick={onLogout}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
