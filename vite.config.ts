import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  plugins: [tsconfigPaths()],
  server:{
    port: 3000
  }
});
