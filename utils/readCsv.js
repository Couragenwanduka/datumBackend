import fs from 'fs';
import csv from 'csv-parser';

export const readCsv = async (file) => {
  const results = [];

  // Return a promise that resolves with the CSV data
  await new Promise((resolve, reject) => {
    fs.createReadStream(file)
      .pipe(csv())
      .on('data', (row) => {
        results.push(row);
      })
      .on('end', () => {
        resolve();
      })
      .on('error', (error) => {
        reject(error);
      });
  });

  return results;
};

