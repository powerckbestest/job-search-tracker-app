import { Settings as SettingsIcon } from 'lucide-react';
import { UploadBackup } from '@/components/UploadBackup.tsx';
import { DownloadBackup } from '@/components/DownloadBackup.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Button } from '@/components/ui/button.tsx';

export const Settings = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 hover:text-white"
          asChild
        >
          <Button variant="outline">
            <SettingsIcon />
            Настройки
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem className="flex justify-center">
            <UploadBackup />
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-center">
            <DownloadBackup />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
