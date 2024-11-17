import React, { FC, useState } from 'react';
import { Employer } from '../types.ts';

type EditEmployerCardProps = {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  employers: Employer[];
  setEmployers: React.Dispatch<React.SetStateAction<Employer[]>>;
  editCardId: string | null;
  setEditCardId: React.Dispatch<React.SetStateAction<string | null>>;
};

export const EditEmployerCard: FC<EditEmployerCardProps> = ({
  setIsAdding,
  employers,
  setEmployers,
  editCardId,
  setEditCardId,
}) => {
  const [editedEmployer, setEditedEmployer] = useState<Employer>(
    getEditedEmployer(employers, editCardId)
  );

  const handleCancelEditEmployer = (e: React.FormEvent) => {
    e.preventDefault();
    setEditCardId(null);
    setIsAdding(false);
  };

  const handleEditEmployer = (e: React.FormEvent) => {
    e.preventDefault();

    if (editCardId !== null) {
      const filteredEditedEmployers = employers.filter(
        (employer: Employer) => employer.id !== editCardId
      );
      setEmployers([editedEmployer, ...filteredEditedEmployers]);
      setEditCardId(null);
      setIsAdding(false);
      return;
    }

    const employer: Employer = {
      ...editedEmployer,
      id: Date.now().toString(),
      interviews: [],
      createdAt: new Date().toISOString(),
    };
    setEmployers([employer, ...employers]);
    setIsAdding(false);
    return employer;
  };

  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
      <form onSubmit={handleEditEmployer} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Название компании
          </label>
          <input
            type="text"
            data-testid="companyName"
            value={editedEmployer?.companyName || ''}
            onChange={(e) =>
              setEditedEmployer({
                ...editedEmployer,
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
            value={editedEmployer?.description || ''}
            onChange={(e) =>
              setEditedEmployer({
                ...editedEmployer,
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
            value={editedEmployer?.hrName || ''}
            onChange={(e) =>
              setEditedEmployer({ ...editedEmployer, hrName: e.target.value })
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
            value={editedEmployer?.contacts || ''}
            onChange={(e) =>
              setEditedEmployer({ ...editedEmployer, contacts: e.target.value })
            }
            className="w-full rounded-md border px-3 py-2"
            placeholder="Email, телефон, etc."
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            data-testid="cancel"
            type="button"
            onClick={handleCancelEditEmployer}
            className="rounded-md px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Отмена
          </button>
          <button
            data-testid="save"
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
};

const getEditedEmployer = (
  employers: Employer[],
  editCardId: string | null
) => {
  const newEmployerTemp: Employer = {
    companyName: '',
    description: '',
    hrName: '',
    contacts: '',
    id: '',
    interviews: [],
    createdAt: '',
  };

  if (editCardId) {
    const foundEmployer = employers.find((emp) => emp.id === editCardId);
    if (!foundEmployer) {
      return newEmployerTemp;
    }
    return foundEmployer;
  }
  return newEmployerTemp;
};
