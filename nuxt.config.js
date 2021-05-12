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
  modules: ["@nuxtjs/redirect-module"],

  redirect: [
    // Redirect options here
    { from: "^/groups/group-picnics/", to: "/group-picnics/", statusCode: 301 },
    {
      from: "^/attractions/rides/",
      to: "/amusement-park-rides/",
      statusCode: 301
    },
    {
      from: "^/attractions/laguna-splash-water-park/",
      to: "/laguna-splash-water-park-attractions/",
      statusCode: 301
    },
    {
      from: "^/attractions/cabana-rental-information/",
      to: "/waterpark-cabana-rental-information/",
      statusCode: 301
    },
    { from: "^/events/events-calendar/", to: "/events/", statusCode: 301 },
    {
      from: "^/food/spaghetti-wednesday/",
      to: "/food/spaghetti-wednesdays/",
      statusCode: 301
    },
    {
      from: "^/hours/operating-hours/",
      to: "/hours-and-schedule-of-operation/",
      statusCode: 301
    },
    {
      from: "^/tickets/all-day-fun-pass/",
      to: "/passes/all-day-fun-pass/",
      statusCode: 301
    },
    {
      from: "^/tickets/sundowner-fun-passes/",
      to: "/passes/sundowner-fun-pass/",
      statusCode: 301
    },
    {
      from: "^/tickets/season-pass/",
      to: "/passes/season-pass/",
      statusCode: 301
    },
    {
      from: "^/tickets/individual-ride-tickets/",
      to: "/ride-tickets/",
      statusCode: 301
    },
    {
      from: "^/tickets/2020-season-pass-information/",
      to: "/2020-season-pass-information/",
      statusCode: 301
    },
    { from: "^/tickets/gift-cards/", to: "/gift-cards/", statusCode: 301 },
    { from: "^/groups/", to: "/group-picnics/", statusCode: 301 },
    { from: "^/groups/group-picnics/", to: "/group-picnics/", statusCode: 301 },
    {
      from: "^/groups/groups-pricing/",
      to: "/groups-pricing/",
      statusCode: 301
    },
    {
      from: "^/groups/buddy-bears-birthday-roundhouse/",
      to: "/kids-birthday-parties-at-the-park/",
      statusCode: 301
    },
    {
      from: "^/groups/other-groups/",
      to: "/specialty-groups/",
      statusCode: 301
    },
    {
      from: "^/food/dg2go/",
      to: "https://www.dg2gofood.com/",
      statusCode: 301
    },
    {
      from: "^/food/pick-up-delivery-catering/",
      to: "/famous-food/pick-up-delivery-catering/",
      statusCode: 301
    },
    {
      from: "^/food/food-menus/",
      to: "/famous-food/food-menus/",
      statusCode: 301
    },
    {
      from: "^/food/food-allergen-information/",
      to: "/food-allergens/",
      statusCode: 301
    },
    {
      from: "^/food/the-delgrosso-food-tradition/",
      to: "/famous-food/the-delgrosso-food-tradition/",
      statusCode: 301
    },
    { from: "^/news/current-news-releases/", to: "/news/", statusCode: 301 },
    {
      from: "^/park-info/covid-19-safety-guidelines/",
      to: "/covid-19-safety-guidelines/",
      statusCode: 301
    },
    {
      from: "^/park-info/employment-opportunities/",
      to: "/employment/",
      statusCode: 301
    },
    { from: "^/park-info/directions/", to: "/directions/", statusCode: 301 },
    { from: "^/park-info/closures/", to: "/closures/", statusCode: 301 },
    {
      from: "^/park-info/guest-policies/",
      to: "/policies-info-and-faqs/",
      statusCode: 301
    },
    // {
    //   from: "^/park-info/rider-safety-accessibility-guide/",
    //   to: "",
    //   statusCode: 301
    // },
    {
      from: "^/map/",
      to: "/park-map/",
      statusCode: 301
    },
    {
      from: "^/park-info/faqs/",
      to: "/policies-info-and-faqs/",
      statusCode: 301
    },
    {
      from: "^/park-info/locker-scooter-and-stroller-rentals/",
      to: "/locker-scooter-and-stroller-rentals/",
      statusCode: 301
    },
    {
      from: "^/park-info/information-booth/",
      to: "guest-relations-and-info-booth",
      statusCode: 301
    },
    {
      from: "^/park-info/first-aid-infant-care-center/",
      to: "/first-aid-infant-and-care-center/",
      statusCode: 301
    },
    { from: "^/park-info/history/", to: "/our-history/", statusCode: 301 },
    {
      from: "^/park-info/affiliations/",
      to: "/friends-of-the-park/",
      statusCode: 301
    },
    {
      from: "^/park-info/affiliations/sponsors/",
      to: "/sponsors/",
      statusCode: 301
    },
    {
      from: "^/park-info/affiliations/friends-of-the-park/",
      to: "/friends-of-the-park/",
      statusCode: 301
    },
    {
      from: "^/park-info/donation-requests/",
      to: "donation-requests",
      statusCode: 301
    },
    { from: "^/park-info/contact-us/", to: "", statusCode: 301 },
    { from: "^/park-info/contact-us/", to: "/contact/", statusCode: 301 }
  ],

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
