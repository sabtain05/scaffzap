import { Command } from 'commander';
import chalk from 'chalk';
import { helloZap } from './index';

const program = new Command();

program 
    .name('scaffzap')
    .description('The fastest way to scaffold your projects and convert files.')
    .version('1.0.0');

program
    .command('test')
    .description('Test if the CLI is working')
    .action(() => {
        console.log(chalk.green.bold('Zap!'));
        console.log(chalk.blue(helloZap()));
    });

program.parse();