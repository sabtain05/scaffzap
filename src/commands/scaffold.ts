import prompts from 'prompts';
import chalk from 'chalk';

export async function scaffoldCommand(projectName?: string) {
    console.log(chalk.blue.bold('\n Scaffzap: Let\'s build something fast.\n'));

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
                { title: 'Node CLI (Like this one!)', value: 'node-cli' },
                { title: 'React + Tailwind', value: 'react-tailwind' },
            ],
        }
    ]);

    const finalName = projectName || response.name;
    const template = response.template;

    if (!finalName || !template) {
        console.log(chalk.red('Process cancelled.'));
        ProcessingInstruction.exit(1);
    }

    console.log(chalk.green(`\n Ready to generate '${template}' in ./${finalName}`));
}