<template>
  <article>
    <PageHeader
      :title="parkRidesPage.content.title"
      :image="parkRidesPage.content.mainImage"
    />
    <SectionsRenderer :sections="parkRidesPage.content.sectionsTop" />

    <!-- <script>
        console.log({{ ride }})
      </script> -->

    <CardGridWrapper title="Park Rides List">
      <CardGrid
        v-for="ride in rides"
        :key="ride._id"
        :title="ride.content.name"
        :image="ride.content.mainImage"
        :tags="rideTag(ride.content.category)"
        :description="ride.content.description"
        :url="`${ride.content.slug.current}/`"
      />
    </CardGridWrapper>

    <SectionsRenderer :sections="parkRidesPage.content.sectionsBottom" />
  </article>
</template>

<script>
const query = /* groq */ `{
  "parkRidesPage": *[_id == 'parkRides'][0],
  "rides": *[ _type == "attraction" && content.category match 'Amusement']
}
`;

export default {
  name: "parkRidesPage",
  asyncData({ $sanity }) {
    const sanityCall = $sanity.fetch(query);
    // console.log("🎈 asyncData: called", sanityCall);
    return sanityCall;
  },
  methods: {
    rideTag(string) {
      const tagText = string.split("|")[1];
      return [tagText];
    }
  }
};
</script>

<style lang="scss" scoped></style>
