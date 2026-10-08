export function getExpressTsTemplate(projectName: string) {
  return [
    {
      path: 'package.json',
      content: `{
  "name": "${projectName}",
  "version": "1.0.0",
  "main": "dist/index.js",
  "scripts": {
    "dev": "ts-node-dev src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "express": "^4.19.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.4.0"
  }
}`
    },
    {
      path: 'tsconfig.json',
      content: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  }
}`
    },
    {
      path: 'src/index.ts',
      content: `import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Zap! Express + TypeScript server is running!');
});

app.listen(port, () => {
  console.log(\`Server is listening on http://localhost:\${port}\`);
});`
    }
  ];
}