import { exec } from "child_process";
import { promisify } from "util";
import * as path from "path";
import * as fs from "fs";
import * as fs_promises from "fs/promises";
import chalk from "chalk";

export const logger = {
  success: (message: string) => {
    console.log(chalk.green(message));
  },
  info: (message: string) => {
    console.info(chalk.blue(message));
  },
  warning: (message: string) => {
    console.log(chalk.yellow(message));
  },
  error: (message: string) => {
    console.error(chalk.yellow(message));
  },
  debug: (message: string) => {
    console.log(chalk.grey(message));
  },
};

export const getFileContent = async (filePath: string) => {
  let fileContent = "";
  if (fs.existsSync(filePath)) {
    fileContent = await fs_promises.readFile(filePath, { encoding: "utf-8" });
  }
  return fileContent;
};

const execAsync = promisify(exec);

export const checkGitStatusInParent = async (): Promise<boolean> => {
  const parentDir = path.resolve(process.cwd());
  const gitDir = path.join(parentDir, ".git");
  if (!fs.existsSync(gitDir) || !fs.lstatSync(gitDir).isDirectory()) {
    return true;
  }

  try {
    const { stdout } = await execAsync("git status --porcelain", {
      cwd: parentDir,
    });
    return stdout.trim().length > 0;
  } catch (error) {
    return false;
  }
};

// Method looks for all files in the current working directory, except the ones ignored
export const getAllFiles = async () => {
  const dir = process.cwd();
  const result: Record<string, string> = {};
  const ignored_directories = await getFileContent(`${dir}/.gitignore`);

  const getDirectoryFiles = async (directory: string) => {
    const entries = await fs_promises.readdir(directory, {
      withFileTypes: true,
    });
    const directoryPromises: Promise<void>[] = [];

    for (const entry of entries) {
      if (ignored_directories.includes(entry.name) || entry.name === ".git") {
        continue;
      }
      if (entry.isFile()) {
        result[entry.name] = `${entry.parentPath}/${entry.name}`;
      } else if (entry.isDirectory()) {
        directoryPromises.push(
          getDirectoryFiles(`${entry.parentPath}/${entry.name}`)
        );
      }
    }
    // Wait for all subdirectories to be processed
    await Promise.all(directoryPromises);
  };

  await getDirectoryFiles(dir);
  return result;
};
