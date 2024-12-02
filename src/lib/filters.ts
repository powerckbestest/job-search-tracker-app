import { Employer } from '@/types.ts';
import Fuse from 'fuse.js';
const fuseOptions = {
  // minMatchCharLength: 3,
  threshold: 0.4,
  // ignoreLocation: false,
  keys: ['companyName', 'hrName', 'description', 'interviews.notes'],
};

export const fuseFilterEmployersCurried =
  (filterValue: string) =>
  (employers: Employer[]): Employer[] => {
    const fuse = new Fuse(employers, fuseOptions);
    return fuse.search(filterValue)?.map((result) => result.item) || [];
  };
