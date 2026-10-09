# Scaffzap

[![npm version](https://img.shields.io/npm/v/scaffzap.svg)](https://www.npmjs.com/package/scaffzap)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Scaffzap** is a lightning-fast, hybrid CLI tool and Node.js library designed to eliminate boilerplate fatigue. Instantly scaffold pre-configured projects and convert data structures on the fly directly from your terminal or within your own code.

---

## Features

- **Interactive Scaffolding:** Generate ready-to-code project boilerplates (e.g., Express + TypeScript) with a single command.
- **Data Conversion Engine:** Instantly translate JSON arrays into Markdown tables or SQL insert statements.
- **Hybrid Architecture:** Use it globally as a CLI tool or install it locally as an importable utility library in your Node.js/TypeScript projects.
- **Zero-Config:** No massive configuration files required. Just run it and answer the prompts.

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

Once installed globally, you can run `scaffzap` from anywhere in your terminal.

### 1. Scaffold a New Project

Run the `create` command to start the interactive project generator:

```bash
scaffzap create
# OR skip the first prompt by passing a name:
scaffzap create my-awesome-api

```

*Current available templates: Express + TypeScript*

### 2. Convert Data Files

Run the `convert` command to translate data structures (e.g., JSON to Markdown/SQL):

```bash
scaffzap convert
# OR skip the first prompt by passing the file path:
scaffzap convert ./data/users.json

```

## Library Usage (API)

Scaffzap exports its core engines so you can build your own automation tools. It supports both CommonJS and ES Modules.

```typescript
import { jsonToMarkdown, jsonToSql, getExpressTsTemplate } from 'scaffzap';

// Example: Converting JSON to a Markdown Table
const data = [
  { id: 1, name: "Jane", role: "Engineer" },
  { id: 2, name: "Alex", role: "Designer" }
];

const markdownTable = jsonToMarkdown(data);
console.log(markdownTable);

// Example: Converting JSON to SQL Insert Statements
const sqlStatements = jsonToSql(data, 'users_table');
console.log(sqlStatements);

// Example: Fetching Boilerplate File Structures
const files = getExpressTsTemplate('my-api');
files.forEach(file => {
  console.log(`Path: ${file.path}`);
  // file.content contains the raw string content of the boilerplate file
});

```

## Contributing

Contributions, issues, and feature requests are welcome!
Check out our [Contributing Guide](https://www.google.com/search?q=CONTRIBUTING.md) and [Code of Conduct](https://www.google.com/search?q=CODE_OF_CONDUCT.md) if you want to help add more templates (like React, Next.js, or Go) or new data converters.

## Security

Please review our [Security Policy](SECURITY.md) for reporting vulnerabilities.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

---

<p align="center">
<strong>A Sabtain Ali production</strong>
</p>