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
      <SidebarInset className='overflow-hidden md:peer-data-[variant=inset]:m-4 p-4'>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
