import { useSuspenseQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { getMe } from '@/utils/api/requests';

export const useAuth = () => {
  const getMeQuery = useSuspenseQuery({
    queryKey: ['me'],
    queryFn: () => getMe()
  });
  const user = getMeQuery.data.data;

  const onLogout = () => {
    Cookies.remove('accessToken');
    window.location.reload();
  };

  return {
    user,
    onLogout
  };
};
