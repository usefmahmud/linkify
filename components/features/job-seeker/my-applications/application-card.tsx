import React from 'react';
import {
  MapPin,
  Briefcase,
  Building2,
  Calendar,
  DollarSign,
  CircleDollarSign,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ApplicationWithJob } from '@/api/applications/get-my-applications';
import Link from 'next/link';

interface ApplicationCardProps {
  application: ApplicationWithJob;
}

const ApplicationCard = ({ application }: ApplicationCardProps) => {
  const job = application.jobs;

  if (!job) {
    return null;
  }

  const formatJobLevel = (level: string) => {
    return level
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatJobType = (type: string) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatWorkType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatApplicationDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className='relative rounded-lg border bg-white p-6 transition-all hover:shadow-md'>
      <div className='absolute top-4 right-4'>
        <Badge
          variant='secondary'
          className={`border ${getStatusColor(application.status)} font-medium`}
        >
          {application.status.charAt(0).toUpperCase() +
            application.status.slice(1)}
        </Badge>
      </div>

      <Link href={`/jobs/${job.id}`} className='block'>
        <div className='flex flex-col gap-4'>
          <div>
            <h3 className='text-xl font-semibold'>{job.title}</h3>
          </div>

          <div className='flex flex-wrap items-center gap-4 text-sm text-gray-600'>
            <div className='flex items-center gap-1'>
              <MapPin className='h-4 w-4' />
              <span>{job.location}</span>
            </div>
            <div className='flex items-center gap-1'>
              <CircleDollarSign className='h-4 w-4' />
              <span>{job.salary.toLocaleString()}</span>
            </div>
            <div className='flex items-center gap-1'>
              <Calendar className='h-4 w-4' />
              <span>
                Applied {formatApplicationDate(application.created_at)}
              </span>
            </div>
          </div>

          <div className='flex flex-wrap gap-2'>
            <Badge variant='outline' className='text-xs'>
              {formatJobLevel(job.job_level)}
            </Badge>
            <Badge variant='outline' className='text-xs'>
              {formatJobType(job.job_type)}
            </Badge>
            <Badge variant='outline' className='text-xs'>
              {formatWorkType(job.work_type)}
            </Badge>
          </div>

          <p className='line-clamp-2 text-sm text-gray-600'>
            {job.description}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ApplicationCard;
