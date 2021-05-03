<template>
  <article>
    <PageHeader :title="page.content.title" :image="page.content.mainImage" />
    <SectionsRenderer :sections="page.content.sections" />
  </article>
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

  validate({ params, store, query }) {
    return (
      query.preview === "true" ||
      store.state.eventsSlugs.includes(`${params.page}`)
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
