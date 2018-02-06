import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/colorado.js',
    format: 'cjs',
  },
  plugins: [
    typescript({
      tsconfig: 'tsconfig.prod.json',
      typescript: require('typescript'),
    })
  ]
}
