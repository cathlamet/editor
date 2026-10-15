import { cpSync } from 'node:fs';
import { resolve } from 'node:path';
import pkg from './package.json' with { type: 'json' };

const isProduction = process.env.NODE_ENV === 'production';

try {
  cpSync(
    resolve(import.meta.dirname, '../../node_modules/three/examples/jsm/libs/basis'),
    resolve(import.meta.dirname, 'public/basis'),
    {
      recursive: true,
      filter: (src) => src.endsWith('basis') || src.endsWith('.js') || src.endsWith('.wasm')
    },
  );
}
catch (err) {
  console.error('Failed to copy transcoders:', err);
}

// FIXME: TODO: remove when fixed: https://github.com/nitrojs/nitro/issues/2749
function viteHeadersPlugin (headers) {
  return {
    name: "configure-response-headers",
    configureServer: server => {
      server.middlewares.use((_req, res, next) => {
        for (const key of Object.keys(headers)) {
          res.setHeader(key, headers[key])
        }
        next()
      })
    },
  }
}

export default defineNuxtConfig({
  compatibilityDate: '2026-08-10',
  devtools: {
    enabled: false
  },
  telemetry: false,
  ssr: false,
  css: ['~/assets/style/main.sass'],
  router: {
    options: {
      hashMode: isProduction
    }
  },
  app: {
    cdnURL: isProduction ? './' : undefined
  },
  runtimeConfig: {
    public: {
      DEVELOPMENT: !isProduction,
      CLIENT_VERSION: pkg?.version ?? '0.0.0',
    }
  },
  experimental: {
    payloadExtraction: false
  },
  build: {
    transpile: ['three']
  },

  components: {
    dirs: [
      '~/components',
      {
        path: '../../node_modules/@ark-ui/vue',
        pattern: '**/index.js',
        prefix: 'Ark',
        global: true
      }
    ]
  },

  // headers needed for SharedArrayBuffer
  routeRules: {
    '/**': {
      headers: {
        // 'Access-Control-Allow-Origin': '*',
        // 'Cross-Origin-Resource-Policy': 'same-origin',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
      }
    }
  },

  vite: {
    resolve: {
      dedupe: ['three']
    },
    optimizeDeps: {
      include: ['three']
    },
    build: {
      chunkSizeWarningLimit: 2000
    },

    // FIXME: TODO: remove when fixed: https://github.com/nitrojs/nitro/issues/2749
    plugins: [
      viteHeadersPlugin({
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
      })
    ],
  },

  nitro: {
    embedded: isProduction,
    esbuild: {
      options: {
        target: 'esnext'
      }
    },
    prerender: {
      crawlLinks: true
    }
  }
})
