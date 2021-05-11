import { createClient } from "@nuxtjs/sanity";
import fetch from "node-fetch";
import sectionQueries from "./sanityFragments/sectionQueries";

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}

const configSanity = {
  projectId: "0un18sqx",
  useCdn: false,
  minimal: true,
  dataset: "production"
  // token: process.env.NODE_ENV == "development" ? process.env.SANITY_READ_TOKEN : ''
};
const client = createClient(configSanity);

const getdefaultSeoInfo = async function seoInfo() {
  const response = await client.fetch(/* groq */ `*[ _id == "siteSettings"] {
      "seo": content.seo
    }[0]`);
  return response;
};

getdefaultSeoInfo().then(response => console.log("xxxxxxx", response));

// console.log("xxxxxxxxxxxxxx", defaultSeoInfo());

const seoTitle =
  "DelGrosso's Amusement Park & Laguna Splash Water Park in Tipton, PA";
const seoDescription =
  "DelGrosso's Pennsylvania amusement park offers family fun at an affordable price, including kids and adults games, rides, and an amazing water park!";
const seoSocialShareImage =
  "/delgrosso-amusement-park-laguna-splash-default-social-image.jpg";
const seoCannonicalUrl = "https://www.mydelgrossopark.com";

export default {
  // privateRuntimeConfig: {
  //   sanity: {
  //     token: process.env.SANITY_READ_TOKEN,
  //   },
  // },
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: seoTitle,
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: seoDescription
      },
      {
        hid: "ogtitle",
        name: "og:title",
        content: seoTitle
      },
      {
        hid: "ogdescription",
        name: "og:description",
        content: seoDescription
      },
      {
        hid: "ogimage",
        name: "og:image",
        content: seoSocialShareImage
      },
      {
        hid: "msTitleColor",
        name: "msapplication-TileColor",
        content: "#2D8262"
      },
      {
        hid: "theme-color",
        name: "msapplication-TileColor",
        content: "#ffffff"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico?v=2" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
      },
      {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "32x32",
        href: "/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#ff7700" }
      // { rel: "cannonical", href: seoCannonicalUrl }
    ]
  },

  googleFonts: {
    subsets: "latin",
    display: "swap",
    // download: true,
    // overwriting: true,
    // fontsDir: 'fonts',
    // fontsPath: '~assets/fonts',
    families: {
      Overpass: true,
      "Open+Sans": {
        wght: [400, 600, 700],
        ital: [400, 600]
      },
      Raleway: {
        wght: [400, 800, 900]
      }
    }
  },

  tailwindcss: {
    jit: true
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~plugins/vue-instantsearch.js",
    "~plugins/filters.js",
    "~plugins/sanity.js",
    "~plugins/preview.client.js",
    "~plugins/image-builder.js",
    "~/plugins/to-link.js",
    "~/plugins/lightbox.client.js",
    "~/plugins/axe.client.js"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxtjs/svg-sprite",
    "@nuxtjs/sanity/module"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vue-instantsearch", "instantsearch.js/es"]
  },

  // GENERATE DYNAMIC PAGES FROM SANITY
  generate: {
    //subFolders: false,
    fallback: true,
    crawler: false,
    async routes() {
      const pages = await client.fetch(/* groq */ `*[_type == "page" || _type == "simplePage"] {
          ...,
          content {
            ...,
            sections[] {
              ...,
              ${sectionQueries}
            }
          }
        }`);
      const parkRides = await client.fetch(
        /* groq */ `*[ _type == "attraction" && content.category match "Amusement"]`
      );
      const waterParkAttractions = await client.fetch(
        /* groq */ `*[ _type == "attraction" && content.category match "Water"]`
      );
      const newsItems = await client.fetch(`*[_type == "newsItem"]`);
      const events = await client.fetch(/* groq */ `*[_type == "event"] {
          ...,
          content {
            ...,
            sections[] {
              ...,
              ${sectionQueries}
            }
          }
        }`);

      return [
        ...pages.map(page => {
          // console.log('creting route for: ', `/${page.content.slug.current}/`)
          return {
            route: `/${page.content.slug.current}/`,
            payload: page
          };
        }),
        ...parkRides.map(page => {
          // console.log('creting route for: ', `/${page.content.slug.current}/`)
          return {
            route: `/amusement-park-rides/${page.content.slug.current}/`,
            payload: page
          };
        }),
        ...waterParkAttractions.map(page => {
          // console.log('creting route for: ', `/${page.content.slug.current}/`)
          return {
            route: `/laguna-splash-water-park-attractions/${page.content.slug.current}/`,
            payload: page
          };
        }),
        ...newsItems.map(page => {
          // console.log('creting route for: ', `/news/${page.content.slug.current}/`)
          return {
            route: `/news/${page.content.slug.current}/`,
            payload: page
          };
        }),
        ...events.map(page => {
          // console.log('creting route for: ', `/news/${page.content.slug.current}/`)
          return {
            route: `/events/${page.content.slug.current}/`,
            payload: page
          };
        })
      ];
    }
  },

  router: {
    trailingSlash: true
  },

  sanity: {
    ...configSanity,
    withCredentials: true
  }
};
