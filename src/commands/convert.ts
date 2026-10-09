import prompts from 'prompts';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { jsonToMarkdown } from '../converters/json-to-md';
import { jsonToSql } from '../converters/json-to-sql';

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

  const inputPath = path.resolve(process.cwd(), finalInput);

  if (!fs.existsSync(inputPath)) {
    console.log(chalk.red(`\nError: File '${finalInput}' not found!`));
    process.exit(1);
  }

  try {
    const fileContent = fs.readFileSync(inputPath, 'utf8');
    const jsonData = JSON.parse(fileContent);

    if (!Array.isArray(jsonData)) {
      console.log(chalk.red('\nError: The JSON file must contain an array of objects.'));
      process.exit(1);
    }

    let outputContent = '';
    let outputExtension = '';

    if (format === 'markdown') {
      outputContent = jsonToMarkdown(jsonData);
      outputExtension = '.md';
    } else if (format === 'sql') {
      outputContent = jsonToSql(jsonData);
      outputExtension = '.sql';
    }

    const parsedPath = path.parse(inputPath);
    const outputPath = path.join(parsedPath.dir, `${parsedPath.name}-output${outputExtension}`);

    fs.writeFileSync(outputPath, outputContent, 'utf8');

    console.log(chalk.green.bold(`\nSuccess! File converted successfully.`));
    console.log(chalk.cyan(`Saved to: ${outputPath}\n`));

  } catch (error: any) {
    console.log(chalk.red(`\nError processing file: ${error.message}`));
  }
}