<template>
  <article>
    <h1>{{ page.content.title }}</h1>
    <!-- <img :src="$urlFor(page.poster)" :alt="page.title + ' poster'" />
    <SanityContent :blocks="page.overview" :serializers="serializers" /> -->
  </article>
</template>

<script>
import externalLink from '@/components/serializers/externalLink'

const query = /* groq */ `{ "page": *[_type == 'page' && content.slug.current == $slug] | order(_updatedAt desc)[0]}`

export default {
  name: 'Page',

  validate({ params, store, query }) {
    // console.log('params:', params)
    // If FALSE redirect to 404 page
    return (
      query.preview === 'true' || store.state.pagesSlugs.includes(params.page)
    )
  },

  asyncData({ $sanity, params, payload }) {
    if (payload) {
      return { page: payload }
    }
    return $sanity.fetch(query, {
      slug: params.page,
    })
  },

  data() {
    return {
      serializers: {
        marks: {
          link: externalLink,
        },
      },
    }
  },
}
</script>