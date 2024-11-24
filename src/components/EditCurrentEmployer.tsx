import { FC } from 'react';
import { useAppDispatch } from '../model/store.ts';
import { valuesSlice } from '../model/values.ts';
import { Pencil } from 'lucide-react';
import { Employer } from '../types.ts';
import { Button } from '@/components/ui/button.tsx';

type EditCurrentEmployerProps = {
  employerId: Employer['id'];
};
export const EditCurrentEmployer: FC<EditCurrentEmployerProps> = ({
  employerId,
}) => {
  const dispatch = useAppDispatch();

  return (
    <Button
      size="icon"
      data-testid="editEmployer"
      onClick={() => {
        dispatch(valuesSlice.actions.setIsAdding(false));
        dispatch(valuesSlice.actions.setEditingEmployerId(employerId));
      }}
      variant="ghost"
      className="rounded-md px-3 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-50"
    >
      <Pencil />
    </Button>
  );
};
