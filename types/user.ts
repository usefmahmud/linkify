export type userRole = 'employer' | 'job-seeker';

export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: userRole;
}
