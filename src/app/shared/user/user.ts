export interface MembershipSummary {
  projectId: number;
  projectName: number;
}

export interface User {
  name: string;
  projects: MembershipSummary[];
}
