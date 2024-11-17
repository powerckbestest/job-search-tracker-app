import { useLocalStorage } from 'usehooks-ts';
import { Employer } from '../types';
import { HardDriveUpload } from 'lucide-react';

export const UploadBackup = () => {
  const [, setBackupData] = useLocalStorage<Employer[]>(
    'jobSearchEmployers',
    []
  );

  const uploadBackup = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target?.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const data: Employer[] = JSON.parse(e.target?.result as string);
          setBackupData(data);
          window.location.reload(); // Reload the page to reflect new data
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div>
      <button
        data-testid="downloadBackup"
        aria-label="Upload backup"
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        onClick={uploadBackup}
      >
        <HardDriveUpload />
        Upload backup
      </button>
    </div>
  );
};
