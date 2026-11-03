// src/commands/build-template.ts
import fs from 'fs';
import path from 'path';
import os from 'os';
import chalk from 'chalk';
import prompts from 'prompts';

const SCAFFZAP_DIR = path.join(os.homedir(), '.scaffzap', 'templates');

function copyAndReplace(src: string, dest: string, oldName: string) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Skip node_modules and .git
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      copyAndReplace(srcPath, destPath, oldName);
    } else {
      let content = fs.readFileSync(srcPath, 'utf8');
      // Replace the old project name with the Scaffzap placeholder
      const regex = new RegExp(oldName, 'g');
      content = content.replace(regex, '{{PROJECT_NAME}}');
      fs.writeFileSync(destPath, content, 'utf8');
    }
  }
}

export async function buildTemplateCommand() {
  console.log(chalk.cyan.bold('\nScaffzap: Template Builder\n'));

  const response = await prompts([
    {
      type: 'text',
      name: 'sourceDir',
      message: 'Enter the path to the project you want to convert (e.g., ./my-cool-api):',
    },
    {
      type: 'text',
      name: 'oldName',
      message: 'What is the hardcoded project name we should replace with {{PROJECT_NAME}}?',
    },
    {
      type: 'text',
      name: 'templateName',
      message: 'What should we call this template in your Scaffzap menu?',
    }
  ]);

  const { sourceDir, oldName, templateName } = response;

  if (!sourceDir || !oldName || !templateName) {
    console.log(chalk.red('Process cancelled.'));
    return;
  }

  const absoluteSrc = path.resolve(process.cwd(), sourceDir);
  const targetDir = path.join(SCAFFZAP_DIR, templateName);

  if (!fs.existsSync(absoluteSrc)) {
    console.log(chalk.red(`\nError: Source directory '${absoluteSrc}' not found.`));
    return;
  }

  console.log(chalk.gray(`\nProcessing files from ${absoluteSrc}...`));
  copyAndReplace(absoluteSrc, targetDir, oldName);

  console.log(chalk.green.bold(`\nTemplate '${templateName}' successfully built!`));
  console.log(chalk.cyan(`It is now available in your 'scaffzap create' menu under Custom templates.\n`));
}