import { useState } from 'react';
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  UnstyledButton,
  createStyles,
  Text,
} from '@mantine/core';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { MainMenuType } from '@/components/layouts/sideNavbar';
import React from 'react';
import { SubmenuLinksGroup } from '@/components/layouts/SubmenuLinksGroup';
import {
  BanknotesIcon,
  BookOpenIcon,
  BriefcaseIcon,
  BugAntIcon,
  CalculatorIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  HandThumbUpIcon,
  IdentificationIcon,
  MapIcon,
  PhoneIcon,
  UserGroupIcon,
  UserIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/solid';

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
    paddingLeft: 31,
    marginLeft: 60,
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

export function LinksGroup({ icon, name, sub_menu }: MainMenuType) {
  const { classes, theme } = useStyles();
  const hasSubmenu = Array.isArray(sub_menu);
  const [opened, setOpened] = useState(false);
  const items = (hasSubmenu ? sub_menu : []).map((menu) => (
    <SubmenuLinksGroup menu={menu} key={menu.name} />
  ));

  const iconMapper = (icon: string) => {
    switch (icon) {
      case 'fa-phone':
        return <PhoneIcon width={16} />;
      case 'fa-user':
        return <UserIcon width={16} />;
      case 'fa-user-secret':
        return <BriefcaseIcon width={16} />;
      case 'fa-bug':
        return <BugAntIcon width={16} />;
      case 'fa-list-alt':
        return <DocumentTextIcon width={16} />;
      case 'fa-address-book':
        return <BookOpenIcon width={16} />;
      case 'fa-calculator':
        return <CalculatorIcon width={16} />;
      case 'fa-money-bill-wave':
        return <BanknotesIcon width={16} />;
      case 'fa-tractor':
        return <WrenchScrewdriverIcon width={16} />;
      case 'fa-id-card':
        return <IdentificationIcon width={16} />;
      case 'fa-map':
        return <MapIcon width={16} />;
      case 'fa-cog':
        return <Cog6ToothIcon width={16} />;
      case 'fa-users':
        return <UserGroupIcon width={16} />;
      case 'fa-angellist':
        return <HandThumbUpIcon width={16} />;
      default:
        break;
    }
  };

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              {iconMapper(icon)}
            </ThemeIcon>
            <Box ml="md">
              <Text tt="capitalize" fw={600} fz="md">
                {name.replaceAll('_', ' ')}
              </Text>
            </Box>
          </Box>
          {hasSubmenu && (
            <ChevronRightIcon
              className={classes.chevron}
              width={14}
              style={{
                transform: opened
                  ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)`
                  : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasSubmenu ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
