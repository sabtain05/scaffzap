import { Command } from 'commander';
import { scaffoldCommand } from './commands/scaffold';
import { aiScaffoldCommand } from './commands/ai-scaffold';
import { convertCommand } from './commands/convert';
import { buildTemplateCommand } from './commands/build-template';
import { addCommand } from './commands/add';

const program = new Command();

program
  .name('scaffzap')
  .description('Lightning-fast hybrid CLI for scaffolding and data conversion')
  .version('2.5.0');

program
  .command('create [project-name]')
  .option('--ai <prompt>', 'Generate a custom template using AI')
  .description('Scaffold a new project boilerplate')
  .action(async (projectName, options) => {
    if (options.ai) {
      await aiScaffoldCommand(options.ai);
    } else {
      await scaffoldCommand(projectName);
    }
  });

program
  .command('convert [input-file]')
  .description('Convert data structures (JSON, CSV, YAML) into standard formats')
  .action((inputFile) => {
    convertCommand(inputFile);
  });

program
  .command('build-template')
  .description('Convert an existing local project into a Scaffzap custom template')
  .action(() => {
    buildTemplateCommand();
  });

program
  .command('add <url> <template-name>')
  .description('Download a remote GitHub repository into your custom templates directory')
  .action((url, templateName) => {
    addCommand(url, templateName);
  });

program.parse(process.argv);
