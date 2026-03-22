import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  base: '/web/astro',
  trailingSlash: 'always',
});
