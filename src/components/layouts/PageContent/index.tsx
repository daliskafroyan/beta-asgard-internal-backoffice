import { ReactNode } from 'react';
import { Container, createStyles, SimpleGrid, Title } from '@mantine/core';
import Head from 'next/head';

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
  title: string;
  children: ReactNode;
}) {
  const { classes } = useStyles();

  return (
    <>
      <Head>
        <title>{title}</title>
        {/* <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container size="xl">
        <SimpleGrid verticalSpacing="md" py="md">
          <PageBreadcrumbs />

          <Title order={2} className={classes.pageTitle}>
            {title}
          </Title>

          {children}
        </SimpleGrid>
      </Container>
    </>
  );
}
