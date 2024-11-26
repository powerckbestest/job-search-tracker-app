import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Employer, Interview } from '@/types.ts';
import { dateSorterDesc } from '@/lib/sorters.ts';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Chain<T> = {
  value: T[];
  apply: (fn: (arr: T[]) => T[]) => Chain<T>;
};

export const chain = <T>(arr: T[]): Chain<T> => ({
  value: arr,
  apply: (fn: (arr: T[]) => T[]) => chain(fn(arr)),
});

export const getLastInterviewFromEmployer = (
  employer: Employer
): Interview | null => {
  const interviews = employer?.interviews;

  if (!interviews) return null;

  if (interviews?.length === 0) return null;

  if (interviews?.length === 1) return interviews[0];

  const valuesToSort = [...interviews];

  return (
    valuesToSort
      ?.sort((a, b) =>
        dateSorterDesc(new Date(a?.date || ''), new Date(b?.date || ''))
      )
      .at(0) || null
  );
};
