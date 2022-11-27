import { Navbar, Group, Code, ScrollArea, createStyles } from '@mantine/core';
import { LinksGroup } from './NavbarLinksGroup';

export type SubmenuType = {
  name: string;
  list: string[];
};

export type MainMenuType = {
  id: number;
  name: string;
  icon: string;
  sub_menu: SubmenuType[];
};

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
}));

export default function AsideNavbar({ menus }: any) {
  const { classes } = useStyles();
  const mainMenus = menus || [];

  return (
    <Navbar height={800} width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section className={classes.header}>
        <Group position="apart">
          <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>
          {(mainMenus as MainMenuType[]).map((menu) => (
            <LinksGroup {...menu} key={menu.id} />
          ))}
        </div>
      </Navbar.Section>
    </Navbar>
  );
}
