import {
  createStyles,
  Menu,
  Center,
  Header,
  Container,
  Group,
  Button,
  Burger,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import { headerdata } from '../data';
import { Link } from 'react-router-dom';
import LightDarkButton from './LightDarkButton';
import AuthContext from '../Context/AuthContext';
import { useContext } from 'react';

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));

interface HeaderActionProps {
  links: { link: string; label: string; links: { link: string; label: string }[] }[];
}

export function HeaderAction() {

    const authContext = useContext(AuthContext);
    const { contextData } = authContext;



  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const items = headerdata.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Link to={item.link} key={item.link} style={{textDecoration : 'none'}}>
      <Menu.Item key={item.link} className={classes.link}>{item.label}</Menu.Item>
      </Link>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal position='bottom-start'>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={rem(12)} stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link
        key={link.label}
        to={link.link}
        className={classes.link}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120}>
      <Container className={classes.inner} fluid>
        <Group>
          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
          <MantineLogo size={28} />
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <Group>
        <LightDarkButton/>
        <Button radius="lg" h={30} onClick={contextData.logOutUser}>
          Sign Out
        </Button>
        </Group>
      </Container>
    </Header>
  );
}