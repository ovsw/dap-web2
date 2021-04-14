<template>
    <div>
      <h1>{{siteHome.content.hero.title}}</h1>
        <div>
        <div v-for="section in siteHome.content.sections" :key="section._key" >
          
          <SectionsMagSection v-if="section._type == 'magSection'" v-bind:section="section" />
      
        </div>
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
    const sanityCall = $sanity.fetch(query)
    console.log('🎈 asyncData: called', sanityCall )
    return sanityCall
  },
}
</script>