import React from 'react';
import { Box, createStyles, Text } from '@mantine/core';
import { nanoid } from 'nanoid';
import Link from 'next/link';

import { SubmenuType } from './index';

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  subLink: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 21,
    marginLeft: 35,
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: 'transform 200ms ease',
  },
}));

interface ISubmenuLinksGroup {
  menu: SubmenuType;
}

export function SubmenuLinksGroup({ menu }: ISubmenuLinksGroup) {
  const { classes } = useStyles();

  for (let i = 0; i < menu.list.length; i++) {
    if (menu.list[i].charAt(i) === '_' || ' ') {
      menu.list[i].charAt(i) === '-';
    }
  }
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box ml="md" py="xs" px="md" fz="sm">
          <Text tt="uppercase" fw={600} style={{ letterSpacing: '0.5px' }}>
            {menu.name.replaceAll('_', ' ')}
          </Text>
        </Box>
      </Box>
      {menu.list.map((link) => (
        <Link
          href={`/${menu.name
            .toLocaleLowerCase()
            .replaceAll(' ', '-')
            .replaceAll('_', '-')}/${link
            .replaceAll(' ', '-')
            .replaceAll('_', '-')}`}
          key={nanoid()}
          passHref
        >
          <Text component="a" className={classes.subLink} tt="capitalize">
            {link.replaceAll('_', ' ')}
          </Text>
        </Link>
      ))}
    </>
  );
}
