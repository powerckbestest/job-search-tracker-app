import { HardDriveDownload } from 'lucide-react';
import { persistor } from '@/model/store.ts';

import { Button } from '@/components/ui/button.tsx';
import { useTranslation } from 'react-i18next';

export const DownloadBackup = () => {
  const { t } = useTranslation();
  const downloadBackup = () => {
    persistor.pause();
    const backupData =
      localStorage.getItem('persist:job-search-tracker-app-state') || '{}';
    const blob = new Blob([backupData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} job-search-tracker-backup.json`;
    link.click();
    persistor.persist();
  };

  return (
    <Button
      variant="ghost"
      data-testid="downloadBackup"
      alt-text="Скачать резервную копию"
      onClick={downloadBackup}
    >
      <HardDriveDownload />
      {t('downloadBackup')}
    </Button>
  );
};
