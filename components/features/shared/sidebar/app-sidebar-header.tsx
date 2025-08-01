import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { userRole } from '@/types/user';
import Link from 'next/link';
import React from 'react';

interface AppSidebarHeaderProps {
  role: userRole;
}

const AppSidebarHeader = ({ role }: AppSidebarHeaderProps) => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size='lg'
            asChild
            className='hover:bg-transparent active:bg-transparent'
          >
            <Link href='/jobs'>
              <div className='flex flex-col gap-0.5 leading-none'>
                <h1 className='text-primary text-2xl font-semibold'>Linkify</h1>
                <span className='text-sm opacity-50'>
                  {role === 'employer' ? 'Employer' : 'Job Seeker'} Dashboard
                </span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

export default AppSidebarHeader;
