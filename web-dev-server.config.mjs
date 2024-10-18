import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  rootDir: './',
  nodeResolve: true,
  watch: true,
  plugins: [esbuildPlugin({ ts: true })],
  open: true,
  appIndex: 'index.html',
  port: 3000,
};
