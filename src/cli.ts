import { Command } from 'commander';
import { scaffoldCommand } from './commands/scaffold';
import { convertCommand } from './commands/convert';

const program = new Command();

program
  .name('scaffzap')
  .description('The fastest way to scaffold projects and convert files.')
  .version('1.0.0');

program
  .command('create [project-name]')
  .description('Interactively generate a new project boilerplate')
  .action((projectName) => {
    scaffoldCommand(projectName);
  });

program
  .command('convert [input-file]')
  .description('Convert data structures (e.g., JSON to Markdown/SQL)')
  .action((inputFile) => {
    convertCommand(inputFile);
  });

program.parse();