# ByteRover CLI Tool

A simple, well-documented CLI tool built with TypeScript for performing basic file operations.

## Installation

```bash
npm install
npm run build
```

## Usage

After building, you can use the CLI tool with the following commands:

### Read a file
```bash
npm start read <file>
# or
node dist/index.js read <file>
```

### List directory contents
```bash
npm start list [directory]
# or
node dist/index.js list [directory]
```

### Create a file
```bash
npm start create <file> --content "Your content here"
# or
node dist/index.js create <file> --content "Your content here"
```

### Delete a file
```bash
npm start delete <file>
# or
node dist/index.js delete <file>
```

### Show file information
```bash
npm start info <file>
# or
node dist/index.js info <file>
```

## Development

```bash
# Build TypeScript
npm run build

# Run in development mode (using ts-node)
npm run dev <command>

# Watch mode for development
npm run watch
```

## Features

- ✅ Read file contents
- ✅ List directory contents
- ✅ Create new files
- ✅ Delete files
- ✅ Show detailed file information
- ✅ Well-documented code with JSDoc comments

