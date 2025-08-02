import z from 'zod';

export const newJobSchema = z.object({
  jobTitle: z
    .string()
    .min(1, 'Job title is required')
    .max(100, 'Job title must be less than 100 characters'),

  department: z.string().min(1, 'Department is required'),

  jobType: z.enum(['full-time', 'part-time', 'freelance'], {
    error: 'Job type is required',
  }),

  workType: z.enum(['remote', 'on-site', 'hybrid'], {
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

  skills: z
    .array(z.string())
    .min(1, 'At least one skill is required')
    .max(20, 'Maximum 20 skills allowed'),

  jobLevel: z.enum(['entry-level', 'junior', 'mid-level', 'senior'], {
    error: 'Job level is required',
  }),
});

export type NewJobSchema = z.infer<typeof newJobSchema>;
