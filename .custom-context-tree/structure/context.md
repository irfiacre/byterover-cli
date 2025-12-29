# Project Structure

## Directory Overview

```
byterover/
├── .gitignore
├── CLAUDE.md
├── README.md
├── package.json
├── tsconfig.json
├── docs/
│   └── Agent_Engineer_Assignment.pdf
└── src/
    ├── agent/
    │   ├── agent.ts
    │   ├── prompts.ts
    │   └── tools.ts
    ├── utils/
    │   └── helpers.ts
    ├── templates/
    │   └── command.template.ts
    └── index.ts
```

## Key Directories

- **`.` (Root)**: Contains configuration files (`package.json`, `tsconfig.json`, `.gitignore`), main documentation (`README.md`), and the `docs` directory.
- **`docs/`**: Holds supplementary documentation or assets, such as `Agent_Engineer_Assignment.pdf`.
- **`src/`**: The primary source code directory for the application.
  - **`src/agent/`**: Contains the logic related to the AI agent, including its definition, prompts, and available tools.
  - **`src/utils/`**: Houses utility functions that are shared across the application, such as file system helpers and logging.
  - **`src/templates/`**: Stores template strings used for generating code or configuration files.
  - **`src/index.ts`**: The main entry point of the CLI application.

## Key Files

- **`README.md`**: Provides an overview of the project, installation, usage, and development information.
- **`package.json`**: Defines project metadata, dependencies, and scripts for building and running the CLI.
- **`tsconfig.json`**: Configures the TypeScript compiler options.
- **`src/index.ts`**: The main executable file for the ByteRover CLI, responsible for command parsing and routing.
- **`src/agent/agent.ts`**: Implements the core AI agent logic using Langchain.
- **`src/agent/prompts.ts`**: Contains the system prompt used by the AI agent for context building.
- **`src/agent/tools.ts`**: Defines the tools that the AI agent can utilize, specifically `getFileContentTool`.
- **`src/utils/helpers.ts`**: Contains various utility functions such as logging, file reading, and Git status checking.
- **`src/templates/command.template.ts`**: Holds template strings for generating command files, used in the setup command.

## Dependencies

**Production:**
- `@langchain/core`: Core components for Langchain.
- `@langchain/google-genai`: Langchain integration with Google Generative AI.
- `chalk`: For colorizing terminal output.
- `commander`: For parsing command-line arguments.
- `dotenv`: To load environment variables from `.env` files.
- `langchain`: The main Langchain library.

**Development:**
- `@types/chalk`: TypeScript types for `chalk`.
- `@types/node`: TypeScript types for Node.js.
- `ts-node`: To execute TypeScript files directly.
- `typescript`: The TypeScript compiler.

## Module Organization

The project is organized into distinct modules within the `src/` directory: `agent`, `utils`, and `templates`. The `index.ts` file acts as the main application module, importing and orchestrating functionality from these other modules. This modular approach enhances maintainability and reusability.
