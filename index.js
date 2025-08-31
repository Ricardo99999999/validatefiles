const fs = require('fs');

// We read the file containing the filename
const filesListPath = 'filesExistance.txt';

if (!fs.existsSync(filesListPath)) {
  console.error(`File not found ${filesListPath}`);
  process.exit(1);
}

// Load and clean the list. Works in sigle files and folders
const requiredFiles = fs.readFileSync(filesListPath, 'utf8')
  .split('\n')                // Split into lines
  .map(line => line.trim())   // Trim spaces
  .filter(line => line !== '' && !line.startsWith('#')); // Ignore empty lines or comments

//If yo want use array instead of dynamic file
/*const requiredFiles = [
  'README.md',
  'index.js',
  'package.json',
  'prueba.txt',
  'src/prueba2.txt'
];*/

let missing = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    missing.push(file);
  }
}

if (missing.length > 0) {
  console.error("Mandatory files are missing:", missing.join(', '));
  process.exit(1); // Program or pipeline fails
} else {
  console.log("All mandatory files are present");
  process.exit(0);
}
