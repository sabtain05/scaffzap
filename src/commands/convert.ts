import prompts from 'prompts';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { parseInputFile } from '../utils/parsers';
import { jsonToMarkdown } from '../converters/json-to-md';
import { jsonToSql } from '../converters/json-to-sql';
import { jsonToTsInterface } from '../converters/json-to-ts';
import { jsonToGraphql } from '../converters/json-to-graphql';
import { jsonToPrisma } from '../converters/json-to-prisma';

export async function convertCommand(inputFile?: string) {
  console.log(chalk.magenta.bold('\nScaffzap: Data Converter (v2.0)\n'));

  const response = await prompts([
    {
      type: inputFile ? null : 'text',
      name: 'input',
      message: 'Enter the path to your input file (.json, .csv, .yaml):',
    },
    {
      type: 'select',
      name: 'format',
      message: 'What do you want to convert this to?',
      choices: [
        { title: 'JSON Array (Standardize)', value: 'json' },
        { title: 'Markdown Table', value: 'markdown' },
        { title: 'SQL Insert Statements', value: 'sql' },
        { title: 'TypeScript Interfaces', value: 'ts-interface' },
        { title: 'GraphQL Types', value: 'graphql' },
        { title: 'Prisma Schema', value: 'prisma' },
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
    const parsedData = parseInputFile(inputPath);

    if (parsedData.length === 0) {
      console.log(chalk.yellow('\nWarning: The file is empty.'));
      process.exit(1);
    }

    let outputContent = '';
    let outputExtension = '';

    if (format === 'json') {
      outputContent = JSON.stringify(parsedData, null, 2);
      outputExtension = '.json';
    } else if (format === 'markdown') {
      outputContent = jsonToMarkdown(parsedData);
      outputExtension = '.md';
    } else if (format === 'sql') {
      outputContent = jsonToSql(parsedData);
      outputExtension = '.sql';
    } else if (format === 'ts-interface') {
      outputContent = jsonToTsInterface(parsedData, 'MyDataInterface');
      outputExtension = '.ts';
    } else if (format === 'graphql') {
      outputContent = jsonToGraphql(parsedData, 'GeneratedType');
      outputExtension = '.graphql';
    } else if (format === 'prisma') {
      outputContent = jsonToPrisma(parsedData, 'GeneratedModel');
      outputExtension = '.prisma';
    }

    const parsedPath = path.parse(inputPath);
    const outputPath = path.join(parsedPath.dir, `${parsedPath.name}-output${outputExtension}`);

    fs.writeFileSync(outputPath, outputContent, 'utf8');

    console.log(chalk.green.bold(`\nSuccess! File converted successfully.`));
    console.log(chalk.cyan(`➔ Saved to: ${outputPath}\n`));

  } catch (error: any) {
    console.log(chalk.red(`\nError processing file: ${error.message}`));
  }
}