# Repo2Txt: Converting GitHub Repos to LLM-Friendly Text

*October 2024 • 5 min read*

Here's my secret workflow for understanding new codebases: dump the entire repository into a single text file and feed it to an LLM with a massive context window.

On October 26, 2024, I released Repo2Txt to make this workflow accessible to everyone. It's particularly useful for training Language Learning Models (LLMs) on repository-specific content.

## The Origin Story

I was trying to understand a complex open-source project. Reading file by file was painfully slow. I wanted to ask questions like:

- "How does authentication work in this codebase?"
- "Where is the database schema defined?"
- "What's the data flow from API to database?"

Traditional tools couldn't help. So I built Repo2Txt.

## How It Works

```bash
# Enter a GitHub URL
https://github.com/user/repo

# Get a single, LLM-ready text file
repo.txt (with entire codebase structured)
```

The tool:
1. **Fetches** the repository via GitHub API
2. **Filters** out binary files, node_modules, build artifacts
3. **Structures** each file with clear markers
4. **Outputs** a single text file ready for LLM consumption

### Smart Filtering

Not everything belongs in the context:

```typescript
const IGNORE_PATTERNS = [
  'node_modules/**',
  'dist/**',
  'build/**',
  '.git/**',
  '*.lock',
  '*.min.js',
  'package-lock.json',
  '*.png', '*.jpg', '*.gif'
];
```

## The Output Format

```
================
File: src/index.ts
================
import { app } from './app';
// ... file contents

================
File: src/app.ts
================
export const app = express();
// ... file contents
```

## Real Workflow

1. **Run Repo2Txt** on target repository
2. **Upload** to Google AI Studio (Gemini's 1M token context)
3. **Ask questions** about architecture, patterns, bugs
4. **Get answers** with actual file references

> "Understanding a codebase in hours instead of days. That's the power of LLMs with full context."

## Use Cases

Since launch, people have used it for:

| Use Case | Benefit |
|----------|---------|
| Onboarding | Understand new projects in hours |
| Code review | Analyze entire PRs at once |
| Security audit | Find vulnerabilities across codebase |
| Documentation | Generate docs from code |
| Learning | Study well-written open source |

## Technical Details

Built with TypeScript and deployed on Vercel:

```typescript
// Core function
async function repoToText(repoUrl: string): Promise<string> {
  const files = await fetchRepoFiles(repoUrl);
  const filtered = filterIgnoredFiles(files);
  const structured = formatForLLM(filtered);
  return structured;
}
```

## Pro Tips

1. **Start broad** - Ask high-level questions first
2. **Request file paths** - Get references in responses
3. **Iterate** - Drill down into specific areas
4. **Combine** - Use with specific file deep-dives

## Try It

Live at [repo-2-txt.vercel.app](https://repo-2-txt.vercel.app/)

```bash
# Or run locally
git clone https://github.com/ahkamboh/repo2txt
npm install
npm run dev
```

---

*This tool is free and open source. Use it to understand any codebase faster.*
