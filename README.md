# ByteRover CLI Tool

A modern TypeScript CLI for context-aware file and directory operations with a smart context builder.

## Installation

First, install dependencies and build the project:

```bash
npm install
npm run build
```

## CLI Usage

After building, use the CLI via npm or directly with Node.js:

### Setup Context Commands

Setup templates for **Cursor** or **Claude** code editors:

```bash
npm start setup
# or
node dist/index.js setup
```

### Build Project Context

Build a context tree for the current directory, generating context summaries for structure, bugs, design, and more:

```bash
npm start context
# or
node dist/index.js context
```

The command will output context files in `.custom-context-tree/`.


## Features

- Smart context builder with `.custom-context-tree` output
- Setup commands for cursor and claude code.
