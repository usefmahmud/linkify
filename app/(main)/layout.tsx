import AppSidebar from '@/components/features/shared/sidebar/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className='md:peer-data-[variant=inset]:m-4'>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
