import withAuth from '@/utils/hooks/withAuth';
import { Button, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React from 'react';

function Dashboard() {
  return (
    <Button
      onClick={() =>
        showNotification({
          title: 'Error Notification',
          message: 'Error',
        })
      }
    >
      Hello World
    </Button>
  );
}

export default withAuth(Dashboard, 'all');
