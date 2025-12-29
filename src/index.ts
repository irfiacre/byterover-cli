#!/usr/bin/env node

import { Command } from "commander";
import * as fs from "fs/promises";
import os from "os";
import { BUILD_CONTEXT_TREE_TEMPLATE } from "./templates/command.template";
import { checkGitStatusInParent, getAllFiles, logger } from "./utils/helpers";
import { exit } from "process";
import { handleGetAgentOutput } from "./agent/agent";

const program = new Command();
const OUTPUT_DIR = ".custom-context-tree";

async function setupCommands(): Promise<void> {
  try {
    const homeDirectory = os.homedir();
    const cursorLocation = `${homeDirectory}/.cursor`;
    const cursorConfig = await fs.readdir(cursorLocation);
    const claudeCodeLocation = `${homeDirectory}/.claude`;
    const claudeCodeConfig = await fs.readdir(claudeCodeLocation);
    const configDirLocations = [
      cursorConfig ? cursorLocation : null,
      claudeCodeConfig ? claudeCodeLocation : null,
    ];

    logger.info("Setting up commands");

    for (const configLocation of configDirLocations) {
      if (!configLocation) {
        continue;
      }
      const commandsDirectory = `${configLocation}/commands`;
      await fs.mkdir(commandsDirectory, { recursive: true }); // Make sure that the commands directory exist
      const pushFilePath = `${commandsDirectory}/build_context-tree.md`;
      await fs.writeFile(pushFilePath, BUILD_CONTEXT_TREE_TEMPLATE, "utf8");
    }
    logger.success("Done");
  } catch (error) {
    logger.error(`${error}`);
    process.exit(1);
  }
}

async function buildContext(): Promise<void> {
  if (!(await checkGitStatusInParent())) {
    logger.debug(
      "No changes made, there is no need to update the context tree"
    );
    exit(0);
  }
  // first get the current directory files, execpt those ignored
  logger.info("Looking for all unignored files");

  const allFiles = await getAllFiles();

  const agentResult = await handleGetAgentOutput(
    `This is my folder structure: ${JSON.stringify(allFiles)}`
  );
  const outputDir = `${process.cwd()}/${OUTPUT_DIR}`;

  logger.info("Writing context files");
  await fs.mkdir(outputDir, { recursive: true });
  // Write README.md at root
  await fs.writeFile(`${outputDir}/README.md`, agentResult.readme, "utf8");
  // Helper to create subdirectory and context.md
  async function writeCategoryContext(dirName: string, content: string) {
    const dirPath = `${outputDir}/${dirName}`;
    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(`${dirPath}/context.md`, content ?? "", "utf8");
  }
  // Write all category markdowns
  await writeCategoryContext("bug_fixes", agentResult.contextTree.bugFixes);
  await writeCategoryContext("structure", agentResult.contextTree.structure);
  await writeCategoryContext("compliance", agentResult.contextTree.compliance);
  await writeCategoryContext("design", agentResult.contextTree.design);
  await writeCategoryContext("testing", agentResult.contextTree.testing);
  await writeCategoryContext("code_style", agentResult.contextTree.codeStyle);

  // After getting the context from the agent
  // save it to in a .custom-context direcory
  logger.success("Finished creating the context successfully!");
}

program
  .name("byterover")
  .description(
    "A powerful CLI tool for file and directory operations with colorized output"
  )
  .version("1.0.0");

program
  .command("setup")
  .description("Set up all the necessary commands for cursor or claude code")
  .action(setupCommands);

program
  .name("context")
  .description("Command build the context of the current directory.")
  .action(buildContext);

program.parse();
