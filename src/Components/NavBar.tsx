import { useState } from 'react';
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack, rem} from '@mantine/core';
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
  IconCalculator,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

interface NavbarLinkProps {
  icon: React.FC<any>;
  label: string;
  active?: boolean;
  to: string;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, to, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <Link to={to}>
      <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
      </Link>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Home' , to: '/homepage'},
  { icon: IconGauge, label: 'Dashboard' , to: '/customers/addnew'},
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics' , to: '/analytics'},
  { icon: IconCalendarStats, label: 'Releases' , to: '/releases'},
  { icon: IconUser, label: 'Account' , to: '/account'},
  { icon: IconCalculator, label: 'Calculator' , to: '/loancalculator'},
  { icon: IconSettings, label: 'Settings' , to: '/settings'},
];

export function NavbarMinimal() {
  const [active, setActive] = useState(3);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      to={link.to}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <Navbar height='100vh' width={{ base: 80 }} p="md">
      
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconSwitchHorizontal} label="Change account" to='/settings' />
          <NavbarLink icon={IconLogout} label="Logout" to='/settings' />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}