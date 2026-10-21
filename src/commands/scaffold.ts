import prompts from 'prompts';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { getExpressTsTemplate } from '../templates/express-ts';
import { getReactTailwindTemplate } from '../templates/react-tailwind';
import { getNodeCliTemplate } from '../templates/node-cli';
import { getNextJsTemplate } from '../templates/nextjs';
import { getVue3Template } from '../templates/vue3';
import { getGoFiberTemplate } from '../templates/go-fiber';
import { getCustomTemplates, loadCustomTemplate } from '../utils/custom-templates';

export async function scaffoldCommand(projectName?: string) {
  console.log(chalk.blue.bold('\nScaffzap: Let\'s build something fast.\n'));

  const customTemplates = getCustomTemplates();

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
        ...customTemplates,
        { title: 'Remote GitHub Repository', value: 'github' },
        { title: 'Express + TypeScript', value: 'express-ts' },
        { title: 'Node CLI (TypeScript + Commander)', value: 'node-cli' },
        { title: 'React + Tailwind (Vite)', value: 'react-tailwind' },
        { title: 'Next.js (App Router)', value: 'nextjs' },
        { title: 'Vue 3 (Vite)', value: 'vue3' },
        { title: 'Go REST API (Fiber)', value: 'go-fiber' },
      ],
    },
    {
      type: (prev) => prev === 'github' ? 'text' : null,
      name: 'githubRepo',
      message: 'Enter the repository (e.g., user/repo or full HTTPS URL):',
    },
    {
      type: 'confirm',
      name: 'git',
      message: 'Initialize a new Git repository?',
      initial: true
    },
    {
      type: (prev, values) => values.template === 'go-fiber' ? null : 'select',
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
  const { template, githubRepo, git, pkgManager } = response;

  if (!finalName || !template || (template === 'github' && !githubRepo)) {
    console.log(chalk.red('Process cancelled.'));
    process.exit(1);
  }

  const targetPath = path.join(process.cwd(), finalName);

  if (fs.existsSync(targetPath)) {
    console.log(chalk.red(`\nError: Directory '${finalName}' already exists!`));
    process.exit(1);
  }

  console.log(chalk.green(`\n➔ Generating '${template}' in ./${finalName}...`));


  if (template !== 'github') {
    fs.mkdirSync(targetPath, { recursive: true });
  }


  if (template === 'github') {
    try {
      const repoUrl = githubRepo.startsWith('http') ? githubRepo : `https://github.com/${githubRepo}.git`;
      console.log(chalk.gray(`  Cloning ${repoUrl}...`));
      

      execSync(`git clone ${repoUrl} ${targetPath}`, { stdio: 'ignore' });
      

      fs.rmSync(path.join(targetPath, '.git'), { recursive: true, force: true });
      console.log(chalk.gray('  Stripped original git history.'));
      
    } catch (error) {
      console.log(chalk.red('\nFailed to clone repository. Make sure the URL is correct and public.'));
      process.exit(1);
    }
  } else {
    let filesToCreate: { path: string; content: string }[] = [];
    
    if (template.startsWith('custom:')) {
      const customName = template.split(':')[1];
      filesToCreate = loadCustomTemplate(customName, finalName);
    } else if (template === 'express-ts') filesToCreate = getExpressTsTemplate(finalName);
    else if (template === 'react-tailwind') filesToCreate = getReactTailwindTemplate(finalName);
    else if (template === 'node-cli') filesToCreate = getNodeCliTemplate(finalName);
    else if (template === 'nextjs') filesToCreate = getNextJsTemplate(finalName);
    else if (template === 'vue3') filesToCreate = getVue3Template(finalName);
    else if (template === 'go-fiber') filesToCreate = getGoFiberTemplate(finalName);

    filesToCreate.forEach((file) => {
      const fullPath = path.join(targetPath, file.path);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, file.content, 'utf8');
    });
    console.log(chalk.gray(`  Created ${filesToCreate.length} files.`));
  }

  if (git) {
    try {
      console.log(chalk.gray('  Initializing Git repository...'));
      execSync('git init', { cwd: targetPath, stdio: 'ignore' });
      
      const gitignorePath = path.join(targetPath, '.gitignore');
      if (!fs.existsSync(gitignorePath)) {
        fs.writeFileSync(gitignorePath, 'node_modules\ndist\n.env\n.next\n', 'utf8');
      }
    } catch (error) {
      console.log(chalk.yellow('  Warning: Failed to initialize Git.'));
    }
  }

  if (template === 'go-fiber') {
    try {
      console.log(chalk.blue(`\nInitializing Go modules...`));
      execSync(`go mod tidy`, { cwd: targetPath, stdio: 'inherit' });
    } catch (error) {}
  } else if (pkgManager !== 'skip') {
    try {
      console.log(chalk.blue(`\nInstalling dependencies using ${pkgManager}... this might take a moment.`));
      execSync(`${pkgManager} install`, { cwd: targetPath, stdio: 'inherit' });
    } catch (error) {
      console.log(chalk.red(`\nFailed to install dependencies. You can run '${pkgManager} install' manually.`));
    }
  }

  console.log(chalk.green.bold(`\nSuccess! Your project is ready.`));
}