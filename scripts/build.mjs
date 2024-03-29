import * as esbuild from 'esbuild'
//todo: 1. 生成esm模块
await esbuild.build({
  bundle: true,
  entryPoints: ['packages/icecli/src/index.js'],
  outfile: 'packages/icecli/dist/outfile.cjs',
  format: 'cjs',
  sourcemap: false,
  platform: 'node',
  target: 'node16',
  resolveExtensions:['.js','.ts'],
  external: ['prettier'],
  treeShaking: true,
  drop: ["console", "debugger"],
  minify: true,
})
