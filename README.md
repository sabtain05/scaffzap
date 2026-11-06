# Scaffzap

**Scaffzap** has evolved from a simple file generator into a context-aware development assistant. Instantly scaffold projects using AI, safely inject code into existing files via AST parsing, route generations perfectly in Enterprise Monorepos, and convert complex relational data structures on the fly.

---

## Features (v3.5.0)

- **Intelligent AI Scaffolding:** Describe your architecture in plain English and let AI dynamically generate the entire project structure.
- **Enterprise Monorepo Support:** Auto-detects Turborepo, Nx, and Lerna to intelligently route newly scaffolded packages to `./apps` or `./packages`.
- **Targeted File Patching (AST):** Safely inject routes, middleware, and imports into *existing* files without overwriting them.
- **Converter Plugin System:** Write your own custom JavaScript data converters and dynamically load them into the CLI.
- **Decentralized Template Ecosystem:** Use `scaffzap add` to download GitHub templates, or `scaffzap build-template` to turn your local projects into reusable boilerplates.
- **Workspace Configuration:** Drop a `scaffzap.json` in your root to enforce team rules and bypass prompts in CI/CD pipelines.
- **Universal Data Converter:** Translate `.json`, `.csv`, or `.yaml` files into standard JSON, Markdown, SQL, TypeScript, GraphQL, or Prisma Schemas with **Smart Relational Inference**.

## Installation

### As a Global CLI (Recommended for terminal use)
```bash
npm install -g scaffzap

```

### As a Local Library (For importing into your code)

```bash
npm install scaffzap

```

## CLI Usage

### 1. Scaffold a New Project (Standard or AI)

Run the `create` command to start the interactive generator, or pass the `--ai` flag to let an LLM build it for you:

```bash
# Standard interactive menu
scaffzap create my-awesome-app

# AI-Driven Scaffolding
scaffzap create --ai "a fastify api using typescript and redis for caching"

```

### 2. Convert Data Files

Instantly translate data structures. Scaffzap auto-detects `.json`, `.csv`, and `.yaml` and can now infer nested relational database schemas!

```bash
scaffzap convert ./data/users.csv

```

### 3. Add a Remote Template

Download a boilerplate from any public GitHub repository directly into your local Scaffzap menu:

```bash
scaffzap add [https://github.com/username/repo-name](https://github.com/username/repo-name) my-custom-template

```

### 4. Build a Local Template

Turn one of your existing projects into a reusable Scaffzap template. This automatically watches your folder and injects the `{{PROJECT_NAME}}` placeholder:

```bash
scaffzap build-template

```

## Enterprise & Advanced Architecture

### Monorepo Injection

If you run `scaffzap create` inside a directory with a `turbo.json`, `nx.json`, or `lerna.json`, the CLI will automatically adapt to your monorepo workspace and prompt you to place the newly scaffolded code into the correct `apps` or `packages` directory.

### Converter Plugins

Need a converter that isn't built-in? Write a custom JavaScript function (e.g., JSON to Zod) and drop it into `~/.scaffzap/plugins/json-to-zod.js`. Scaffzap will automatically load it into your `convert` menu!

### Team Workspace Config (`scaffzap.json`)

Place a `scaffzap.json` file in the root of your project to enforce standards and skip interactive prompts in CI:

```json
{
  "ci": true,
  "defaultTemplate": "react-tailwind",
  "defaultPackageManager": "pnpm",
  "gitInit": false
}

```

## Library Usage (API)

Scaffzap exports its core engines so you can build your own automation tools.

```typescript
import { 
  parseInputFile,
  jsonToPrisma,
  jsonToTsInterface,
  patchExpressRoute
} from 'scaffzap';

// --- AST PATCHING EXAMPLE ---
// Safely inject a new route into an existing app.ts file!
patchExpressRoute('./src/app.ts', 'users', 'api/users');

// --- CONVERTER EXAMPLES ---
// The parser safely handles .json, .csv, and .yaml files
const data = parseInputFile('./data/users.csv'); 

// Convert parsed CSV to a smart Prisma Schema
console.log(jsonToPrisma(data, 'User')); 

```

## Contributing

Contributions, issues, and feature requests are welcome!
Check out our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

---

<p align="center">
<strong>A Sabtain Ali production</strong>
</p>
