// types.ts
export interface ProjectDetails {
  name: string;
  description: string;
  features: string[];
  frontend: string;
  backend: string;
  database: string;
  deployment: string;
}

export interface Connection {
  target: string;
  label: string;
}
