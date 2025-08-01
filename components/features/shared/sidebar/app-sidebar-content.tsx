'use client';
import {
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { userRole } from '@/types/user';
import { BriefcaseBusiness, FileText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface AppSidebarContentProps {
  role: userRole;
}

interface MenuItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

const AppSidebarContent = ({ role }: AppSidebarContentProps) => {
  const pathname = usePathname();
  const getMenuItems = (role: userRole): MenuItem[] => {
    switch (role) {
      case 'job-seeker':
        return [
          { title: 'Jobs', href: '/jobs', icon: <BriefcaseBusiness /> },
          { title: 'Applications', href: '/applications', icon: <FileText /> },
        ];

      default:
        return [];
    }
  };

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          {getMenuItems(role).map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className=''
                isActive={pathname.startsWith(item.href)}
              >
                <Link href={item.href} className='flex items-center gap-2'>
                  {item.icon}
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default AppSidebarContent;
