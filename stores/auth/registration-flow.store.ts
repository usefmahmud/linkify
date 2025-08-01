import { SignupSchema } from '@/schemas/auth/signup.schema';
import { userRole } from '@/types/user';
import { create } from 'zustand';

type Steps = 'data' | 'role' | 'info';

interface RegistrationFlowStore {
  userData: SignupSchema | null;
  setUserData: (user: SignupSchema) => void;

  userRole: userRole | null;
  setUserRole: (role: userRole) => void;

  currentStep: Steps;
  setCurrentStep: (step: Steps) => void;
}

export const useRegistrationFlowStore = create<RegistrationFlowStore>(
  (set) => ({
    userData: null,
    setUserData: (user) => set({ userData: user }),

    userRole: null,
    setUserRole: (role) => set({ userRole: role }),

    currentStep: 'data',
    setCurrentStep: (step) => set({ currentStep: step }),
  })
);
