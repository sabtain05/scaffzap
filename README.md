```markdown
# ⚡ Scaffzap

[![npm version](https://img.shields.io/npm/v/scaffzap.svg)](https://www.npmjs.com/package/scaffzap)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Scaffzap** is a lightning-fast, hybrid CLI tool and Node.js library designed to eliminate boilerplate fatigue. Instantly scaffold pre-configured projects, build and share your own custom templates, and convert complex data structures on the fly.

---

## ✨ Features (v2.5.0)

- **🚀 Interactive Scaffolding:** Generate ready-to-code project boilerplates with a single command.
- **🌐 Decentralized Template Ecosystem:** Use `scaffzap add` to download templates from GitHub, or use `scaffzap build-template` to turn your local projects into reusable boilerplates.
- **⚙️ Workspace Configuration:** Drop a `scaffzap.json` in your repository to enforce team rules, lock package managers, and bypass prompts for CI/CD pipelines.
- **📂 Bring Your Own Boilerplate (BYOB):** Store your custom templates in `~/.scaffzap/templates` and the CLI will dynamically load them into your menu.
- **🤖 Post-Generation Automation:** Automatically initializes Git repositories and installs dependencies (`npm`, `yarn`, `pnpm`, or `go mod`).
- **🔄 Universal Data Converter:** Translate `.json`, `.csv`, or `.yaml` files into Markdown tables, SQL statements, TypeScript Interfaces, GraphQL Types, Prisma Schemas, or standard JSON arrays.
- **🛠️ Hybrid Architecture:** Use it globally as a CLI tool or install it locally as an importable utility library.

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

### 1. Scaffold a New Project

Run the `create` command to start the interactive project generator:

```bash
scaffzap create
# OR skip the first prompt:
scaffzap create my-awesome-app

```

### 2. Add a Remote Template

Download a boilerplate from any public GitHub repository directly into your local Scaffzap menu:

```bash
scaffzap add [https://github.com/username/repo-name](https://github.com/username/repo-name) my-custom-template

```

### 3. Build a Local Template

Turn one of your existing projects into a reusable Scaffzap template. This command automatically watches your folder and replaces hardcoded names with `{{PROJECT_NAME}}`:

```bash
scaffzap build-template

```

### 4. Convert Data Files

Instantly translate data structures. Auto-detects `.json`, `.csv`, and `.yaml`:

```bash
scaffzap convert ./data/users.csv

```

## Team Workspace Config (`scaffzap.json`)

If you are working in a team or a CI/CD environment, you can place a `scaffzap.json` file in the root of your project to enforce standards and skip interactive prompts:

```json
{
  "ci": true,
  "defaultTemplate": "react-tailwind",
  "defaultPackageManager": "pnpm",
  "gitInit": false
}

```

*When `ci: true` is set, `scaffzap create my-app` will run instantly without asking any questions.*

## Custom Templates (BYOB)

You are no longer limited to the built-in boilerplates. Scaffzap allows you to create your own!

1. Create a directory at `~/.scaffzap/templates/my-custom-api`.
2. Add your boilerplate files inside that folder.
3. Use the `{{PROJECT_NAME}}` placeholder inside your code or `package.json`. Scaffzap will automatically replace it with the user's input during generation.
4. Run `scaffzap create` and select your new template from the menu!

## Library Usage (API)

Scaffzap exports its core engines so you can build your own automation tools. It supports both CommonJS and ES Modules.

```typescript
import { 
  parseInputFile,
  jsonToPrisma,
  jsonToTsInterface,
  getNextJsTemplate
} from 'scaffzap';

// --- CONVERTER EXAMPLES ---
// The parser safely handles .json, .csv, and .yaml files
const data = parseInputFile('./data/users.csv'); 

// Convert parsed CSV to a Prisma Schema
console.log(jsonToPrisma(data, 'User')); 

// Convert parsed CSV to TypeScript Interfaces
console.log(jsonToTsInterface(data, 'User'));

// --- TEMPLATE EXAMPLES ---
// Fetch Boilerplate File Structures programmatically
const files = getNextJsTemplate('my-frontend');
files.forEach(file => {
  console.log(`Path: ${file.path}`);
  // file.content contains the raw string content
});

```

## Contributing

Contributions, issues, and feature requests are welcome!
Check out our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

## Security

Please review our [Security Policy](SECURITY.md) for reporting vulnerabilities.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

---

<p align="center">
<strong>A Sabtain Ali production</strong>
</p>
