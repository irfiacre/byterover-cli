# Code Style & Conventions

## Naming Conventions
- **Files**: PascalCase for file names (e.g., `AgentEngineerAssignment.pdf`, `BuildContextTreeTemplate.ts`). However, the provided `package.json` and `tsconfig.json` use kebab-case. The `index.ts` file in `src/` is an exception to PascalCase.
- **Variables**: camelCase is consistently used (e.g., `OUTPUT_DIR`, `homeDirectory`, `claudeCodeLocation`, `pushFilePath`, `agentResult`, `dirName`).
- **Functions**: camelCase is used for function names (e.g., `setupCommands`, `buildContext`, `getFileContent`, `checkGitStatusInParent`, `getAllFiles`).
- **Interfaces/Types**: PascalCase is used for type names (e.g., `ModelResponse`).

## Code Organization
- The codebase is organized into logical directories within `src/`: `agent`, `utils`, and `templates`.
- `index.ts` serves as the main entry point for the CLI.
- Helper functions and utilities are placed in `src/utils`.
- Agent-related logic and prompts are in `src/agent`.
- Templates are stored in `src/templates`.

## TypeScript Patterns
- The project utilizes TypeScript with `commonjs` module system and targets `ES2020`.
- `strict` mode is enabled, promoting type safety.
- `esModuleInterop` and `skipLibCheck` are enabled for better compatibility.
- `declaration` and `sourceMap` are enabled for generating type definition files and source maps.

## Import Patterns
- Standard ES module `import` syntax is used throughout the codebase.
- Specific imports from external libraries (e.g., `commander`, `fs/promises`, `chalk`, `@langchain/core`) are common.
- Relative imports are used for local modules (e.g., `import { contextBuildPrompt } from "./prompts";`).

## Examples

**File**: `/Users/busydev/Desktop/byterover/src/index.ts`
```typescript
import { Command } from "commander";
import * as fs from "fs/promises";
import os from "os";
import { BUILD_CONTEXT_TREE_TEMPLATE } from "./templates/command.template";
import { checkGitStatusInParent, getAllFiles, logger } from "./utils/helpers";
import chalk from "chalk";
import { exit } from "process";
import { handleGetAgentOutput } from "./agent/agent";
import path from "path";

const program = new Command();
const OUTPUT_DIR = ".custom-context-tree";

// ... function definitions ...

program
  .name("byterover")
  .description(
    "A powerful CLI tool for file and directory operations with colorized output"
  )
  .version("1.0.0");

// ... command definitions ...

program.parse();
```
