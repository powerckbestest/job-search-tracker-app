import {useLocalStorage} from "usehooks-ts";
import {Employer} from "../types.ts";
import {HardDriveDownload} from "lucide-react";


export const DownloadBackup = () => {

    const [backupData] = useLocalStorage<Employer[]>("jobSearchEmployers", []);

    const downloadBackup = () => {
        const blob = new Blob([JSON.stringify(backupData)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'job-search-tracker-backup.json';
        link.click();
    }

    return (
        <div>
            <button
                data-testid="downloadBackup"
                alt-text="Скачать резервную копию"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={downloadBackup}>
                <HardDriveDownload />
                Download backup
            </button>
        </div>
    );
};
