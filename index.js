const fs = require('fs');

// Leemos el fichero con los nombres de los archivos
const filesListPath = 'filesExistance.txt';

if (!fs.existsSync(filesListPath)) {
  console.error(`❌ No se encuentra el fichero ${filesListPath}`);
  process.exit(1);
}

// Cargamos y limpiamos la lista
//Works in sigle files and folders
const requiredFiles = fs.readFileSync(filesListPath, 'utf8')
  .split('\n')                // dividimos por líneas
  .map(line => line.trim())   // quitamos espacios
  .filter(line => line !== '' && !line.startsWith('#')); // ignoramos vacías o comentarios

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
  console.error("❌ Faltan archivos obligatorios:", missing.join(', '));
  process.exit(1); // ⚠️ Esto hace fallar la pipeline
} else {
  console.log("✅ Todos los archivos obligatorios existen.");
  process.exit(0);
}
