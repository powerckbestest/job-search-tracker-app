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
      <Button
        data-testid="addEmployer"
        onClick={() => setIsAdding(true)}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
      >
        <PlusCircle size={20} />
        Добавить работодателя
      </Button>
    </div>
  );
};
