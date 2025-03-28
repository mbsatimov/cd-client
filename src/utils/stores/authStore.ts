import Cookies from 'js-cookie';
import { create } from 'zustand';

const ACCESS_TOKEN = 'thisisjustarandomstring';

interface AuthState {
  auth: {
    user?: User | null;
    setUser: (user: User | null) => void;
    accessToken: string | null;
    setAccessToken: (accessToken: string) => void;
    resetAccessToken: () => void;
    reset: () => void;
  };
}

export const useAuthStore = create<AuthState>()((set) => {
  const accessToken = Cookies.get(ACCESS_TOKEN) || null;
  return {
    auth: {
      user: undefined,
      setUser: (user) => set((state) => ({ ...state, auth: { ...state.auth, user } })),
      accessToken,
      setAccessToken: (accessToken) =>
        set((state) => {
          Cookies.set(ACCESS_TOKEN, accessToken);
          return { ...state, auth: { ...state.auth, accessToken } };
        }),
      resetAccessToken: () =>
        set((state) => {
          Cookies.remove(ACCESS_TOKEN);
          return { ...state, auth: { ...state.auth, accessToken: '' } };
        }),
      reset: () =>
        set((state) => {
          Cookies.remove(ACCESS_TOKEN);
          return {
            ...state,
            auth: { ...state.auth, user: null, accessToken: null, refreshToken: null }
          };
        })
    }
  };
});

export const useAuth = () => useAuthStore((state) => state.auth);
