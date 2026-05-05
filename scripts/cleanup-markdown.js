#!/usr/bin/env node

// Cleans up artifacts left by downdoc's AsciiDoc-to-Markdown conversion.
// Usage: node cleanup-markdown.js <input.md> <output.md>
//
// Pipeline: asciidoctor-reducer -> fix-asciidoc-levels.js -> downdoc -> THIS SCRIPT

const fs = require('fs');

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
  console.error('Usage: node cleanup-markdown.js <input-file> <output-file>');
  process.exit(1);
}

let content = fs.readFileSync(inputFile, 'utf8');

const lines = content.split('\n');
const outputLines = [];

// Apply a replacement only outside inline code spans (backtick-delimited segments).
function replaceOutsideInlineCode(line, search, replacement) {
  const segments = line.split('`');
  for (let j = 0; j < segments.length; j++) {
    if (j % 2 === 0) {
      segments[j] = segments[j].replace(search, replacement);
    }
  }
  return segments.join('`');
}

let insideCodeBlock = false;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  if (line.startsWith('```')) {
    insideCodeBlock = !insideCodeBlock;
    outputLines.push(line);
    continue;
  }

  if (insideCodeBlock) {
    outputLines.push(line);
    continue;
  }

  // Non-breaking spaces (preserve occurrences inside inline code)
  line = replaceOutsideInlineCode(line, /\{nbsp\}/g, ' ');
  line = replaceOutsideInlineCode(line, /&#160;/g, ' ');

  // Admonitions: HTML <dl> markup -> blockquotes
  line = line.replace(/<dl><dt><strong>\u{1F4CC} NOTE<\/strong><\/dt><dd>/gu, '> **NOTE:**');
  line = line.replace(/<dl><dt><strong>\u{2757} IMPORTANT<\/strong><\/dt><dd>/gu, '> **IMPORTANT:**');
  line = line.replace(/<dl><dt><strong>\u{26A0}\u{FE0F} WARNING<\/strong><\/dt><dd>/gu, '> **WARNING:**');
  line = line.replace(/<\/dd><\/dl>/g, '');

  // Unconverted AsciiDoc image markup in body text
  line = line.replace(/image:images\/yes\.png\[yes\] /g, '');
  line = line.replace(/image:images\/no\.png\[no\] /g, '');
  line = line.replace(/image:images\/caution\.png\[with caution\] /g, '');
  line = line.replace(/image:images\/caution\.png\[caution\] /g, '');
  line = line.replace(/image:images\/yes\.png\[yes\]-/g, '');
  line = line.replace(/image:images\/no\.png\[no\]-/g, '');
  line = line.replace(/image:images\/caution\.png\[with-caution\]-/g, '');
  line = line.replace(/image:images\/caution\.png\[caution\]-/g, '');

  // Strip images from headings (must run before body-text image-to-label rules)
  line = line.replace(/^(#{1,6}) !\[[^\]]*\]\(images\/yes\.png\) /, '$1 ');
  line = line.replace(/^(#{1,6}) !\[[^\]]*\]\(images\/no\.png\) /, '$1 ');
  line = line.replace(/^(#{1,6}) !\[[^\]]*\]\(images\/caution\.png\) /, '$1 ');

  // Replace body-text images with text labels (alt text varies, so match any)
  line = line.replace(/!\[[^\]]*\]\(images\/yes\.png\) /g, '**Yes:** ');
  line = line.replace(/!\[[^\]]*\]\(images\/no\.png\) /g, '**No:** ');
  line = line.replace(/!\[[^\]]*\]\(images\/caution\.png\) /g, '**With caution:** ');

  // Strip image-derived prefixes from anchor links
  line = line.replace(/\(#yesimagesyespng-/g, '(#');
  line = line.replace(/\(#noimagesnopng-/g, '(#');
  line = line.replace(/\(#with-cautionimagescautionpng-/g, '(#');
  line = line.replace(/\(#cautionimagescautionpng-/g, '(#');

  // Fix {nbsp} -> "160" corruption in anchor slugs (e.g. #red160hat -> #red-hat)
  line = line.replace(/\(#([^)]*?)160([^)]*?)\)/g, '(#$1-$2)');

  // Punctuation artifacts
  line = line.replace(/,-/g, '-');
  line = line.replace(/-\(/g, '-');
  line = line.replace(/\)\)/g, ')');

  // Remove empty glossary fields (label with no content, followed by blank line)
  const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
  const isEmptyField = (
    (line === '**See also**:' || line === '**Incorrect forms**:') &&
    nextLine.trim() === ''
  );

  if (isEmptyField) {
    continue;
  }

  outputLines.push(line);
}

fs.writeFileSync(outputFile, outputLines.join('\n'), 'utf8');
console.log(`Markdown cleanup complete: ${inputFile} -> ${outputFile}`);
