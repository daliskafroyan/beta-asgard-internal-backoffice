import { useEffect, useState } from 'react';
import {
  AppShell as MantineAppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  useMantineColorScheme,
  Group,
  ActionIcon,
} from '@mantine/core';
import { NavbarNested } from '@/components/layouts/sideNavbar';
import { MagnifyingGlassIcon, SunIcon } from '@heroicons/react/24/outline';
import { MoonIcon } from '@heroicons/react/24/solid';
import UserMenu from '@/components/common/molecules/UserMenu';
import useAuthStore from '@/store/useAuthStore';
import { openSpotlight } from '@mantine/spotlight';

interface LayoutProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: LayoutProps) {
  const theme = useMantineTheme();
  const logout = useAuthStore.useLogout();
  const [opened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const menu = useAuthStore.useMenu();

  if (menu) {
    return (
      <MantineAppShell
        styles={{
          main: {
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            <Text>Application navbar</Text>
          </Navbar>
        }
        aside={
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            {/* <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
              <Text>Application sidebar</Text>
            </Aside> */}
            <NavbarNested menus={menu} />
            {/* <p>entol</p> */}
          </MediaQuery>
        }
        header={
          <Header height={70} p="md">
            <Group sx={{ height: '100%' }} px={20} position="apart">
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
              <Group>
                <ActionIcon
                  variant="outline"
                  onClick={() => openSpotlight()}
                  size={30}
                >
                  <MagnifyingGlassIcon width={16} />
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
  } else {
    return (
      <MantineAppShell
        styles={{
          main: {
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            <Text>Application navbar</Text>
          </Navbar>
        }
        aside={
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            {/* <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Text>Application sidebar</Text>
          </Aside> */}
            <NavbarNested menus={[]} />
            {/* <p>entol</p> */}
          </MediaQuery>
        }
        header={
          <Header height={70} p="md">
            <Group sx={{ height: '100%' }} px={20} position="apart">
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
          </Header>
        }
      >
        {children}
      </MantineAppShell>
    );
  }
}
