import { Constants } from '@/types/database.types';
import z from 'zod';

export const newJobSchema = z.object({
  jobTitle: z
    .string()
    .min(1, 'Job title is required')
    .max(100, 'Job title must be less than 100 characters'),

  department: z.string().min(1, 'Department is required'),

  jobType: z.enum(Constants.public.Enums.job_type, {
    error: 'Job type is required',
  }),

  workType: z.enum(Constants.public.Enums.work_type, {
    error: 'Work type is required',
  }),

  jobLocation: z
    .string()
    .min(1, 'Job location is required')
    .max(200, 'Location must be less than 200 characters'),

  salary: z.number().min(1, 'Salary must be greater than 0'),

  description: z
    .string()
    .min(50, 'Description must be at least 50 characters')
    .max(5000, 'Description must be less than 5000 characters'),

  jobLevel: z.enum(Constants.public.Enums.job_level, {
    error: 'Job level is required',
  }),
});

export type NewJobSchema = z.infer<typeof newJobSchema>;
