import { AppShell } from '@mantine/core';
import { ReactNode } from 'react';
import { NavbarNested } from './Components/NavBarNested/Navbarnested';
import { footerLinks} from './data';
import { HeaderAction } from './Components/Header';
import { Footer } from './Components/Footer';


interface LayoutProps {
    children: ReactNode;
  }

function Layout({children} : LayoutProps) {
  return (
    <AppShell
    header={<HeaderAction/>}
    // footer={<Footer links={footerLinks}/>}
    navbar={<NavbarNested/>}
    >
    {children}
    </AppShell>
  )
}

export default Layout