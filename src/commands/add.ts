import fs from 'fs';
import path from 'path';
import os from 'os';
import chalk from 'chalk';
import { execSync } from 'child_process';

const SCAFFZAP_DIR = path.join(os.homedir(), '.scaffzap', 'templates');

export async function addCommand(repoUrl: string, templateName: string) {
  if (!repoUrl || !templateName) {
    console.log(chalk.red('\nUsage: scaffzap add <github-url> <template-name>'));
    console.log(chalk.gray('Example: scaffzap add https://github.com/user/repo my-new-template\n'));
    process.exit(1);
  }

  const targetDir = path.join(SCAFFZAP_DIR, templateName);

  if (fs.existsSync(targetDir)) {
    console.log(chalk.red(`\nError: A custom template named '${templateName}' already exists.`));
    process.exit(1);
  }

  console.log(chalk.blue(`\nDownloading template from ${repoUrl}...`));

  try {
    fs.mkdirSync(SCAFFZAP_DIR, { recursive: true });
    
    const url = repoUrl.startsWith('http') ? repoUrl : `https://github.com/${repoUrl}.git`;
    execSync(`git clone --depth 1 ${url} ${targetDir}`, { stdio: 'ignore' });
    
    fs.rmSync(path.join(targetDir, '.git'), { recursive: true, force: true });
    
    console.log(chalk.green.bold(`\nTemplate '${templateName}' added successfully!`));
    console.log(chalk.cyan(`Run 'scaffzap create' to use it.\n`));
  } catch (error) {
    console.log(chalk.red(`\nFailed to add template. Make sure the URL is public and correct.`));
    if (fs.existsSync(targetDir)) fs.rmSync(targetDir, { recursive: true, force: true });
  }
}
