<template>
  <article v-if="page">
    <PageHeader
      :title="page.content.title"
      :image="page.content.mainImage"
      :narrow="true"
    />
    <SimplePageContent :page="page" />
  </article>
  <div v-else>
    <PageHeader title="News Article Not Found" />
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-center">404 - News Article Not Found</h1>
      <p class="text-center mt-4">The news article you're looking for doesn't exist.</p>
    </div>
  </div>
</template>

<script>
import externalLink from "@/components/serializers/externalLink";

const query = /* groq */ `{ "page": *[_type == 'newsItem' && content.slug.current == $slug] | order(_updatedAt desc)[0]}`;

export default {
  name: "NewsItemPage",

  // validate({ params, store, query }) {
  //   // console.log('params:', params)
  //   // If FALSE redirect to 404 page
  //   return (
  //     query.preview === 'true' || store.state.pagesSlugs.includes(params.page)
  //   )
  // },

  async asyncData({ $sanity, params, payload }) {
    if (payload) {
      return { page: payload };
    }
    
    try {
      const result = await $sanity.fetch(query, {
        slug: params.page
      });
      
      // Ensure we always return a page property, even if null
      return { page: result.page || null };
    } catch (error) {
      console.error('Error fetching news item:', error);
      return { page: null };
    }
  },

  data() {
    return {
      serializers: {
        marks: {
          link: externalLink
        }
      }
    };
  },

  computed: {
    seoTitle() {
      if (!this.page) return "News Article Not Found";
      if (this.page.content.seo && this.page.content.seo.title)
        return this.page.content.seo.title;
      return undefined;
    },
    seoDescription() {
      if (!this.page) return undefined;
      if (this.page.content.seo && this.page.content.seo.description)
        return this.page.content.seo.description;
      return undefined;
    },
    seoImage() {
      return undefined;
    },
    seoPageUrl() {
      if (!this.page || !this.page.content.slug) return "https://www.mydelgrossopark.com/";
      return `https://www.mydelgrossopark.com/news/${this.page.content.slug.current}/`;
    },
    seoShareImage() {
      return undefined;
    }
  },

  head() {
    return {
      title: this.seoTitle,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.seoDescription
        },
        {
          hid: "ogtitle",
          name: "og:title",
          content: this.seoTitle
        },
        {
          hid: "ogdescription",
          name: "og:description",
          content: this.seoDescription
        },
        {
          hid: "ogimage",
          name: "og:image",
          content: this.seoShareImage
        },
        {
          hid: "ogurl",
          name: "og:url",
          content: this.seoPageUrl
        }
      ],
      link: [{ rel: "canonical", href: this.seoPageUrl }],
      __dangerouslyDisableSanitizersByTagID: {
        ogimage: ["content"]
      }
    };
  }

  /* Possible implementation of real-time preview. Requires @sanity/client.
  mounted() {
    if (this.$route.query.preview)
      this.$sanity
        .listen('*[_type == "movie" && slug.current == $slug][0] | order(_updatedAt desc)[0]', {
          slug: this.$route.params.slug,
        })
        .subscribe(async (update) => {
          // Doesn't work for references
          // this.movie = update.result
          // this.$nuxt.refresh()
          try {
            this.movie = await this.$sanity.fetch(
              "*[_type == 'movie' && slug.current == $slug][0]",
              {
                slug: this.$route.params.slug,
              }
            )
          } catch (error) {
            console.error(error)
          }
        })
  }, */
};
</script>
