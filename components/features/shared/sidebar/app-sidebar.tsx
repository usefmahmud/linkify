import { Sidebar } from '@/components/ui/sidebar';
import React from 'react';
import AppSidebarFooter from './app-sidebar-footer';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import AppSidebarContent from './app-sidebar-content';
import AppSidebarHeader from './app-sidebar-header';

const AppSidebar = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <Sidebar className='' variant='inset'>
      <AppSidebarHeader role={user.user_metadata.role} />

      <AppSidebarContent role={user.user_metadata.role} />

      <AppSidebarFooter user={user} />
    </Sidebar>
  );
};

export default AppSidebar;
