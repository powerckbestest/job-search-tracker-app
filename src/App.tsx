import { Employer } from './types';
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { useAppDispatch } from '@/model/store.ts';
import { useSelector } from 'react-redux';
import EmployerCard from '@/components/employer/EmployerCard.tsx';
import {
  selectValueEditingEmployerId,
  selectValueIsAdding,
} from './model/values.ts';
import { Toolbar } from '@/components/layout/Toolbar.tsx';
import { employersSelectors, employersSlice } from '@/model/employers.ts';

import { MyCalendar } from './components/calendar/Calendar.tsx';
import { EditEmployerCard } from './components/employer/EditEmployerCard.tsx';



function App() {
  const dispatch = useAppDispatch();

  const [localStorageEmployers, , removeLocalStorageEmployers] =
    useLocalStorage<Employer[]>('jobSearchEmployers', []);

  const employers: Employer[] = useSelector(employersSelectors.selectAll);

  const isAdding = useSelector(selectValueIsAdding);
  const editingCardId = useSelector(selectValueEditingEmployerId);

  useEffect(() => {
    if (localStorageEmployers.length) {
      dispatch(employersSlice.actions.setEmployers(localStorageEmployers));
      removeLocalStorageEmployers();
    }
  }, [localStorageEmployers]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-4xl p-6">
        <Toolbar />

        {isAdding && <EditEmployerCard />}

        <MyCalendar />

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
      </div>
    </div>
  );
}

export default App;
