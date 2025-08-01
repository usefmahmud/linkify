export const AuthFlowSteps = ['data', 'role', 'info'] as const;
export type AuthFlowStep = (typeof AuthFlowSteps)[number];