import { describe, it, expect } from 'vitest';
import { getLastInterviewFromEmployer } from '@/lib/utils.ts';
import { Employer } from '@/types.ts';
import { dateSorterAsc, dateSorterDesc } from '@/lib/sorters.ts';

describe('date sorters', () => {
  it('should sort asc', () => {
    const a = new Date('2020-01-01T10:00:00');
    const b = new Date('2021-01-01T10:00:00');
    expect(dateSorterAsc(a, b)).toBe(-1);
  });

  it('should sort desc', () => {
    const a = new Date('2020-01-01T10:00:00');
    const b = new Date('2021-01-01T10:00:00');
    expect(dateSorterDesc(a, b)).toBe(1);
  });
});

describe('get last interview', () => {
  it('should return null if no interviews', () => {
    const employer = {
      id: '1',
      companyName: 'testCompany',
      description: 'test',
      hrName: 'test',
      contacts: 'test',
      interviews: [],
      createdAt: '',
    };
    expect(getLastInterviewFromEmployer(employer)).toBeNull();
  });

  it('should return first if only one interview', () => {
    const employer = {
      companyName: 'СберКо',
      description: 'Финтех',
      hrName: 'Maша',
      contacts: '88005553535',
      id: '1731949159830',
      interviews: [
        {
          id: '1731949166205',
          date: '2022-03-04T10:00',
          notes: 'Знакомство c коммандой и оффер',
          status: 'accepted',
        },
      ],
      createdAt: '2024-11-18T16:59:19.830Z',
    };
    expect(getLastInterviewFromEmployer(employer as Employer)).toEqual(
      employer.interviews[0]
    );
  });

  it('should return last interview', () => {
    const employer = {
      id: '1',
      companyName: 'testCompany',
      description: 'test',
      hrName: 'test',
      contacts: 'test',
      createdAt: '',
      interviews: [
        {
          id: '1',
          date: '2020-01-01T10:00:00',
          status: 'completed',
          notes: 'test',
        },
        {
          id: '2',
          date: '2021-01-02T10:00:00',
          status: 'completed',
          notes: 'test',
        },
      ],
    };
    expect(getLastInterviewFromEmployer(employer as Employer)).toEqual(
      employer.interviews[1]
    );
  });
});
