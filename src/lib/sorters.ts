import dayjs from 'dayjs';
import { sortStates } from '@/model/values.ts';
import { Employer } from '@/types.ts';

export const dateSorterAsc = (a: Date, b: Date) =>
  dayjs(a).isAfter(dayjs(b)) ? 1 : -1;
export const dateSorterDesc = (a: Date, b: Date) =>
  dayjs(a).isBefore(dayjs(b)) ? 1 : -1;

export const sortByLastInterviewDate = (
  arr: Employer[],
  sortState: sortStates
): Employer[] => {
  if (sortState === 'none') {
    return arr;
  }

  if (sortState === 'asc') {
    return arr.sort((a, b) => {
      const aLastInterview =
        a.interviews
          .sort((a, b) =>
            dateSorterDesc(new Date(a?.date || ''), new Date(b?.date || ''))
          )
          .at(0) || null;
      const bLastInterview =
        b.interviews
          .sort((a, b) =>
            dateSorterDesc(new Date(a?.date || ''), new Date(b?.date || ''))
          )
          .at(0) || null;
      return dateSorterDesc(
        new Date(aLastInterview?.date || ''),
        new Date(bLastInterview?.date || '')
      );
    });
  }

  if (sortState === 'desc') {
    return arr.sort((a, b) => {
      const aLastInterview =
        a.interviews
          .sort((a, b) =>
            dateSorterDesc(new Date(a?.date || ''), new Date(b?.date || ''))
          )
          .at(0) || null;
      const bLastInterview =
        b.interviews
          .sort((a, b) =>
            dateSorterDesc(new Date(a?.date || ''), new Date(b?.date || ''))
          )
          .at(0) || null;
      return dateSorterAsc(
        new Date(aLastInterview?.date || ''),
        new Date(bLastInterview?.date || '')
      );
    });
  }

  return [];
};
