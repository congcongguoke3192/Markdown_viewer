const fs = require('fs');
const path = require('path');

const htmlContent = fs.readFileSync(path.join(__dirname, 'markdown_preview_standalone（1）.html'), 'utf8');

const scriptStart = htmlContent.indexOf('<script>') + '<script>'.length;
const scriptEnd = htmlContent.indexOf('</script>', scriptStart);
const scriptContent = htmlContent.substring(scriptStart, scriptEnd);

const codeBlockStart = scriptContent.indexOf('const CodeBlockParser = (function()');
const codeBlockEnd = scriptContent.indexOf('})();', codeBlockStart) + '})();'.length;
const codeBlockCode = scriptContent.substring(codeBlockStart, codeBlockEnd);

const markdownStart = scriptContent.indexOf('const MarkdownParser = (function()');
const markdownEnd = scriptContent.indexOf('})();', markdownStart) + '})();'.length;
const markdownCode = scriptContent.substring(markdownStart, markdownEnd);

const exportedCode = codeBlockCode + '\n\n' + markdownCode + '\n\nmodule.exports = { CodeBlockParser, MarkdownParser };';
fs.writeFileSync(path.join(__dirname, 'extracted_modules.js'), exportedCode);

console.log('Extracted modules to extracted_modules.js (' + exportedCode.length + ' bytes)');
