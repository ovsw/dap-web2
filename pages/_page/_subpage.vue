<template>
  <article>
    <PageHeader
      :title="page.content.title"
      :image="page.content.mainImage"
      :narrow="page._type == 'simplePage' ? true : false"
    />
    <template v-if="page._type == 'page'">
      <SectionsRenderer :sections="page.content.sections" />
    </template>
    <template v-if="page._type == 'simplePage'">
      <SimplePageContent :page="page" />
    </template>
  </article>
</template>

<script>
import sectionQueries from "@/sanityFragments/sectionQueries";

const query = /* groq */ `{ "page": *[_type == 'page' && content.slug.current == $slug] {
          ...,
          content {
            ...,
            sections[] {
              ...,
              ${sectionQueries}
            }
          }
        } | order(_updatedAt desc)[0]}`;

export default {
  name: "Page",

  validate({ params, store, query }) {
    return (
      query.preview === "true" ||
      store.state.pagesSlugs.includes(`${params.page}/${params.subpage}`)
    );
  },

  asyncData({ $sanity, params, payload }) {
    const fullSlug = `${params.page}/${params.subpage}`;
    // console.log('params: ', fullSlug)
    if (payload) {
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
      return undefined;
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
