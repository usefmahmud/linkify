import React from 'react';
import { notFound } from 'next/navigation';
import { getJobById } from '@/api/jobs/get-job-by-id';
import JobDetailsView from '@/components/features/job-seeker/jobs/job-details-view';

interface JobPageProps {
  params: Promise<{ jobId: string }>;
}

const JobPage = async ({ params }: JobPageProps) => {
  const { jobId } = await params;

  const job = await getJobById(jobId);

  if (!job) {
    notFound();
  }

  return <JobDetailsView job={job} />;
};

export default JobPage;
