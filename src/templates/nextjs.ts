export function getNextJsTemplate(projectName: string) {
  return [
    {
      path: 'package.json',
      content: `{
  "name": "${projectName}",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next": "14.2.3"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0"
  }
}`
    },
    {
      path: 'tsconfig.json',
      content: `{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`
    },
    {
      path: 'app/layout.tsx',
      content: `export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}`
    },
    {
      path: 'app/page.tsx',
      content: `export default function Home() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ color: '#0070f3' }}>Zap! Next.js is ready.</h1>
    </main>
  )
}`
    },
    {
      path: 'next.config.mjs',
      content: `/** @type {import('next').NextConfig} */\nconst nextConfig = {};\nexport default nextConfig;`
    }
  ];
}