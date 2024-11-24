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

export const Settings = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button data-testid="settings">
            <SettingsIcon />
            Настройки
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
    </>
  );
};
