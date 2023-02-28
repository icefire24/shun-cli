import * as esbuild from 'esbuild'
//todo: 1. 生成esm模块
await esbuild.build({
  bundle: true,
  entryPoints: ['packages/icefirecli/src/index.js'],
  outfile: 'packages/icefirecli/outfile.cjs',
  format: 'cjs',
  sourcemap: true,
  platform: 'node',
  target: 'node16',
  resolveExtensions:['.js','.ts'],
  external: ['prettier'],
  treeShaking: true,
  // minify: true,
})
