#!/usr/bin/env node

// Applies :leveloffset: directives that downdoc ignores.
// Usage: node fix-asciidoc-levels.js <input.adoc> <output.adoc>
//
// Pipeline: asciidoctor-reducer -> THIS SCRIPT -> downdoc -> cleanup-markdown.js

const fs = require('fs');

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
  console.error('Usage: node fix-asciidoc-levels.js <input-file> <output-file>');
  process.exit(1);
}

const lines = fs.readFileSync(inputFile, 'utf8').split('\n');
const outputLines = [];
let currentOffset = 0;

for (const line of lines) {
  const offsetMatch = line.match(/^:leveloffset: \+(\d+)$/);
  if (offsetMatch) {
    currentOffset = parseInt(offsetMatch[1], 10);
    continue;
  }

  if (line.match(/^:leveloffset!:$/)) {
    currentOffset = 0;
    continue;
  }

  const headingMatch = line.match(/^(=+) /);
  if (headingMatch && currentOffset > 0) {
    outputLines.push('='.repeat(currentOffset) + line);
    continue;
  }

  outputLines.push(line);
}

fs.writeFileSync(outputFile, outputLines.join('\n'), 'utf8');
console.log(`Heading levels fixed: ${inputFile} -> ${outputFile}`);
