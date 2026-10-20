export function getVue3Template(projectName: string) {
  return [
    {
      path: 'package.json',
      content: `{
  "name": "${projectName}",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.4.21"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.4",
    "typescript": "^5.2.2",
    "vite": "^5.2.0",
    "vue-tsc": "^2.0.6"
  }
}`
    },
    {
      path: 'vite.config.ts',
      content: `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
})`
    },
    {
      path: 'index.html',
      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Scaffzap Vue App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>`
    },
    {
      path: 'src/main.ts',
      content: `import { createApp } from 'vue'\nimport App from './App.vue'\n\ncreateApp(App).mount('#app')`
    },
    {
      path: 'src/App.vue',
      content: `<template>
  <div style="text-align: center; font-family: sans-serif; margin-top: 50px;">
    <h1 style="color: #42b883;">Zap! Vue 3 is ready.</h1>
  </div>
</template>`
    }
  ];
}