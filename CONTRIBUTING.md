# Contributing to Scaffzap

First off, thank you for considering contributing to `scaffzap`! It's people like you that make the open-source community such a great place to learn, inspire, and create.

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md). Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs

If you find a bug, please create an issue on GitHub. Before creating a new issue, please check if one already exists.

When reporting a bug, please include:
* Your operating system and Node.js version.
* The exact command you ran.
* The expected behavior and what actually happened.
* A screen recording, screenshot, or copy/paste of the terminal output.

### Suggesting Enhancements

We are always looking to add more boilerplates (e.g., React, Next.js, Go) and new converter formats (e.g., CSV, YAML). If you have an idea, please open an issue with the tag `enhancement` and describe:
* The problem your feature solves.
* How the CLI or library API should look.
* Any potential drawbacks.

### Pull Requests

1. Fork the repository and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes (`npm run build` and local testing).
5. Issue that pull request!

## Local Development Setup

To set up `scaffzap` for local development, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/sabtain05/scaffzap.git](https://github.com/sabtain05/scaffzap.git)
   cd scaffzap

```

2. **Install dependencies:**
```bash
npm install

```


3. **Run the CLI locally:**
You can test your changes without building the whole project by using `tsx`.
```bash
npm run dev create
npm run dev convert

```


4. **Build the project:**
When you are ready to test the compiled output.
```bash
npm run build

```


5. **Test globally (optional):**
Link the package to run it globally on your machine.
```bash
npm link
# You can now run `scaffzap` anywhere
# To remove: npm unlink -g scaffzap

```



## Creating a New Template or Converter

* **Templates:** Add a new `.ts` file in `src/templates/` that exports a function returning an array of file objects `{ path: string, content: string }`. Then, wire it up in `src/commands/scaffold.ts`.
* **Converters:** Add a new parsing/formatting function in `src/converters/`. Wire it up as a choice in the `prompts` menu within `src/commands/convert.ts`.

## Commit Messages

We prefer clear, descriptive commit messages.

* `feat:` for new features (e.g., `feat: add react-tailwind template`)
* `fix:` for bug fixes
* `docs:` for documentation changes
* `chore:` for maintenance tasks
