const fs = require('fs');
const path = require('path');

const dirs = [
  'src/components/labs/physics',
  'src/components/labs/chemistry',
  'src/components/labs/civil',
  'src/components/labs/electronics'
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  // 1. Fix outermost wrapper
  // from: <div className="flex-1 flex flex-col min-h-0 bg-[#0A0A0A]">
  // to:   <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-[#0A0A0A] overflow-y-auto md:overflow-hidden">\n      <div className="flex-1 flex flex-col min-w-0">
  content = content.replace(
    /<div className="flex-1 flex flex-col min-h-0 bg-\[#0A0A0A\]">/g,
    '<div className="flex-1 flex flex-col md:flex-row min-h-0 bg-[#0A0A0A] overflow-y-auto custom-scrollbar md:overflow-hidden">\n      <div className="flex-1 flex flex-col min-w-0">'
  );

  // 2. Fix Simulation area min-height so it doesn't crush on mobile
  content = content.replace(
    /className="flex-1 relative overflow-hidden flex (.*?)items-center justify-center/g,
    'className="flex-1 relative overflow-hidden flex $1items-center justify-center min-h-[400px] md:min-h-0'
  );

  // 3. Fix side panel 
  // It needs to be preceded by a closing </div> for the new main column we opened in step 1.
  // There are two main variants of the side panel class:
  // Variant A (hidden on mobile): "absolute right-0 top-0 bottom-0 w-80 border-l border-white/5 bg-[#050505] flex flex-col pointer-events-none md:pointer-events-auto opacity-0 md:opacity-100 md:relative"
  // Variant B (always w-80): "w-80 shrink-0 border-l border-white/5 bg-[#050505] flex flex-col"
  
  // We want to replace whatever the side panel is with a consistent mobile-friendly class:
  const newSidePanelClass = 'w-full md:w-80 shrink-0 border-t md:border-t-0 md:border-l border-white/5 bg-[#050505] flex flex-col';
  
  const sidePanelRegex1 = /\{\/\*\s*Side Panel\s*\*\/\}\s*<div className="absolute right-0 top-0 bottom-0 w-80[^"]*">/g;
  const sidePanelRegex2 = /\{\/\*\s*Side Panel\s*\*\/\}\s*<div className="w-80 shrink-0 border-l[^"]*">/g;
  
  const replacement = '</div>\n      \n      {/* Side Panel */}\n      <div className="' + newSidePanelClass + '">';

  if (sidePanelRegex1.test(content)) {
    content = content.replace(sidePanelRegex1, replacement);
  } else if (sidePanelRegex2.test(content)) {
    content = content.replace(sidePanelRegex2, replacement);
  }

  // Handle controls overflow (wrap in flex-wrap on mobile instead of cutting off)
  // from: flex items-center px-6 gap-6 overflow-x-auto
  // to: flex items-center px-4 md:px-6 gap-4 md:gap-6 overflow-x-auto
  content = content.replace(
    /className="([^"]*)h-24 shrink-0 border-b border-white\/5 bg-\[#111111\] flex items-center px-6 gap-6/g,
    'className="$1min-h-[6rem] shrink-0 border-b border-white/5 bg-[#111111] flex items-center px-4 md:px-6 gap-4 md:gap-6 overflow-x-auto'
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated: ${filePath}`);
  }
}

dirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(file => {
      if (file.endsWith('.tsx')) {
        processFile(path.join(dir, file));
      }
    });
  }
});
