import * as fs from "node:fs/promises";
import path from "node:path";
// import * as fs from "node:fs";

export async function listItems(listpath = "./") {
  const items = await fs.readdir(listpath, { withFileTypes: true });
  return items.map((item) => {
    return {
      name: item.name,
      type: item.isDirectory() ? "folder" : "file",
      path: path.join(import.meta.dirname, item.name),
    };
  });
}

listItems();

export async function deleteFolder(folderpath) {
  await fs.rm(folderpath, { recursive: true });
}

export async function deleteFile(filepath) {
  await fs.unlink(filepath);
}

async function readFile(pathname) {
  const data = await fs.readFile(pathname, "utf-8");
  console.log(data);
}

export async function createFolder(foldername) {
  await fs.mkdir(foldername, { recursive: true });
}

export async function writeToFile(pathname, content = "") {
  await fs.appendFile(pathname, content);
}

export async function createFile(pathname, content = "") {
  await fs.writeFile(pathname, content);
}

async function getFileInfo(filepath) {
  const stats = await fs.stat(filepath);
  return {
    size: `${(stats.size / 1024).toFixed(2)} KB`,
    created: stats.birthtime.toLocaleString(),
    modified: stats.mtime.toLocaleString(),
  };
}

// createFolder("./custom/global/folder");
// getFileInfo("./hello.txt").then((data) => console.log(data));
// deleteFolder("./custom");
// deleteFile("./hello.txt");
// readFile("./hello.txt");

// async function createFile(pathname) {
//   try {
//     await fs.writeFile(pathname, "Hello nodejs!\n");
//     await fs.appendFile(pathname, "Hello Javascript!\n");
//   } catch (error) {
//     console.log("err", error);
//   }

//   console.log("File written");
// }

// function createFile(pathname) {
// Sync
// fs.writeFileSync(pathname, "Hello Node js");
// fs.appendFileSync(pathname, "Hello js");
// Async
// Error first callbacks
// fs.writeFile(pathname, "Hello nodejs! \n", (err) => {
//   if (err) {
//     console.log("something went wrong while creating the file");
//     return;
//   }
//   fs.appendFile(pathname, "Hello Javascript! \n", (err) => {
//     if (err) {
//       console.log("something went wrong while creating the file");
//       return;
//     }
//     console.log("File has been updated asynchronously.");
//   });
//   console.log("File has been created asynchronously.");
// });
// console.log("Files done");
// }

// createFile("./hello.txt", "Hello Nodejs!\n");
