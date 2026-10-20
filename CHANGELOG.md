# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.0] - 2026-10-20

### Added
- **Post-Generation Automation**: Automatically runs `git init`, generates a `.gitignore`, and installs dependencies (`npm`, `yarn`, `pnpm`, or `go mod tidy`) immediately after project scaffolding.
- **Dynamic Sub-prompts**: Added interactive prompts during the `create` flow to ask for Git initialization preferences and package manager selection.
- **New Project Templates**: Added native support for:
  - Next.js (App Router)
  - Vue 3 (Vite)
  - Go REST API (Fiber)
- **New Data Converters**: Added support for generating schema files from JSON data:
  - JSON to GraphQL Types (`.graphql`)
  - JSON to Prisma Schema (`.prisma`)
- Exported all new templates and converters (`getNextJsTemplate`, `getVue3Template`, `getGoFiberTemplate`, `jsonToGraphql`, `jsonToPrisma`) via the main library API.

## [1.5.0] - 2026-10-13

### Added
- **TypeScript Interface Converter:** Added `jsonToTsInterface` to the `convert` command to automatically generate TypeScript interfaces from JSON data.
- **React + Tailwind Template:** Added Vite-powered React and Tailwind CSS boilerplate to the `create` command.
- **Node CLI Template:** Added a commander/tsup boilerplate to the `create` command for instantly building new CLI tools.
- Exported all new templates and converters in the main library entry point.

## [1.0.0] - 2026-10-09

### Added
- Initial release of the `scaffzap` hybrid CLI tool and Node.js library.
- Interactive terminal interface powered by `commander` and `prompts`.
- `create` command for dynamic project scaffolding.
  - Included `express-ts` boilerplate generator for instant Express + TypeScript environment setup.
- `convert` command for on-the-fly data structure translation.
  - Added JSON to Markdown Table conversion engine.
  - Added JSON to SQL Insert Statements conversion engine.
- Dual CommonJS and ESM module exports for library consumption via `tsup`.
- Core library functions exported in `index.ts` (`getExpressTsTemplate`, `jsonToMarkdown`, `jsonToSql`).