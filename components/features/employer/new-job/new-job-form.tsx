'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { newJobSchema, NewJobSchema } from '@/schemas/jobs/new-job.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const NewJobForm = () => {
  const form = useForm<NewJobSchema>({
    resolver: zodResolver(newJobSchema),
    defaultValues: {
      jobTitle: '',
      department: '',
      jobLocation: '',
      jobType: undefined,
      workType: undefined,
      description: '',
      salary: 0,
      jobLevel: undefined,
      skills: [],
    },
  });

  const handleFormSubmit = async (data: NewJobSchema) => {
    // Handle form submission
  };

  return (
    <Form {...form}>
      <form
        className='flex w-full max-w-2xl flex-col gap-8'
        onSubmit={form.handleSubmit(handleFormSubmit)}
      >
        <FormField
          control={form.control}
          name='jobTitle'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Enter job title' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex items-start gap-6'>
          <FormField
            control={form.control}
            name='department'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select Department' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='frontend'>Frontend</SelectItem>
                      <SelectItem value='backend'>Backend</SelectItem>
                      <SelectItem value='fullstack'>Fullstack</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='jobLocation'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Job Location</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Cairo' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex items-start gap-6'>
          <FormField
            control={form.control}
            name='jobType'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Job Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select Job Type' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='full-time'>Full Time</SelectItem>
                      <SelectItem value='part-time'>Part Time</SelectItem>
                      <SelectItem value='freelance'>Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='workType'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Work Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select Work Type' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='on-site'>On Site</SelectItem>
                      <SelectItem value='hybrid'>Hybrid</SelectItem>
                      <SelectItem value='remote'>Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='Write your job description here'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex items-start gap-6'>
          <FormField
            control={form.control}
            name='salary'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    placeholder='Enter salary (USD)'
                    className='w-full'
                    min={0}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='jobLevel'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Job Level</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select Job Level' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='entry-level'>Entry Level</SelectItem>
                      <SelectItem value='junior'>Junior</SelectItem>
                      <SelectItem value='mid-level'>Mid Level</SelectItem>
                      <SelectItem value='senior'>Senior</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex justify-center'>
          <Button
            className='px-12 font-semibold'
            disabled={form.formState.isSubmitting}
          >
            Post Job
            {form.formState.isSubmitting && (
              <span>
                <Loader2 className='animate-spin' />
              </span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewJobForm;
