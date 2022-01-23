const fs = require('fs');
const fse = require('fs-extra');
const concat = require('concat');
 
const bundleFileName = 'vtaas-bundle.js';
const path = './dist/';
const filesToConcat = [];
 
const buildFiles = fs.readdirSync(path);
for (const file of buildFiles) {
  if (file.includes('.js'))  {
    filesToConcat.push(path + file);
  }
}
 
(async function build() {
  await fse.ensureDir('elements');
  await concat(filesToConcat, 'elements/' + bundleFileName);
})();