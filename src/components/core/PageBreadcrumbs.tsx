import { Breadcrumbs, createStyles, Text } from '@mantine/core';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  textLink: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.secondaryColor[1]
        : theme.colors.secondaryColor[6],

    '&:last-child': {
      fontWeight: 600,
      textDecoration: 'none',
    },

    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function PageBreadcrumbs() {
  const { classes } = useStyles();
  const router = useRouter();

  const routeArray = router.asPath.split('/').slice(1);
  const breadcrumbItems = routeArray.map((route, index, arr) => {
    return (
      <Link
        href={`/${String(arr.slice(0, index + 1)).replaceAll(',', '/')}`}
        key={nanoid()}
        passHref
      >
        <Text component="a" tt="capitalize" className={classes.textLink}>
          {route !== '[id]' && route?.replaceAll('-', ' ')}
        </Text>
      </Link>
    );
  });

  return <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>;
}
