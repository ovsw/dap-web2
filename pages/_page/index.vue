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

const query = /* groq */ `{ "page": *[(_type == 'page' || _type== 'simplePage') && content.slug.current == $slug] | order(_updatedAt desc)[0]}`;

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
        : this.page.content.headerImage;
    }
  }
};
</script>
