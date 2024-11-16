import { defineConfig } from "cypress";
import pkg from 'cy-verify-downloads';
import {rmdir} from "fs";
const { verifyDownloadTasks } = pkg;

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', verifyDownloadTasks)
      on('task', {
            deleteFolder(folderName) {
              console.log('deleting folder %s', folderName)

              return new Promise((resolve, reject) => {
                rmdir(folderName, {maxRetries: 10, recursive: true}, (err) => {
                  if (err) {
                    console.error(err)
                    return reject(err)
                  }
                  resolve(null)
                })
              })
            },
          })
    },
    experimentalRunAllSpecs: true,
  },
});
