import { useAppDispatch } from '@/model/store.ts';
import { useLocalStorage } from 'usehooks-ts';
import { Employer } from '@/types.ts';
import { useSelector } from 'react-redux';
import { employersSelectors, employersSlice } from '@/model/employers.ts';
import {
  selectValueEditingEmployerId,
  selectValueIsAdding,
  selectValueSortState,
} from '@/model/values.ts';
import { EditEmployerCard } from '@/components/employer/EditEmployerCard.tsx';
import EmployerCard from '@/components/employer/EmployerCard.tsx';
import { useEffect, useState } from 'react';
import { AddEmployer } from '@/components/employer/AddEmployer.tsx';
import { SortButton } from '@/components/employer/SortButton.tsx';
import { chain } from '@/lib/utils.ts';
import { sortByLastInterviewDate } from '@/lib/sorters.ts';

export const EmployersWidget = () => {
  const dispatch = useAppDispatch();

  const [localStorageEmployers, , removeLocalStorageEmployers] =
    useLocalStorage<Employer[]>('jobSearchEmployers', []);

  const [employers, setEmployers] = useState<Employer[]>([]);
  const sortState = useSelector(selectValueSortState);

  useEffect(() => {
    if (localStorageEmployers.length) {
      dispatch(employersSlice.actions.setEmployers(localStorageEmployers));
      removeLocalStorageEmployers();
    }
  }, [localStorageEmployers]);

  const chainedEmployers = chain<Employer>(
    useSelector(employersSelectors.selectAll) || []
  ).apply((arr: Employer[]) =>
    sortByLastInterviewDate(arr, sortState.lastInterviewDate)
  );

  useEffect(() => {
    setEmployers(chainedEmployers.value);
  }, [chainedEmployers]);

  const isAdding = useSelector(selectValueIsAdding);
  const editingCardId = useSelector(selectValueEditingEmployerId);
  return (
    <>
      <div className="full-width mb-4 flex justify-end gap-2">
        <SortButton
          name="Last interview date"
          filterName="lastInterviewDate"
          initialState="none"
        />
        <AddEmployer />
      </div>

      {isAdding && <EditEmployerCard />}

      <div className="space-y-4">
        {employers.map((employer) => {
          if (editingCardId === employer.id) {
            return <EditEmployerCard />;
          }
          return <EmployerCard key={employer.id} employer={employer} />;
        })}

        {employers.length === 0 && !isAdding && (
          <div className="py-12 text-center">
            <p className="text-gray-500">Нет добавленных работодателей</p>
          </div>
        )}
      </div>
    </>
  );
};
