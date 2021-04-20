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
const query = /* groq */ `{ "page": *[_type == 'attraction' && content.slug.current == $slug] | order(_updatedAt desc)[0]}`;

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
      return { page: payload };
    }
    // console.log('no payload, refetching')
    return $sanity.fetch(query, {
      slug: fullSlug
    });
  }
};
</script>
