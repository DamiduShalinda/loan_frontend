import { AppShell } from '@mantine/core';
import { NavbarMinimalColored } from './Components/NavBarColoured';
import { ReactNode } from 'react';
import { NavbarNested } from './Components/NavBarNested/Navbarnested';
import { NavbarMinimal } from './Components/NavBar';


interface LayoutProps {
    children: ReactNode;
  }

function Layout({children} : LayoutProps) {
  return (
    <AppShell
    // footer={<Footer links={footerLinks}/>}
    navbar={<NavbarMinimalColored/>}
    // navbar={<NavbarNested/>}
    // navbar={<NavbarMinimal/>}
    >
    {children}
    </AppShell>
  )
}

export default Layout