import { Settings as SettingsIcon } from 'lucide-react';
import { UploadBackup } from '@/components/settings/UploadBackup.tsx';
import { DownloadBackup } from '@/components/settings/DownloadBackup.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useTranslation } from 'react-i18next';

export const Settings = () => {
  const { t } = useTranslation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button data-testid="settings">
          <SettingsIcon />
          {t('settings')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuItem className="flex justify-start">
          <UploadBackup />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-start">
          <DownloadBackup />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
