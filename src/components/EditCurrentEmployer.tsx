import { FC } from 'react';
import { useAppDispatch } from '../model/store.ts';
import { valuesSlice } from '../model/values.ts';
import { Pencil } from 'lucide-react';
import { Employer } from '../types.ts';

type EditCurrentEmployerProps = {
  employerId: Employer['id'];
};
export const EditCurrentEmployer: FC<EditCurrentEmployerProps> = ({
  employerId,
}) => {
  const dispatch = useAppDispatch();

  return (
    <button
      data-testid="editEmployer"
      onClick={() => {
        dispatch(valuesSlice.actions.setEditingEmployerId(employerId));
      }}
      className="rounded-md px-3 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-50"
    >
      <Pencil />
    </button>
  );
};
