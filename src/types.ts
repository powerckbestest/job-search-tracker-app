export interface Interview {
  id: string;
  date: string;
  notes: string;
  status: 'pending' | 'completed' | 'rejected' | 'accepted';
}

export interface Employer {
  id: string;
  companyName: string;
  description: string;
  hrName: string;
  contacts: string;
  interviews: Interview[];
  createdAt: string;
}