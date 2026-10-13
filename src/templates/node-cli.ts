export function getNodeCliTemplate(projectName: string) {
  return [
    {
      path: 'package.json',
      content: `{
  "name": "${projectName}",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "bin": {
    "${projectName}": "./dist/cli.js"
  },
  "scripts": {
    "dev": "tsx src/cli.ts",
    "build": "tsup"
  },
  "dependencies": {
    "chalk": "^4.1.2",
    "commander": "^11.1.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "tsup": "^8.0.2",
    "tsx": "^4.7.1",
    "typescript": "^5.4.5"
  }
}`
    },
    {
      path: 'tsconfig.json',
      content: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}`
    },
    {
      path: 'tsup.config.ts',
      content: `import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/cli.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
});`
    },
    {
      path: 'src/index.ts',
      content: `export function doSomething() {
  return "Library logic goes here!";
}`
    },
    {
      path: 'src/cli.ts',
      content: `#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
  .name('${projectName}')
  .description('My custom CLI tool')
  .version('1.0.0');

program
  .command('hello')
  .description('Say hello')
  .action(() => {
    console.log(chalk.green('Hello from your new CLI!'));
  });

program.parse();`
    }
  ];
}