<template>
  <article>
    <PageHeader
      :title="page.content.name"
      :image="page.content.mainImage"
      :narrow="page._type == 'simplePage' ? true : false"
    />
    <SectionsRenderer :sections="page.content.sections" />
    
  </article>
</template>

<script>
import sectionQueries from "@/sanityFragments/sectionQueries";

const query = /* groq */ `{ 
  "page": *[_type == 'attraction' && content.slug.current == $slug] {
          ...,
          foo: "bar",
          content {
            ...,
            sections[] {
              ...,
              ${sectionQueries}
            }
          }
        } | order(_updatedAt desc)[0]
  }`;

export default {
  name: "RidesPage",

  validate({ params, store, query }) {
    return (
      query.preview === "true" ||
      store.state.ridesSlugs.includes(`${params.page}`)
    );
  },

  asyncData({ $sanity, params, payload }) {
    const fullSlug = `${params.page}`;
    // console.log('params: ', fullSlug)
    if (payload) {
      console.log("payload", payload);
      return { page: payload };
    }
    // console.log('no payload, refetching')
    return $sanity.fetch(query, {
      slug: fullSlug
    });
  },

  computed: {
    seoTitle() {
      console.log("page", this.page);
      if (this.page.content.seo && this.page.content.seo.title)
        return this.page.content.seo.title;
      return this.page.title;
    },
    seoDescription() {
      if (this.page.content.seo && this.page.content.seo.description)
        return this.page.content.seo.description;
      return undefined;
    },
    seoImage() {
      return undefined;
    },
    seoPageUrl() {
      return `https://www.mydelgrossopark.com/${this.page.content.slug.current}/`;
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
};
</script>
