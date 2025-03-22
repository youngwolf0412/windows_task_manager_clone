import * as readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import chalk from "chalk";

import {
  createFile,
  createFolder,
  deleteFile,
  deleteFolder,
  listItems,
  writeToFile,
} from "./fs.js";

const rl = readline.createInterface({ input: stdin, output: stdout });

async function menu() {
  console.clear();
  console.log(chalk.blue.bold(`\n📂 File system manager\n`));

  const options = [
    "Create Folder",
    "Create FIle",
    "Write to File",
    "Delete File",
    "Delete Folder",
    "List Items",
    "Exit",
  ];

  options.forEach((opt, i) => {
    console.log(chalk.yellow(`${i + 1}`) + chalk.white(` ${opt}`));
  });

  const answer = await rl.question(chalk.cyan("\nSelect option: "));
  switch (answer) {
    case "1":
      const folderName = await rl.question(chalk.cyan("Folder Name: "));
      await createFolder(folderName);
      console.log(chalk.green("✅ Folder created"));
      break;
    case "2":
      const filename = await rl.question(chalk.cyan("File Name: "));
      const content = await rl.question(chalk.cyan("Give Content: "));
      await createFile(filename, content);
      console.log(chalk.green("✅ File Created"));
      break;
    case "3":
      const filepath = await rl.question(chalk.cyan("File Name: "));
      const contentToWrite = await rl.question(chalk.cyan("Update Content: "));
      await writeToFile(filepath, `\n${contentToWrite}`);
      console.log(chalk.green("✅ File updated"));
      break;
    case "4":
      const fileToDelete = await rl.question(chalk.cyan("File to Delete"));
      await deleteFile(fileToDelete);
      console.log(chalk.green("✅ File Deleted"));
      break;
    case "5":
      const folderToDelete = await rl.question(
        chalk.cyan("Folder name/path to delete")
      );
      await deleteFolder(folderToDelete);
      console.log(chalk.green("✅ Folder Deleted"));
      break;

    case "6":
      const listpath = await rl.question(
        chalk.cyan("Folder path(Enter for current: ")
      );
      const items = await listItems(listpath || "./");
      console.log(chalk.blue("\nContents:"));

      items.forEach((item) => {
        const icon = item.type === "folder" ? "📂 " : "📁";
        console.log(`${icon} ${chalk.yellow(item.name)}`);
      });
      break;
    case "7":
      rl.close();
      return;
  }

  await rl.question(chalk.gray("\nPress ENTER to continue...."));
  menu();
}

menu();
