<template>
  <article v-if="page">
    <PageHeader :title="page.content.title" :image="page.content.mainImage" />
    <SectionsRenderer :sections="page.content.sections" />
  </article>
  <div v-else>
    <PageHeader title="Event Not Found" />
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-center">404 - Event Not Found</h1>
      <p class="text-center mt-4">The event you're looking for doesn't exist.</p>
    </div>
  </div>
</template>

<script>
const query = /* groq */ `{ "page": *[_type == 'event' && content.slug.current == $slug] {
          ...,
          content {
            ...,
            sections[] {
              ...,
              _type == "sponsorsSection" => {
                sponsorsList[]->{
                  ...
                }
              },
              _type == "faqSection" => {
                faqItems[]->{
                  ...
                }
              }
            }
          }
        } | order(content.date desc)[0]}`;

export default {
  name: "EventPage",


  async asyncData({ $sanity, params, payload }) {
    const fullSlug = `${params.page}`;
    // console.log('params: ', fullSlug)
    if (payload) {
      return { page: payload };
    }
    
    try {
      // console.log('no payload, refetching')
      const result = await $sanity.fetch(query, {
        slug: fullSlug,
      });
      
      // Ensure we always return a page property, even if null
      return { page: result.page || null };
    } catch (error) {
      console.error('Error fetching event:', error);
      return { page: null };
    }
  },

  computed: {
    seoTitle() {
      if (!this.page) return "Event Not Found";
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
      return `https://www.mydelgrossopark.com/events/${this.page.content.slug.current}/`;
    },
    seoShareImage() {
      return undefined;
    },
  },

  head() {
    return {
      title: this.seoTitle,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.seoDescription,
        },
        {
          hid: "ogtitle",
          name: "og:title",
          content: this.seoTitle,
        },
        {
          hid: "ogdescription",
          name: "og:description",
          content: this.seoDescription,
        },
        {
          hid: "ogimage",
          name: "og:image",
          content: this.seoShareImage,
        },
        {
          hid: "ogurl",
          name: "og:url",
          content: this.seoPageUrl,
        },
      ],
      link: [{ rel: "canonical", href: this.seoPageUrl }],
      __dangerouslyDisableSanitizersByTagID: {
        ogimage: ["content"],
      },
    };
  },
};
</script>
