import prompts from 'prompts';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { getExpressTsTemplate } from '../templates/express-ts';
import { getReactTailwindTemplate } from '../templates/react-tailwind';
import { getNodeCliTemplate } from '../templates/node-cli';

export async function scaffoldCommand(projectName?: string) {
  console.log(chalk.blue.bold('\nScaffzap: Let\'s build something fast.\n'));

  const response = await prompts([
    {
      type: projectName ? null : 'text',
      name: 'name',
      message: 'What is the name of your project?',
      initial: 'my-zap-app',
    },
    {
      type: 'select',
      name: 'template',
      message: 'Which boilerplate do you want to generate?',
      choices: [
        { title: 'Express + TypeScript', value: 'express-ts' },
        { title: 'Node CLI (TypeScript + Commander)', value: 'node-cli' },
        { title: 'React + Tailwind (Vite)', value: 'react-tailwind' },
      ],
    },
    {
      type: 'confirm',
      name: 'git',
      message: 'Initialize a new Git repository?',
      initial: true
    },
    {
      type: 'select',
      name: 'pkgManager',
      message: 'Which package manager do you want to use for installation?',
      choices: [
        { title: 'npm', value: 'npm' },
        { title: 'yarn', value: 'yarn' },
        { title: 'pnpm', value: 'pnpm' },
        { title: 'Skip installation', value: 'skip' }
      ],
    }
  ]);

  const finalName = projectName || response.name;
  const { template, git, pkgManager } = response;

  if (!finalName || !template) {
    console.log(chalk.red('Process cancelled.'));
    process.exit(1);
  }

  const targetPath = path.join(process.cwd(), finalName);

  if (fs.existsSync(targetPath)) {
    console.log(chalk.red(`\nError: Directory '${finalName}' already exists!`));
    process.exit(1);
  }

  console.log(chalk.green(`\n➔ Generating '${template}' in ./${finalName}...`));

  fs.mkdirSync(targetPath, { recursive: true });
  fs.mkdirSync(path.join(targetPath, 'src'), { recursive: true });

  let filesToCreate: { path: string; content: string }[] = [];
  
  if (template === 'express-ts') {
    filesToCreate = getExpressTsTemplate(finalName);
  } else if (template === 'react-tailwind') {
    filesToCreate = getReactTailwindTemplate(finalName);
  } else if (template === 'node-cli') {
    filesToCreate = getNodeCliTemplate(finalName);
  }

  filesToCreate.forEach((file) => {
    const fullPath = path.join(targetPath, file.path);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, file.content, 'utf8');
  });
  console.log(chalk.gray(`  Created ${filesToCreate.length} files.`));


  if (git) {
    try {
      console.log(chalk.gray('  Initializing Git repository...'));
      execSync('git init', { cwd: targetPath, stdio: 'ignore' });

      fs.writeFileSync(path.join(targetPath, '.gitignore'), 'node_modules\ndist\n.env\n', 'utf8');
    } catch (error) {
      console.log(chalk.yellow('  Warning: Failed to initialize Git.'));
    }
  }


  if (pkgManager !== 'skip') {
    try {
      console.log(chalk.blue(`\nInstalling dependencies using ${pkgManager}... this might take a moment.`));
      execSync(`${pkgManager} install`, { cwd: targetPath, stdio: 'inherit' });
    } catch (error) {
      console.log(chalk.red(`\nFailed to install dependencies. You can run '${pkgManager} install' manually later.`));
    }
  }

  console.log(chalk.green.bold(`\nSuccess! Your project is ready.`));
  
  console.log(chalk.cyan(`\nNext steps:\n  cd ${finalName}`));
  if (pkgManager === 'skip') {
    console.log(chalk.cyan(`  npm install`));
  }
  console.log(chalk.cyan(`  npm run dev\n`));
}