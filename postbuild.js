// postbuild.js
const fs = require('fs');

// Fix for Material-UI styles not loading in production
const filePath = './build/index.html';
let html = fs.readFileSync(filePath, 'utf8');

// Ensure Material-UI styles are loaded first
html = html.replace(
  '</title>',
  '</title>\n<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />\n<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />'
);

fs.writeFileSync(filePath, html);