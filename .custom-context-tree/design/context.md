# Design & Architecture

## Architecture Overview

The project is a command-line interface (CLI) tool built with TypeScript, leveraging the `commander` library for command parsing and `langchain` for agent-based functionalities. It follows a layered architecture with a clear separation of concerns:

- **CLI Entry Point (`index.ts`)**: Handles command registration, argument parsing, and orchestrates the execution of different commands (`setup`, `context`, `read`, `list`, `create`, `delete`, `info`).
- **Agent Module (`src/agent/`)**: Contains the core logic for interacting with the language model (Google Generative AI via `ChatGoogleGenerativeAI`), defining prompts (`prompts.ts`), tools (`tools.ts`), and handling the agent's response.
- **Utilities Module (`src/utils/`)**: Houses reusable helper functions for file system operations (`getFileContent`, `getAllFiles`), logging (`logger`), and Git status checks (`checkGitStatusInParent`).
- **Templates Module (`src/templates/`)**: Stores template strings used for generating command files.

## Design Patterns

- **Command Pattern**: Implemented using the `commander` library, where each subcommand (e.g., `setup`, `context`) represents a distinct command with its own logic.
- **Agent/Tool Pattern**: Utilized via `langchain` to create an agent that can use tools (`getFileContentTool`) to gather information and generate responses based on a system prompt.
- **Singleton (Implicit)**: The `ChatGoogleGenerativeAI` model instance can be considered a singleton within its scope, as it's instantiated once and reused.
- **Strategy Pattern (Implicit)**: Different commands (`setup`, `context`, etc.) can be seen as different strategies executed based on user input.

## Component Structure

- **`index.ts`**: The main orchestrator.
- **`agent/agent.ts`**: Manages AI agent interactions.
- **`agent/prompts.ts`**: Contains the system prompt for the AI agent.
- **`agent/tools.ts`**: Defines the tools the agent can use (e.g., `getFileContentTool`).
- **`utils/helpers.ts`**: Provides utility functions for file I/O, logging, and Git.
- **`templates/command.template.ts`**: Holds template strings for generating files.

## Data Flow

1.  **User Input**: The user interacts with the CLI via commands (`npm start <command>`).
2.  **Command Parsing**: `commander` parses the input command and arguments.
3.  **Command Execution**: The corresponding function in `index.ts` is executed (e.g., `setupCommands`, `buildContext`).
4.  **Context Building (`buildContext`)**: 
    a.  Checks Git status.
    b.  Uses `getAllFiles` to gather file information.
    c.  Constructs a prompt with the file structure.
    d.  Invokes the AI agent (`handleGetAgentOutput`).
5.  **AI Agent Interaction**: 
    a.  The agent receives the file structure prompt.
    b.  It uses the `getFileContentTool` (if needed) to read file contents based on the `contextBuildPrompt`.
    c.  The agent processes the information and generates a JSON response containing `readme` and `contextTree` data.
6.  **Output Generation**: The `buildContext` function takes the agent's JSON response and writes the `readme` and categorized context files into the `.custom-context-tree` directory.

## Key Design Decisions

- **Langchain for AI Integration**: Chosen for its robust framework for building LLM-powered applications, including agent and tool abstractions.
- **Commander for CLI**: A standard and powerful library for creating user-friendly command-line interfaces in Node.js.
- **TypeScript**: Used for type safety and better code maintainability.
- **Asynchronous Operations**: Heavy reliance on `async/await` and `fs/promises` for non-blocking I/O operations.
- **Modular Structure**: Separation into `agent`, `utils`, and `templates` directories for better organization.

## Examples

**File**: `/Users/busydev/Desktop/byterover/src/agent/agent.ts`
```typescript
// ... other imports ...

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: API_KEY,
});

const ModelResponse = z.object({...}); // Schema validation

export const getFileContentTool = tool(
  async (filePath: string) => {
    // ... tool implementation ...
  },
  {
    name: "getFileContent",
    description: "..."
  }
);

export const handleGetAgentOutput = async (question: string) => {
  const agent = createAgent({
    model,
    tools: [getFileContentTool],
    responseFormat: ModelResponse,
    systemPrompt: contextBuildPrompt,
  });

  const result = await agent.invoke({
    messages: [
      {
        role: "user",
        content: question,
      },
    ],
  });

  return result.structuredResponse;
};
```
