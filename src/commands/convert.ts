import prompts from 'prompts';
import chalk from 'chalk';

export async function convertCommand(inputFile?: string) {
  console.log(chalk.magenta.bold('\nScaffzap: Data Converter\n'));

  const response = await prompts([
    {
      type: inputFile ? null : 'text',
      name: 'input',
      message: 'Enter the path to your input file (e.g., data.json):',
    },
    {
      type: 'select',
      name: 'format',
      message: 'What do you want to convert this to?',
      choices: [
        { title: 'Markdown Table', value: 'markdown' },
        { title: 'TypeScript Interfaces', value: 'ts-interface' },
        { title: 'SQL Insert Statements', value: 'sql' },
      ],
    }
  ]);

  const finalInput = inputFile || response.input;
  const format = response.format;

  if (!finalInput || !format) {
    console.log(chalk.red('Process cancelled.'));
    process.exit(1);
  }

  console.log(chalk.green(`\nReady to convert '${finalInput}' to '${format}'`));
}