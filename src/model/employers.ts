// https://redux-toolkit.js.org/api/createEntityAdapter
import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import { Employer, Interview } from '../types.ts';
import { RootState } from './store.ts';

const employersAdapter = createEntityAdapter<Employer, Employer['id']>({
  selectId: (e: Employer) => e.id,
  sortComparer: (a: Employer, b: Employer) => b.id.localeCompare(a.id),
});

export const employersSlice = createSlice({
  name: 'employers',
  initialState: employersAdapter.getInitialState(),
  reducers: {
    addEmployer: employersAdapter.addOne,
    updateEmployer: employersAdapter.updateOne,
    upsertEmployer: employersAdapter.upsertOne,
    deleteEmployer: employersAdapter.removeOne,
    setEmployers: employersAdapter.setAll,
    resetEmployers: employersAdapter.removeAll,
  },
});

export const employersSelectors = employersAdapter.getSelectors(
  (state: RootState) => state.employers
);


export const selectInterviewsByEmployerId = (id: Employer['id'])=> createSelector(
  (state:RootState):Employer => employersSelectors.selectById(state, id),
  (s ) => s.interviews)

export type CalendarInterview = {
  companyName: string;
} & Interview

export const selectCalendarInterviews = createSelector(employersSelectors.selectAll,
  (s) => s.reduce((acc:CalendarInterview[], company:Employer): CalendarInterview[] => {
    const interviews = company.interviews.map(interview => ({
      ...interview,
      companyName: company.companyName
    }));
    return [...acc, ...interviews];
  }, [])
);

export const selectInterviews = createSelector(
  employersSelectors.selectAll,
  (s) => s.flatMap((company:Employer) => company.interviews))

export const selectInterviewsInDateRange = (dateFrom: Date, dateTo: Date) => createSelector(
  selectInterviews,
  (s) => s.filter((interview) => new Date(interview.date) >= dateFrom && new Date(interview.date) <= dateTo)
)
