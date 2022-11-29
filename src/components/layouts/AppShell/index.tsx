import { useState } from 'react';
import { MagnifyingGlassIcon, SunIcon } from '@heroicons/react/24/outline';
import { MoonIcon } from '@heroicons/react/24/solid';
import {
  ActionIcon,
  AppShell as MantineAppShell,
  Burger,
  Group,
  Header,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { openSpotlight } from '@mantine/spotlight';

import AsideNavbar from '@/components/layouts/AppShell/AsideNavbar';
import useAuthStore from '@/store/useAuthStore';

import UserMenu from './UserMenu';

interface LayoutProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: LayoutProps) {
  const theme = useMantineTheme();
  const logout = useAuthStore.useLogout();
  const [menuOpened, setMenuOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const menu = useAuthStore.useMenu();

  return (
    <MantineAppShell
      styles={{
        main: {
          transition: 'padding-left 1000ms ease',
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbar={
        <AsideNavbar
          menus={menu ?? []}
          width={{ sm: menuOpened ? 270 : 0 }}
          hiddenBreakpoint={4000}
          hidden={!menuOpened}
          p={16}
          sx={{
            overflow: 'hidden',
            transition: 'width 500ms ease, min-width 500ms ease',
          }}
        />
      }
      header={
        <Header height={70} p="md">
          <Group sx={{ height: '100%' }} px={20} position="apart">
            <Burger
              opened={menuOpened}
              onClick={() => setMenuOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
            <Group>
              <ActionIcon
                variant="outline"
                onClick={() => openSpotlight()}
                size={30}
              >
                <MagnifyingGlassIcon width={16} />
              </ActionIcon>
              <ActionIcon
                variant="outline"
                onClick={() => toggleColorScheme()}
                size={30}
              >
                {colorScheme === 'dark' ? (
                  <SunIcon width={16} />
                ) : (
                  <MoonIcon width={16} />
                )}
              </ActionIcon>
              <UserMenu onLogOut={() => logout()} />
            </Group>
          </Group>
        </Header>
      }
    >
      {children}
    </MantineAppShell>
  );
}
