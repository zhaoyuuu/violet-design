import basicConfig from './rollup.config'
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle'
import { visualizer } from 'rollup-plugin-visualizer'

const config = {
  ...basicConfig,
  output: [
    {
      file: 'dist/index.es.js',
      format: 'es',
    },
  ],
  plugins: [
    ...basicConfig.plugins,
    excludeDependenciesFromBundle(),
    visualizer(),
  ],
}

export default config
