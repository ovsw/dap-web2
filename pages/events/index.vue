<template>
  <article>
    <PageHeader
      :title="eventsPage.content.title"
      :image="eventsPage.content.mainImage"
    />
    <SectionsRenderer :sections="eventsPage.content.sectionsTop" />

    <!-- <script>
        console.log({{ ride }})
      </script> -->

    <CardGridWrapper>
      <CardGrid
        v-for="event in events"
        :key="event._id"
        :date="event.content.date"
        :title="event.content.title"
        :tags="event.content.tags"
        :image="event.content.mainImage"
        :description="event.content.description"
        :url="`${event.content.slug.current}/`"
      />
    </CardGridWrapper>

    <SectionsRenderer :sections="eventsPage.content.sectionsBottom" />
  </article>
</template>

<script>
const query = /* groq */ `{
  "eventsPage": *[_id == 'eventsPage'][0],
  "events": *[ _type == "event"] | order(content.date asc)
}
`;

export default {
  name: "EventsPage",
  asyncData({ $sanity }) {
    const sanityCall = $sanity.fetch(query);
    // console.log("🎈 asyncData: called", sanityCall);
    return sanityCall;
  }
};
</script>

<style lang="scss" scoped></style>
