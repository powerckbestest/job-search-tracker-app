import {HardDriveDownload} from "lucide-react";
import {persistor} from "../model/store.ts";


export const DownloadBackup = () => {


    const downloadBackup = () => {
        persistor.pause()
        const backupData = localStorage.getItem('persist:job-search-tracker-app-state') || "{}";
        const blob = new Blob([backupData], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download =`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} job-search-tracker-backup.json`;
        link.click();
        persistor.persist()
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
