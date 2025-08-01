'use client';
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { createClient } from '@/utils/supabase/client';
import { User as UserType } from '@supabase/supabase-js';
import { EllipsisVertical, LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

interface AppSidebarFooterProps {
  user: UserType;
}

const AppSidebarFooter = ({ user }: AppSidebarFooterProps) => {
  const name =
    user?.user_metadata.first_name + ' ' + user?.user_metadata.last_name || '';

  const handleLogout = async () => {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Failed to log out. Please try again.');
      return;
    }

    toast.success('Logged out successfully.');
    redirect('/');
  };
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size='lg'
                className='group data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-secondary/30'
              >
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate text-sm leading-none font-semibold'>
                    {name}
                  </span>
                  <span className='truncate text-xs leading-4 font-normal'>
                    {user.email}
                  </span>
                </div>
                <EllipsisVertical className='ml-auto size-4' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
              side='right'
              align='end'
              sideOffset={4}
              alignOffset={30}
            >
              <DropdownMenuLabel className='p-0 font-normal'>
                <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-medium'>{name}</span>
                    <span className='truncate text-xs'>{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href='/profile'>
                    <User />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href='/settings'>
                    <Settings />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant='destructive'
                onClick={() => handleLogout()}
              >
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export default AppSidebarFooter;
