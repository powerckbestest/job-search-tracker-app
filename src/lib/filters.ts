import { Employer } from '@/types.ts';
import Fuse from 'fuse.js';
const fuseOptions = {
  shouldSort: true,
  minMatchCharLength: 3,
  threshold: 0.65,
  ignoreLocation: false,
  keys: ['companyName', 'hrName', 'description', 'interviews.notes'],
};

export const fuseFilterEmployersCurried =
  (filterValue: string) =>
  (employers: Employer[]): Employer[] => {
    const fuse = new Fuse(employers, fuseOptions);
    return fuse.search(filterValue)?.map((result) => result.item) || [];
  };
