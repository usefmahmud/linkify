import { parseAsInteger, parseAsString, parseAsStringEnum } from 'nuqs';
import { Constants } from './database.types';

export const jobSearchParamsSchema = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(20),
  search: parseAsString.withDefault(''),
  jobLevel: parseAsStringEnum([
    ...Constants.public.Enums.job_level,
  ]),
  jobType: parseAsStringEnum([...Constants.public.Enums.job_type]),
  workType: parseAsStringEnum([
    ...Constants.public.Enums.work_type,
  ]),
  location: parseAsString.withDefault(''),
  salaryMin: parseAsInteger,
  salaryMax: parseAsInteger,
};

export type JobSearchParams = {
  page: number;
  limit: number;
  search: string;
  jobLevel: (typeof Constants.public.Enums.job_level)[number] | undefined;
  jobType: (typeof Constants.public.Enums.job_type)[number] | undefined;
  workType: (typeof Constants.public.Enums.work_type)[number] | undefined;
  location: string | undefined;
  salaryMin: number | undefined;
  salaryMax: number | undefined;
};

export type SetJobSearchParams = (
  params:
    | Partial<JobSearchParams>
    | ((current: JobSearchParams) => Partial<JobSearchParams>)
) => void;
