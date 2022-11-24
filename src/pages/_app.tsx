import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MantineThemeOverride,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import {
  NotificationsProvider,
  showNotification,
} from '@mantine/notifications';
import { LayoutFactory } from '@/utils/LayoutFactory';
import useAuthStore from '@/store/useAuthStore';
import '@fontsource/source-sans-pro/200.css';
import '@fontsource/source-sans-pro/300.css';
import '@fontsource/source-sans-pro/400.css';
import '@fontsource/source-sans-pro/600.css';
import '@fontsource/source-sans-pro/700.css';
import '@fontsource/source-sans-pro/900.css';
import { RouterTransition } from '@/utils/RouterTransition';
import { SpotlightAction, SpotlightProvider } from '@mantine/spotlight';
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }: AppProps) {
  const colorScheme = useAuthStore.useColorScheme();
  const setColorScheme = useAuthStore.useSetColorScheme();
  const menu = useAuthStore.useMenu();
  const router = useRouter();

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  const [showChild, setShowChild] = useState(false);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            showNotification({
              title: (error as any)?.message,
              message: (error as any)?.response.data.message.en,
            });
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            showNotification({
              title: (error as any)?.message,
              message: (error as any)?.response.data.message.en,
            });
          },
        }),
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  const koinworksTheme: MantineThemeOverride = {
    colorScheme,
    defaultRadius: 'xs',
    cursorType: 'pointer',
    fontFamily: 'Source Sans Pro, sans-serif',
    colors: {
      primaryColor: [
        '#E7D3D5',
        '#DBBEC0',
        '#CFA8AB',
        '#C39296',
        '#B67C80',
        '#AA666B',
        '#9E5156',
        '#923B41',
        '#86252C',
        '#792128',
      ],
      secondaryColor: [
        '#E7F5FF',
        '#D0EBFF',
        '#A5D8FF',
        '#74C0FC',
        '#4DABF7',
        '#339AF0',
        '#228BE6',
        '#1C7ED6',
        '#1971C2',
        '#1864AB',
      ],
    },
    primaryColor: 'primaryColor',
    headings: {
      fontFamily: 'Source Sans Pro, sans-serif',
    },
  };

  const mep = menu?.map((menu) => {
    return menu.sub_menu.map((sub_menu) => {
      return sub_menu.list.map((sub_menu_list) => {
        return {
          title: `${menu.name
            .replaceAll('_', ' ')
            .replace(/(\b[a-z](?!s))/g, (x) => x.toUpperCase())}`,
          description: `/${sub_menu.name
            .toLocaleLowerCase()
            .replaceAll(' ', '-')
            .replaceAll('_', '-')}/${sub_menu_list
            .replaceAll(' ', '-')
            .replaceAll('_', '-')}`,
          onTrigger: () =>
            router.push(
              `/${sub_menu.name
                .toLocaleLowerCase()
                .replaceAll(' ', '-')
                .replaceAll('_', '-')}/${sub_menu_list
                .replaceAll(' ', '-')
                .replaceAll('_', '-')}`,
            ),
        };
      });
    });
  });

  const actions: SpotlightAction[] = mep?.flat(2) ?? [];

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={koinworksTheme}
          withGlobalStyles
          withNormalizeCSS
        >
          <SpotlightProvider
            actions={actions}
            searchPlaceholder="Search Menu..."
            limit={7}
          >
            <RouterTransition />
            <NotificationsProvider autoClose={4000}>
              <LayoutFactory>
                <Component {...pageProps} />
              </LayoutFactory>
            </NotificationsProvider>
          </SpotlightProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  );
}
