```markdown
# ⚡ Scaffzap

[![npm version](https://img.shields.io/npm/v/scaffzap.svg)](https://www.npmjs.com/package/scaffzap)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Scaffzap** is a lightning-fast, hybrid CLI tool and Node.js library designed to eliminate boilerplate fatigue. Instantly scaffold pre-configured projects, automate initial setup, and convert data structures on the fly directly from your terminal or within your own code.

---

## ✨ Features

- **🚀 Interactive Scaffolding:** Generate ready-to-code project boilerplates with a single command. Supports Express, React, Next.js, Vue, Go Fiber, and more.
- **🤖 Post-Generation Automation:** Automatically initializes Git repositories and installs dependencies (`npm`, `yarn`, `pnpm`, or `go mod`) so you can start coding immediately.
- **🔄 Data Conversion Engine:** Instantly translate JSON arrays into Markdown tables, SQL statements, TypeScript Interfaces, GraphQL Types, or Prisma Schemas.
- **🛠️ Hybrid Architecture:** Use it globally as a CLI tool or install it locally as an importable utility library in your Node.js/TypeScript projects.
- **📦 Zero-Config:** No massive configuration files required. Just run it and answer the prompts.

## 📦 Installation

### As a Global CLI (Recommended for terminal use)
```bash
npm install -g scaffzap

```

### As a Local Library (For importing into your code)

```bash
npm install scaffzap

```

## 💻 CLI Usage

Once installed globally, you can run `scaffzap` from anywhere in your terminal.

### 1. Scaffold a New Project

Run the `create` command to start the interactive project generator:

```bash
scaffzap create
# OR skip the first prompt by passing a name:
scaffzap create my-awesome-app

```

**Current Available Templates:**

* 🟢 Express + TypeScript
* ⚛️ React + Tailwind (Vite)
* 🛠️ Node CLI (TypeScript + Commander)
* ⬛ Next.js (App Router)
* 🟩 Vue 3 (Vite)
* 🐹 Go REST API (Fiber)

*Note: Scaffzap will automatically prompt you to initialize Git and install your dependencies!*

### 2. Convert Data Files

Run the `convert` command to translate data structures:

```bash
scaffzap convert
# OR skip the first prompt by passing the file path:
scaffzap convert ./data/users.json

```

**Current Available Converters:**

* 📝 JSON ➔ Markdown Table
* 🗄️ JSON ➔ SQL Insert Statements
* 🟦 JSON ➔ TypeScript Interfaces
* 🟣 JSON ➔ GraphQL Types
* ◭ JSON ➔ Prisma Schema

## 🧩 Library Usage (API)

Scaffzap exports its core engines so you can build your own automation tools. It supports both CommonJS and ES Modules.

```typescript
import { 
  jsonToPrisma,
  jsonToGraphql,
  jsonToTsInterface,
  getNextJsTemplate,
  getGoFiberTemplate
} from 'scaffzap';

// --- CONVERTER EXAMPLES ---
const data = [
  { id: 1, name: "Sabtain", role: "Engineer", active: true },
];

// 1. JSON to Prisma Schema
console.log(jsonToPrisma(data, 'User')); 
/* Outputs:
model User {
  id Int @id @default(autoincrement())
  name String
  role String
  active Boolean
}
*/

// 2. JSON to GraphQL Type
console.log(jsonToGraphql(data, 'UserType'));

// --- TEMPLATE EXAMPLES ---
// Fetching Boilerplate File Structures programmatically
const files = getNextJsTemplate('my-frontend');
files.forEach(file => {
  console.log(`Path: ${file.path}`);
  // file.content contains the raw string content of the file
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
