import dayjs from 'dayjs';

export const dateSorterAsc = (a: Date, b: Date) =>
  dayjs(a).isAfter(dayjs(b)) ? 1 : -1;
export const dateSorterDesc = (a: Date, b: Date) =>
  dayjs(a).isBefore(dayjs(b)) ? 1 : -1;
