import { Project } from 'ts-morph';
import chalk from 'chalk';

export function patchExpressRoute(filePath: string, routeName: string, routePath: string) {
  const project = new Project();
  project.addSourceFilesAtPaths(filePath);
  const sourceFile = project.getSourceFileOrThrow(filePath);

  // 1. Inject the import statement at the top safely
  sourceFile.addImportDeclaration({
    defaultImport: `${routeName}Router`,
    moduleSpecifier: `./routes/${routeName}`,
  });

  // 2. Find the Express app initialization (const app = express())
  // and inject the app.use() middleware right below it
  const statements = sourceFile.getStatements();
  const appDeclarationIndex = statements.findIndex(s => s.getText().includes('express()'));
  
  if (appDeclarationIndex !== -1) {
    sourceFile.insertStatements(appDeclarationIndex + 1, `app.use('/${routePath}', ${routeName}Router);`);
    sourceFile.saveSync();
    console.log(chalk.green(`Patched ${filePath} with /${routePath} route.`));
  } else {
    console.log(chalk.yellow(`Could not auto-patch ${filePath}. Express app not found.`));
  }
}