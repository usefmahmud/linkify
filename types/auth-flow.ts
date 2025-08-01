export const AuthFlowSteps = ['data', 'role'] as const;
export type AuthFlowStep = (typeof AuthFlowSteps)[number];
