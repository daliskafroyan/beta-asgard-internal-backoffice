import React from 'react';
import { Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import withAuth from '@/utils/hooks/withAuth';

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
