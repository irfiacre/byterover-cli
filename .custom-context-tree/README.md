```markdown
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

### Command Summary

```
byterover [command] [options]
```

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

### Example File Operations

#### Read a file

```bash
npm start read <file>
# or
node dist/index.js read <file>
```

#### List directory contents

```bash
npm start list [directory]
# or
node dist/index.js list [directory]
```

#### Create a file

```bash
npm start create <file> --content "Your content here"
# or
node dist/index.js create <file> --content "Your content here"
```

#### Delete a file

```bash
npm start delete <file>
# or
node dist/index.js delete <file>
```

#### Show file information

```bash
npm start info <file>
# or
node dist/index.js info <file>
```

## Development

For contributor and development workflow:

```bash
# Build TypeScript code
npm run build

# Run in development mode with ts-node
npm run dev <command>

# Watch for changes and rebuild automatically
npm run watch
```

## Features

- 🚀 Smart context builder with `.custom-context-tree` output
- 📖 Read file contents
- 📂 List directory contents
- 📝 Create new files with content
- 🗑️ Delete files
- ℹ️ Show detailed file information
- 💡 Well-structured, documented TypeScript code

## Helpful Links

- Context documentation generated in `.custom-context-tree/README.md` and subfolders after running the `context` command.
- See source code in `src/` for utility patterns and architecture.

For more information, please read inline code comments or context files generated in the `.custom-context-tree` directory.
```