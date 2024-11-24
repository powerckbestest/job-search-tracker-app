import { Button } from '@/components/ui/button.tsx';
import { PlusCircle } from 'lucide-react';
import { useAppDispatch } from '@/model/store.ts';
import { valuesSlice } from '@/model/values.ts';

export const AddEmployer = () => {
  const dispatch = useAppDispatch();
  const setIsAdding = (isAdding: boolean) => {
    dispatch(valuesSlice.actions.setIsAdding(isAdding));
  };
  return (
    <div>
      <Button data-testid="addEmployer" onClick={() => setIsAdding(true)}>
        <PlusCircle size={20} />
        Добавить работодателя
      </Button>
    </div>
  );
};
