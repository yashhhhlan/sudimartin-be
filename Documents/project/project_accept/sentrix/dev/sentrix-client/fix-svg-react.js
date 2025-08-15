// fix-svg-react.js
const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'components/icon/menu');

function fixSVGAttributes(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Ganti atribut SVG ke camelCase
  content = content.replace(/stroke-width=/g, 'strokeWidth=');
  content = content.replace(/stroke-linecap=/g, 'strokeLinecap=');
  content = content.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
  content = content.replace(/clip-path=/g, 'clipPath=');

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Fixed: ${filePath}`);
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.tsx')) {
      fixSVGAttributes(fullPath);
    }
  });
}

walkDir(folderPath);
console.log('All SVG attributes fixed!');
