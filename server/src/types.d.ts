// import { Request } from "express";

interface CompanyEvent {
  data: any;
  name: string;
  createdAt: Date;
}

interface Company {
  name: string;
  email: string;
  phone?: string;
  otherContact?: string[];
  hrName?: string;
  stacks?: string[];
  applied?: boolean;
  appliedAt?: Date;
  createdAt?: Date;
  responded?: boolean;
  respondedAt?: Date;
  updatedAt?: Date;
  expectedSalary?: string;
  events?: CompanyEvent[];
}

interface User {
  uid?: string;
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  portfolio?: string;
  expectedSalary?: string;
  app_email?: string;
  app_passw?: string;
  deleted?: boolean;
  disabled?: boolean;
  lastRefresh?: Date;
  emailVerified?: boolean;
  phoneVerified?: boolean;
}

interface JobEvent {
  type: string;
  user: User;
  date: Date;
  company: Company;
  template?: string;
  error: any;
}

interface Tokens {
  value: string;
  uid: string;
  lastRefresh: Date;
  refreshCount: number;
  userAgent: string;
  typeofToken: string;
  createdAt: Date;
  updatedAt: Date;
}

// RESPONSES
interface UserDataResponse {
  email: string;
  uid: string;
  name: string;
  phone: string;
  portfolio: string;
  expectedSalary: string;
  disabled: boolean;
  hasAppEmail: boolean;
  hasAppPassword: boolean;
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
}
