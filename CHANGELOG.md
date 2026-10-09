# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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