import { ReactNode } from 'react';
import { Container, createStyles, SimpleGrid, Title } from '@mantine/core';

import PageBreadcrumbs from '@/components/core/PageBreadcrumbs';

const useStyles = createStyles((theme) => ({
  pageTitle: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.secondaryColor[3]
        : theme.colors.secondaryColor[8],
  },
}));

export function PageContent({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  const { classes } = useStyles();

  return (
    <Container size="xl">
      <SimpleGrid verticalSpacing="md" py="md">
        <PageBreadcrumbs />
        {title ? (
          <Title order={2} className={classes.pageTitle}>
            {title}
          </Title>
        ) : null}
      </SimpleGrid>
      {children}
    </Container>
  );
}
