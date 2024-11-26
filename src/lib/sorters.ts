import dayjs from 'dayjs';
import { sortStates } from '@/model/values.ts';
import { Employer } from '@/types.ts';
import { getLastInterviewFromEmployer } from '@/lib/utils.ts';

export const dateSorterAsc = (a: Date, b: Date) =>
  dayjs(a).isAfter(dayjs(b)) ? 1 : -1;
export const dateSorterDesc = (a: Date, b: Date) =>
  dayjs(a).isAfter(dayjs(b)) ? -1 : 1;

export const sortByLastInterviewDate = (
  arr: Employer[],
  sortState: sortStates
): Employer[] => {
  if (sortState === 'none') {
    return arr;
  }

  if (arr.length < 2) {
    return arr;
  }

  const arrToSort = [...arr];

  if (sortState === 'asc') {
    return arrToSort.sort((a, b) => {
      const aLastInterview = getLastInterviewFromEmployer(a);
      const bLastInterview = getLastInterviewFromEmployer(b);

      return dateSorterDesc(
        new Date(aLastInterview?.date || ''),
        new Date(bLastInterview?.date || '')
      );
    });
  }

  if (sortState === 'desc') {
    return arrToSort.sort((a, b) => {
      const aLastInterview = getLastInterviewFromEmployer(a);
      const bLastInterview = getLastInterviewFromEmployer(b);
      return dateSorterAsc(
        new Date(aLastInterview?.date || ''),
        new Date(bLastInterview?.date || '')
      );
    });
  }

  return [];
};
