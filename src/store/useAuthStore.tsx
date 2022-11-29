import { ColorScheme } from '@mantine/core';
import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import produce from 'immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { AuthResponse, MenuResponse } from '@/api/endpoint/asgard/backoffices';

type AuthStoreType = {
  user: AuthResponse['data'] | undefined | null;
  menu: MenuResponse['data'] | null;
  colorScheme: ColorScheme;
  isAuthenticated: boolean;
  isLoading: boolean;
  spotlightMenu: Array<{ name: string; url: string }>;
  login: (res: AuthResponse | undefined) => void;
  logout: () => void;
  stopLoading: () => void;
  setMenu: (res: MenuResponse) => void;
  setColorScheme: (val: ColorScheme) => void;
};

const useAuthStoreBase = create<AuthStoreType>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      menu: null,
      spotlightMenu: [],
      colorScheme: 'light',
      login: (res) => {
        localStorage.setItem(
          'bifrost_token',
          `Bearer ${res?.data.access_token}`,
        );
        set(
          produce<AuthStoreType>((state) => {
            state.isAuthenticated = true;
            state.user = res?.data;
          }),
        );
      },
      logout: () => {
        localStorage.removeItem('bifrost_token');
        set(
          produce<AuthStoreType>((state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.menu = null;
          }),
        );
      },
      stopLoading: () => {
        set(
          produce<AuthStoreType>((state) => {
            state.isLoading = false;
          }),
        );
      },
      setMenu: (res) => {
        set(
          produce<AuthStoreType>((state) => {
            state.menu = res.data;
          }),
        );
      },
      setColorScheme: (val) => {
        set(
          produce<AuthStoreType>((state) => {
            state.colorScheme = val;
          }),
        );
      },
    }),
    {
      name: 'auth-store',
    },
  ),
);

const useAuthStore = createSelectorHooks(useAuthStoreBase);

export default useAuthStore;
