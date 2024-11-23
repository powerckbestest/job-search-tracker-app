import { Employer } from '../types.ts';
import  { FC, useState } from 'react';
import { useAppDispatch } from '../model/store.ts';
import { employersSlice } from '../model/employers.ts';
import { Trash2, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
type DeleteCurrentEmployerProps = {
  employerId: Employer['id'];
};
export const DeleteCurrentEmployer: FC<DeleteCurrentEmployerProps> = ({
  employerId,
}) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        variant="ghost"
        data-testid="deleteEmployer"
        onClick={() => {
          setIsOpen(true);
        }}
        className="rounded-md px-3 py-1 text-sm text-red-600 transition-colors hover:bg-red-50"
      >
        <Trash2 />
      </Button>
      <dialog
        className="rounded-lg border-2 border-gray-200 bg-white shadow-lg"
        open={isOpen}
      >
        <div className="p-4 text-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Вы уверены, что хотите удалить этого работодателя?
          </h3>
          <div className="direction-row mt-2 flex items-center justify-between gap-2">
            <Button
              data-testid="confirm-cancel"
              onClick={() => {
                setIsOpen(false);
              }}
              className="direction-row flex items-center gap-2 rounded-md bg-blue-500 px-3 py-2 text-sm text-white transition-colors hover:bg-blue-700"
            >
              <Ban />
              Отмена
            </Button>
            <Button
              data-testid="confirm-delete"
              onClick={() => {
                dispatch(employersSlice.actions.deleteEmployer(employerId));
                setIsOpen(false);
              }}
              className="direction-row flex items-center gap-2 rounded-md bg-red-500 px-3 py-2 text-sm text-white transition-colors hover:bg-red-700"
            >
              <Trash2 /> Удалить
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
};
