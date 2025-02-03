import { Employer } from '@/types.ts';
import { FC, useState } from 'react';
import { RootState, useAppDispatch } from '@/model/store.ts';
import { employersSelectors, employersSlice } from '@/model/employers.ts';
import { Trash2, Ban } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog.tsx';
import { useSelector } from 'react-redux';

type DeleteCurrentEmployerProps = {
  employerId: Employer['id'];
};
export const DeleteCurrentEmployer: FC<DeleteCurrentEmployerProps> = ({
  employerId,
}) => {
  const dispatch = useAppDispatch();
  const [, setIsOpen] = useState<boolean>(false);
  const employer = useSelector((state: RootState) =>
    employersSelectors.selectById(state, employerId)
  );
  const { t } = useTranslation();

  return (
    <AlertDialog>
      <AlertDialogTrigger
        data-testid="deleteEmployer"
        onClick={() => {
          setIsOpen(true);
        }}
        className="h-10 w-10 rounded-md px-3 py-1 text-sm text-red-600 transition-colors hover:bg-red-50"
      >
        <Trash2 size={16} />
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-lg border-2 border-gray-200 bg-white shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>{t('dialog.delete')} {employer?.companyName}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('dialog.deleteEmployerConfirmation')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            data-testid="confirm-cancel"
            onClick={() => {
              setIsOpen(false);
            }}
            className="direction-row flex items-center gap-2 rounded-md bg-blue-500 px-3 py-2 text-sm text-white transition-colors hover:bg-blue-700 hover:text-white"
          >
            <Ban />
            {t('common.no')}
          </AlertDialogCancel>
          <AlertDialogAction
            data-testid="confirm-delete"
            onClick={() => {
              dispatch(employersSlice.actions.deleteEmployer(employerId));
              setIsOpen(false);
            }}
            className="direction-row flex items-center gap-2 rounded-md bg-red-500 px-3 py-2 text-sm text-white transition-colors hover:bg-red-700"
          >
            <Trash2 /> {t('common.yes')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
