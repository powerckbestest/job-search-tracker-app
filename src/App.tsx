import { useEffect } from 'react';
import { PlusCircle, Briefcase } from 'lucide-react';
import { Employer } from './types';
import EmployerCard from './components/EmployerCard';
import { EditEmployerCard } from './components/EditEmployerCard.tsx';
import { useLocalStorage } from 'usehooks-ts';
import { DownloadBackup } from './components/DownloadBackup.tsx';
import { UploadBackup } from './components/UploadBackup.tsx';
import { employersSelectors, employersSlice } from './model/employers.ts';
import { useAppDispatch } from './model/store.ts';
import { useSelector } from 'react-redux';
import {
  selectValueEditingEmployerId,
  selectValueIsAdding,
  valuesSlice,
} from './model/values.ts';

function App() {
  const dispatch = useAppDispatch();

  const [localStorageEmployers, , removeLocalStorageEmployers] =
    useLocalStorage<Employer[]>('jobSearchEmployers', []);

  const employers: Employer[] = useSelector(employersSelectors.selectAll);

  const isAdding = useSelector(selectValueIsAdding);
  const editingCardId = useSelector(selectValueEditingEmployerId);

  const setIsAdding = (isAdding: boolean) => {
    dispatch(valuesSlice.actions.setIsAdding(isAdding));
  };

  useEffect(() => {
    if (localStorageEmployers.length) {
      dispatch(employersSlice.actions.setEmployers(localStorageEmployers));
      removeLocalStorageEmployers();
    }
  }, [localStorageEmployers]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-4xl p-6">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="text-blue-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-800">Поиск работы</h1>
            </div>
            <UploadBackup />
            <DownloadBackup />
            <button
              data-testid="addEmployer"
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              <PlusCircle size={20} />
              Добавить работодателя
            </button>
          </div>
        </header>

        {(isAdding || editingCardId) && <EditEmployerCard />}

        <div className="space-y-4">
          {employers.map((employer) => {
            if (editingCardId === employer.id) {
              return <></>;
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
