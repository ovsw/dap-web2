import { createClient } from '@nuxtjs/sanity'
import fetch from 'node-fetch'
if (!globalThis.fetch) {
  globalThis.fetch = fetch
}

const configSanity = {
  projectId: '0un18sqx',
  useCdn: false,
  minimal: true,
  dataset: 'production',
  // token: process.env.NODE_ENV == "development" ? process.env.SANITY_READ_TOKEN : ''
}
const client = createClient(configSanity)

export default {
  // privateRuntimeConfig: {
  //   sanity: {
  //     token: process.env.SANITY_READ_TOKEN,
  //   },
  // },
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
    '@/assets/scss/critical.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/sanity.js',
    '~plugins/preview.client.js',
    '~plugins/image-builder.js',
    '~/plugins/to-link.js',
    '~/plugins/lightbox.client.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/style-resources',
    '@nuxtjs/sanity'
  ],

  googleFonts: {
    display: 'swap',
    download: true,
    overwriting: false,
    families: {
      'Overpass': {
        wght: [400, 600, 700],
        ital: [400]
      },
      Raleway: {
        wght: [800, 900]
      },
    }
  },

  styleResources: {
    // your settings here
    scss: [
      'assets/scss/_gorko.scss'
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
    //subFolders: false,
    fallback: true,
    crawler: false,
    async routes() {
      const pages = await client.fetch(`*[_type == "page"]`)
      const newsItems = await client.fetch(`*[_type == "newsItem"]`)

      return [
        ...pages.map((page) => {
          // console.log('creting route for: ', `/${page.content.slug.current}/`)
          return {
            route: `/${page.content.slug.current}/`,
            payload: page,
          }
        }), 
        ...newsItems.map((page) => {
          // console.log('creting route for: ', `/news/${page.content.slug.current}/`)
          return {
            route: `/news/${page.content.slug.current}/`,
            payload: page,
          }
        })
      ]
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


