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
    <section class="py-24">
      <div class="container mx-auto">
        <h2 class="mb-10">Laguna Splash Water Park Attractions List</h2>
        <ul
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-6 "
        >
          <CardGrid
            v-for="ride in rides"
            :key="ride._id"
            :title="ride.content.name"
            :image="ride.content.mainImage"
            :description="ride.content.description"
            :url="`${ride.content.slug.current}/`"
          />
        </ul>
      </div>
    </section>

    <SectionsRenderer :sections="parkRidesPage.content.sectionsBottom" />
  </article>
</template>

<script>
const query = /* groq */ `{
  "parkRidesPage": *[_id == 'parkRides'][0],
  "rides": *[ _type == "attraction" && content.category match 'Water']
}
`;

export default {
  name: "parkRidesPage",
  asyncData({ $sanity }) {
    const sanityCall = $sanity.fetch(query);
    // console.log("🎈 asyncData: called", sanityCall);
    return sanityCall;
  }
};
</script>

<style lang="scss" scoped></style>
