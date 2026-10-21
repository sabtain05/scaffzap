# Scaffzap

**Scaffzap** is a lightning-fast, hybrid CLI tool and Node.js library designed to eliminate boilerplate fatigue. Instantly scaffold pre-configured projects, clone repositories, and convert data structures on the fly directly from your terminal or within your own code.

---

## Features (v2.0.0)

- ** Interactive Scaffolding:** Generate ready-to-code project boilerplates with a single command.
- ** Bring Your Own Boilerplate (BYOB):** Store your own custom templates in `~/.scaffzap/templates` and the CLI will dynamically load them into the menu.
- ** Remote Scaffolding:** Instantly clone any public GitHub repository and automatically strip the `.git` history for a clean slate.
- ** Post-Generation Automation:** Automatically initializes Git repositories and installs dependencies (`npm`, `yarn`, `pnpm`, or `go mod`).
- ** Universal Data Converter:** Read `.json`, `.csv`, or `.yaml` files and instantly translate them into Markdown tables, SQL statements, TypeScript Interfaces, GraphQL Types, Prisma Schemas, or standard JSON arrays.
- ** Hybrid Architecture:** Use it globally as a CLI tool or install it locally as an importable utility library.

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

Once installed globally, run `scaffzap` from anywhere in your terminal.

### 1. Scaffold a New Project

Run the `create` command to start the interactive project generator:

```bash
scaffzap create
# OR skip the first prompt by passing a name:
scaffzap create my-awesome-app

```

**Current Available Options:**

* **Custom:** Any folder found in `~/.scaffzap/templates`
* **Remote GitHub Repository** (Clones directly via URL or `user/repo`)
* Express + TypeScript
* React + Tailwind (Vite)
* Node CLI (TypeScript + Commander)
* Next.js (App Router)
* Vue 3 (Vite)
* Go REST API (Fiber)

### 2. Convert Data Files

Run the `convert` command to translate data structures. It now auto-detects `.json`, `.csv`, and `.yaml` inputs!

```bash
scaffzap convert
# OR skip the first prompt by passing the file path:
scaffzap convert ./data/users.csv

```

**Current Available Converters:**

* Array ➔ Markdown Table
* Array ➔ SQL Insert Statements
* Array ➔ TypeScript Interfaces
* Array ➔ GraphQL Types
* Array ➔ Prisma Schema
* Array ➔ JSON (Standardize CSV/YAML to JSON)

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
Check out our [Contributing Guide](https://www.google.com/search?q=CONTRIBUTING.md) and [Code of Conduct](https://www.google.com/search?q=CODE_OF_CONDUCT.md) if you want to help add more templates or new data converters.

## Security

Please review our [Security Policy](SECURITY.md) for reporting vulnerabilities.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

---

<p align="center">
<strong>A Sabtain Ali production</strong>
</p>
