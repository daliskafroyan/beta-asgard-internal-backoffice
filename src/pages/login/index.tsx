import useAuthStore from '@/store/useAuthStore';
import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Group,
} from '@mantine/core';
import React from 'react';
import { useForm } from '@mantine/form';
import { useMutation, useQuery } from 'react-query';
import withAuth from '@/utils/hooks/withAuth';
import { showNotification } from '@mantine/notifications';
import {
  MenuResponse,
  AuthRequest,
  getMenu,
  postCredentials,
} from '@/api/endpoint/asgard/backoffices';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
}));

const Login = () => {
  const { classes } = useStyles();
  const form = useForm<AuthRequest>({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : 'Invalid email',
    },
  });

  const fetchUserToken = useMutation(postCredentials);
  const {
    isLoading: fetchUserTokenIsLoading,
    isSuccess: fetchUserTokenIsSuccess,
    data: fetchUserTokenData,
  } = fetchUserToken;

  const login = useAuthStore.useLogin();
  const setMenu = useAuthStore.useSetMenu();

  const onFormSubmit = (values: AuthRequest) => {
    fetchUserToken.mutate(values, {
      onSuccess: () => {
        showNotification({
          title: 'Login Success',
          message: undefined,
          autoClose: 2000,
        });
      },
    });
  };

  useQuery<MenuResponse>(
    'main-menu',
    () =>
      getMenu({
        headers: {
          Authorization: `Bearer ${fetchUserTokenData?.data.access_token}`,
        },
      }),
    {
      enabled: fetchUserTokenIsSuccess,
      onSuccess: (data) => {
        login(fetchUserTokenData);
        setMenu(data);
      },
    },
  );

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={1} align="center" mt="md" mb={50}>
          Welcome back!
        </Title>

        <form onSubmit={form.onSubmit(onFormSubmit)}>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            placeholder="Password"
            label="Password"
            {...form.getInputProps('password')}
          />

          <Group position="right" mt="md">
            <Button
              loading={fetchUserTokenIsLoading}
              disabled={fetchUserTokenIsSuccess}
              fullWidth
              mt="xl"
              size="md"
              type="submit"
            >
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
};

export default withAuth(Login, 'auth');
