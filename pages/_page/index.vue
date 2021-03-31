<template>
  <article>
    <h1>{{ page.content.title }}</h1>
    <div v-for="section in page.content.sections" :key="section._key">

          <!-- {{section.title}}
         {{section._type}} -->
            
        <SectionsMagSection v-if="section._type == 'magSection'" v-bind:section="section"/>
           
      </div>
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