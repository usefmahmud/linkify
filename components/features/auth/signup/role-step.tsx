import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRegistrationFlowStore } from '@/stores/auth/registration-flow.store';
import { AuthFlowStep } from '@/types/auth-flow';
import { userRole } from '@/types/user';
import { BriefcaseBusiness, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const RoleStep = () => {
  const setUserRole = useRegistrationFlowStore((state) => state.setUserRole);
  const userRole = useRegistrationFlowStore((state) => state.userRole);

  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState<userRole>(
    userRole || 'job-seeker'
  );

  const handleSubmit = () => {
    setUserRole(selectedRole);
    toast.success('Signed Up Successfully');
    router.push('/auth/login');
  };

  return (
    <div className='flex w-sm flex-col items-center gap-6'>
      <div className='flex w-full gap-6'>
        <div
          className={cn(
            'flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border p-10 text-gray-500 transition-colors duration-100',
            selectedRole === 'job-seeker' && 'border-black text-black'
          )}
          onClick={() => setSelectedRole('job-seeker')}
          role='button'
        >
          <BriefcaseBusiness className='size-8' />
          <p className='font-bold'>Job Seeker</p>
        </div>

        <div
          className={cn(
            'flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border p-10 text-gray-500 transition-colors duration-100',
            selectedRole === 'employer' && 'border-black text-black'
          )}
          onClick={() => setSelectedRole('employer')}
          role='button'
        >
          <Building2 className='size-8' />
          <p className='font-bold'>Employer</p>
        </div>
      </div>

      <div className='justify-center'>
        <Button onClick={handleSubmit} className='px-10'>
          Finish
        </Button>
      </div>
    </div>
  );
};

export default RoleStep;
