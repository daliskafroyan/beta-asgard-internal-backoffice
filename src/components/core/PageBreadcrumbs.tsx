import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Menu, Text, ActionIcon, Breadcrumbs } from '@mantine/core';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function PageBreadcrumbs() {
  const router = useRouter();

  const routeArray = router.asPath.split('/').slice(1);
  const breadcrumbItems = routeArray.map((route, index, arr) => {
    return (
      <Link
        href={`/${String(arr.slice(0, index + 1)).replaceAll(',', '/')}`}
        key={nanoid()}
        passHref
      >
        <Text component="a" tt="capitalize">
          {route !== '[id]' && route?.replaceAll('-', ' ')}
        </Text>
      </Link>
    );
  });

  return <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>;
}
