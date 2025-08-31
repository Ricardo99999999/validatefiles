const fs = require('fs');

const requiredFiles = [
  'README.md',
  'index.js',
  'package.json',
  'prueba.txt',
  'src/prueba2.txt'
];

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
