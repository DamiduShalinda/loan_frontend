import { AppShell } from '@mantine/core';
import { Footer } from './Components/Footer';
import { footerLinks } from './data';
import { NavbarMinimalColored } from './Components/NavBar';
import { ReactNode } from 'react';


interface LayoutProps {
    children: ReactNode;
  }

function Layout({children} : LayoutProps) {
  return (
    <AppShell
    // footer={<Footer links={footerLinks}/>}
    navbar={<NavbarMinimalColored/>}
    >
    {children}
    </AppShell>
  )
}

export default Layout