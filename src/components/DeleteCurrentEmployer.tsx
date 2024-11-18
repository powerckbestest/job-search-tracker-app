import { Employer } from '../types.ts';
import { FC } from 'react';
import { useAppDispatch } from '../model/store.ts';
import { employersSlice } from '../model/employers.ts';
import { Trash2 } from 'lucide-react';

type DeleteCurrentEmployerProps = {
  employerId: Employer['id'];
};
export const DeleteCurrentEmployer: FC<DeleteCurrentEmployerProps> = ({
                                                                        employerId,
                                                                      }) => {
  const dispatch = useAppDispatch();

  return (
    <button
      data-testid="deleteEmployer"
      onClick={() => {
        dispatch(employersSlice.actions.deleteEmployer(employerId));
      }}
      className="rounded-md px-3 py-1 text-sm text-red-600 transition-colors hover:bg-red-50"
    >
      <Trash2 />
    </button>
  );
};
