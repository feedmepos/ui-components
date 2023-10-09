import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';
import { defineConfig, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';
import topLevelAwait from 'vite-plugin-top-level-await';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config: UserConfig = {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
  if (mode == 'library') {
    config.build = {
      outDir: './dist',
      target: 'esnext',
      lib: {
        // src/indext.ts is where we have exported the component(s)
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'feedmpos-ui-library',
        // the name of the output files when the build is run
        fileName: (format) => `feedmpos-ui-library.${format}.js`,
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['vue'],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            vue: 'Vue',
          },
        },
      },
    };
  } else if (mode == 'federation') {
    config.plugins?.push([
      //handle for module federation
      topLevelAwait({
        // The export name of top-level await promise for each chunk module
        promiseExportName: '__tla',
        // The function to generate import names of top-level await promise in each chunk module
        promiseImportName: (i) => `__tla_${i}`,
      }),
      federation({
        name: '@feedmepos/ui-components',
        filename: 'feedmepos-ui-components.js',
        // Modules to expose
        exposes: {
          './FmButton': './src/components/button/FmButton.vue',
        },
        shared: ['vue'],
      }),
    ]);
    config.build = {
      outDir: 'temp',
    };
    //
  }
  return config;
});
