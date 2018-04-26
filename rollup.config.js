// Rollup plugins
import typescript from 'rollup-plugin-typescript2';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'src/main.ts',
  output: {
    name: 'Hammer',
    file: 'dist/hammerspace.min.js',
    format: 'iife'
  },
  plugins: [typescript(), uglify()]
};
