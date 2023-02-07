import * as esbuild from 'esbuild'

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
  plugins: [
    {
      name: 'alias',
      setup({ onResolve, resolve }) {
        onResolve(
          { filter: /^prompts$/, namespace: 'file' },
          async ({ importer, resolveDir }) => {
            const result = await resolve('prompts/lib/index.js', {
              importer,
              resolveDir
            })
            return result
          }
        )
      }
    }
  ]
})
