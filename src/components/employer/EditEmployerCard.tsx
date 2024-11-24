import React, { FC, useState } from 'react';
import { Employer } from '../../types.ts';
import { RootState, useAppDispatch } from '../../model/store.ts';
import {
  selectValueEditingEmployerId,
  valuesSlice,
} from '../../model/values.ts';
import { employersSelectors, employersSlice } from '../../model/employers.ts';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button.tsx';

const newEmployerTemp: Employer = {
  companyName: '',
  description: '',
  hrName: '',
  contacts: '',
  id: '',
  interviews: [],
  createdAt: '',
};

export const EditEmployerCard: FC = () => {
  const dispatch = useAppDispatch();
  const foundEmployerId = useSelector(selectValueEditingEmployerId);
  const foundEmployerById = useSelector((state: RootState) =>
    employersSelectors.selectById(state, foundEmployerId)
  );

  const [currentEmployer, setCurrentEmployer] = useState<Employer>(
    foundEmployerById || newEmployerTemp
  );

  const handleCancelEditEmployer = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(valuesSlice.actions.resetEditingEmployerId());
    dispatch(valuesSlice.actions.setIsAdding(false));
  };

  const handleSubmitEmployer = (e: React.FormEvent) => {
    e.preventDefault();

    if (foundEmployerId) {
      dispatch(employersSlice.actions.upsertEmployer(currentEmployer));
      dispatch(valuesSlice.actions.resetEditingEmployerId());
      dispatch(valuesSlice.actions.setIsAdding(false));
      return;
    }

    const employer: Employer = {
      ...currentEmployer,
      id: Date.now().toString(),
      interviews: [],
      createdAt: new Date().toISOString(),
    };
    dispatch(employersSlice.actions.upsertEmployer(employer));
    dispatch(valuesSlice.actions.setIsAdding(false));
    return employer;
  };

  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
      <form onSubmit={handleSubmitEmployer} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Название компании
          </label>
          <input
            type="text"
            data-testid="companyName"
            value={currentEmployer?.companyName || ''}
            onChange={(e) =>
              setCurrentEmployer({
                ...currentEmployer,
                companyName: e.target.value,
              })
            }
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Описание
          </label>
          <textarea
            data-testid="description"
            value={currentEmployer?.description || ''}
            onChange={(e) =>
              setCurrentEmployer({
                ...currentEmployer,
                description: e.target.value,
              })
            }
            className="w-full rounded-md border px-3 py-2"
            rows={3}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Имя HR
          </label>
          <input
            data-testid="hrName"
            type="text"
            value={currentEmployer?.hrName || ''}
            onChange={(e) =>
              setCurrentEmployer({ ...currentEmployer, hrName: e.target.value })
            }
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Контакты
          </label>
          <input
            data-testid="contacts"
            type="text"
            value={currentEmployer?.contacts || ''}
            onChange={(e) =>
              setCurrentEmployer({
                ...currentEmployer,
                contacts: e.target.value,
              })
            }
            className="w-full rounded-md border px-3 py-2"
            placeholder="Email, телефон, etc."
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            data-testid="cancel"
            type="button"
            onClick={handleCancelEditEmployer}
            className="rounded-md px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Отмена
          </Button>
          <Button
            data-testid="save"
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
};
