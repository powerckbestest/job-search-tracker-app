import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
