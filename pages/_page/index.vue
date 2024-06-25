<template>
  <article>
    <PageHeader
      :title="page.content.title"
      :image="pageHeaderImage"
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
import externalLink from "@/components/serializers/externalLink";
import sectionQueries from "@/sanityFragments/sectionQueries";

const query = /* groq */ `{ 
  "page": *[(_type == 'page' || _type== 'simplePage') && content.slug.current == $slug] {
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
  name: "Page",

  validate({ params, store, query }) {
    // console.log('params:', params)
    // If FALSE redirect to 404 page
    return (
      query.preview === "true" || store.state.pagesSlugs.includes(params.page)
    );
  },

  asyncData({ $sanity, params, payload }) {
    if (payload) {
      return { page: payload };
    }
    return $sanity.fetch(query, {
      slug: params.page
    });
  },

  computed: {
    pageHeaderImage() {
      return this.page._type == "simplePage"
        ? this.page.content.image
        : this.page.content.mainImage;
    },
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
