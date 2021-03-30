<template>
  <div>
    <h1>Home</h1>
      <div v-for="section in siteHome.content.sections" :key="section._key">

          <!-- {{section.title}}
         {{section._type}} -->
            
        <SectionsMagSection v-if="section._type == 'magSection'" v-bind:section="section"/>
           
      </div>
  </div>
</template>

<script>
const query = /* groq */ `{
  "siteHome": *[_type == 'siteHome'] {
    ...
  }[0]
}
`

export default {
  name: 'siteHome',
  asyncData({ $sanity }) {
    return $sanity.fetch(query)
  },
}
</script>