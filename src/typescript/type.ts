export type ContractType = {
  id: number | string;
  title: string;
  value: string;
};

export type UserType = {
  fullName: string;
  email: string;
  password: string;
  role: string;

  appliedJobs: JobType[];
};

export type JobType = {
  _id?: string;
  company: string;
  position: string;
  contract: string;
  location: string;
};
