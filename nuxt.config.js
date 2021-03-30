import { createClient } from '@nuxtjs/sanity'
import fetch from 'node-fetch'
if (!globalThis.fetch) {
  globalThis.fetch = fetch
}

const configSanity = {
  projectId: '0un18sqx',
  useCdn: true,
  minimal: true,
  dataset: 'production',
}

const client = createClient(configSanity)

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'web',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/preview.client.js',
    '~plugins/image-builder.js',
    '~/plugins/to-link.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/sanity'
  ],

  styleResources: {
    // your settings here
    scss: [
      'assets/scss/_variables.scss'
    ],
   },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // GENERATE DYNAMIC PAGES FROM SANITY
  generate: {
    fallback: true,
    crawler: false,
    async routes() {
      const movies = await client.fetch(`*[_type == "movie"]`)
      return movies.map((movie) => {
        return {
          route: `/movies/${movie.slug.current}/`,
          payload: movie,
        }
      })
    },
  },

  router: {
    trailingSlash: true,
  },

  sanity: {
    ...configSanity,
    withCredentials: true,
  },
}


