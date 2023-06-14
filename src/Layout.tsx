import { AppShell} from '@mantine/core';
import { ReactNode } from 'react';
import { HeaderAction } from './Components/Header';
import { NavbarMinimal } from './Components/NavBar';


interface LayoutProps {
    children: ReactNode;
  }

function Layout({children} : LayoutProps) {
  return (
    <AppShell
    header={<HeaderAction/>}
    // footer={<Footer links={footerLinks}/>}
    navbar={<NavbarMinimal/>}
    layout='alt'
    >
    {children}
    </AppShell>
  )
}

export default Layout