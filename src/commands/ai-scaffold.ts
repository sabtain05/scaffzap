import prompts from 'prompts';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

async function fetchLLM(systemPrompt: string): Promise<string> {
  console.log(chalk.gray(`  Simulating AI response for: ${systemPrompt.slice(0, 80)}...`));

  return JSON.stringify([
    {
      path: 'package.json',
      content: JSON.stringify({
        name: 'ai-generated-app',
        private: true,
        version: '1.0.0',
        scripts: {
          start: 'node dist/index.js',
          build: 'tsc'
        }
      }, null, 2)
    },
    {
      path: 'src/index.ts',
      content: 'console.log("Hello from AI scaffold!");\n'
    }
  ]);
}

export async function aiScaffoldCommand(promptText: string) {
  console.log(chalk.magenta.bold(`\nScaffzap AI: Designing your architecture...`));
  
  const systemPrompt = `
    You are an expert software architect. The user wants to build: "${promptText}".
    Return ONLY a raw JSON array representing the file structure. No markdown formatting.
    Format: [{ "path": "package.json", "content": "{...}" }, { "path": "src/index.ts", "content": "..." }]
  `;

  try {
    console.log(chalk.gray(`  Calling AI model with requirements...`));
    const aiResponse = await fetchLLM(systemPrompt);
    
    const files: { path: string, content: string }[] = JSON.parse(aiResponse);

    const { projectName } = await prompts({
      type: 'text',
      name: 'projectName',
      message: 'AI generation complete! What should we name this project folder?',
      initial: 'ai-generated-app'
    });

    const targetPath = path.join(process.cwd(), projectName);
    fs.mkdirSync(targetPath, { recursive: true });

    files.forEach(file => {
      const fullPath = path.join(targetPath, file.path);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, file.content, 'utf8');
    });

    console.log(chalk.green.bold(`\nSuccess! AI successfully scaffolded ${files.length} files.`));
  } catch (error) {
    console.log(chalk.red(`\nAI Generation failed. Please try a different prompt.`));
  }
}