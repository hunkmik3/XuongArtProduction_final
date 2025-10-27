#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');

// Change to xuongart directory
process.chdir(path.join(__dirname, 'xuongart'));

// Run strapi develop
exec('npm run develop', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  console.log(stdout);
  if (stderr) {
    console.error(stderr);
  }
});
