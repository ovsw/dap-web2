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
  }
};
</script>
