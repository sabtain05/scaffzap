import prompts from 'prompts';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { getExpressTsTemplate } from '../templates/express-ts';

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
        { title: 'Node CLI (Coming soon)', value: 'node-cli' },
        { title: 'React + Tailwind (Coming soon)', value: 'react-tailwind' },
      ],
    }
  ]);

  const finalName = projectName || response.name;
  const template = response.template;

  if (!finalName || !template) {
    console.log(chalk.red('Process cancelled.'));
    process.exit(1);
  }

  const targetPath = path.join(process.cwd(), finalName);

  if (fs.existsSync(targetPath)) {
    console.log(chalk.red(`\nError: Directory '${finalName}' already exists!`));
    process.exit(1);
  }

  console.log(chalk.green(`\nGenerating '${template}' in ./${finalName}...`));

  fs.mkdirSync(targetPath, { recursive: true });
  fs.mkdirSync(path.join(targetPath, 'src'), { recursive: true });

  let filesToCreate: { path: string; content: string }[] = [];
  
  if (template === 'express-ts') {
    filesToCreate = getExpressTsTemplate(finalName);
  } else {
    console.log(chalk.yellow(`\nTemplate '${template}' is under construction!`));
    process.exit(0);
  }

  filesToCreate.forEach((file) => {
    const fullPath = path.join(targetPath, file.path);
    fs.writeFileSync(fullPath, file.content, 'utf8');
    console.log(chalk.gray(`Created: ${file.path}`));
  });

  console.log(chalk.green.bold(`\nSuccess! Your project is ready.`));
  console.log(chalk.cyan(`\nNext steps:\n  cd ${finalName}\n  npm install\n  npm run dev\n`));
}