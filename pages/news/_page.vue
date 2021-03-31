<template>
  <article>
    News Page
    <h1>{{ page.content.title }}</h1>
    <!-- <img :src="$urlFor(page.poster)" :alt="page.title + ' poster'" />
    <SanityContent :blocks="page.overview" :serializers="serializers" /> -->
  </article>
</template>

<script>
import externalLink from '@/components/serializers/externalLink'

const query = /* groq */ `{ "page": *[_type == 'newsItem' && content.slug.current == $slug] | order(_updatedAt desc)[0]}`

export default {
  name: 'NewsItemPage',

  // validate({ params, store, query }) {
  //   // console.log('params:', params)
  //   // If FALSE redirect to 404 page
  //   return (
  //     query.preview === 'true' || store.state.pagesSlugs.includes(params.page)
  //   )
  // },

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

}
</script>