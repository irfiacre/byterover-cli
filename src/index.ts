#!/usr/bin/env node

import { Command } from "commander";
import * as fs from "fs/promises";
import os from "os";
import {
  BRV_PUSH_TEMPLATE,
  BRV_PULL_TEMPLATE,
} from "./templates/command.template";
import { checkGitStatusInParent, getAllFiles, logger } from "./utils/helpers";
import chalk from "chalk";
import { exit } from "process";
import { handleGetAgentOutput } from "./agent/agent";

const program = new Command();

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

    console.log(`\n${chalk.green("Setting up commands")}`);

    for (const configLocation of configDirLocations) {
      if (!configLocation) {
        continue;
      }
      const commandsDirectory = `${configLocation}/commands`;
      await fs.mkdir(commandsDirectory, { recursive: true }); // Make sure that the commands directory exist
      const pushFilePath = `${commandsDirectory}/brv_push.md`;
      await fs.writeFile(pushFilePath, BRV_PUSH_TEMPLATE, "utf8");
      const pullFilePath = `${commandsDirectory}/brv_pull.md`;
      await fs.writeFile(pullFilePath, BRV_PULL_TEMPLATE, "utf8");
    }
    console.log(chalk.green("Done"));
  } catch (error) {
    console.error(chalk.red(`${error}`));
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
  const allFiles = await getAllFiles();

  const agentResult = await handleGetAgentOutput(
    `This is my folder structure: ${JSON.stringify(allFiles)}`
  );
  console.log("====", agentResult);

  // After getting the context from the agent
  // save it to in a .custom-context direcory
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
