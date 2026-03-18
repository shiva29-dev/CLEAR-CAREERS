const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Change main backgrounds from slate-50 to brand-50 (or blue-50)
    content = content.replace(/min-h-screen bg-slate-50/g, 'min-h-screen bg-blue-50');
    content = content.replace(/h-screen bg-slate-50/g, 'h-screen bg-blue-50');
    content = content.replace(/h-full flex flex-col md:flex-row bg-slate-50/g, 'h-full flex flex-col md:flex-row bg-blue-50');
    content = content.replace(/bg-slate-50\/50 dark:bg-slate-950\/50/g, 'bg-blue-50/50 dark:bg-slate-950/50');
    content = content.replace(/bg-slate-50 dark:bg-slate-950/g, 'bg-blue-50 dark:bg-slate-950');
    
    // Change cards from brand-50 to white
    content = content.replace(/bg-brand-50 dark:bg-slate-900/g, 'bg-white dark:bg-slate-900');
    content = content.replace(/bg-brand-50\/80 dark:bg-slate-900\/80/g, 'bg-white/80 dark:bg-slate-900/80');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated', filePath);
    }
  }
});
