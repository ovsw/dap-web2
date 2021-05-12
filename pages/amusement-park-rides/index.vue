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
  },

  computed: {
    seoTitle() {
      if (
        this.parkRidesPage.content.seo &&
        this.parkRidesPage.content.seo.title
      )
        return this.parkRidesPage.content.seo.title;
      return undefined;
    },
    seoDescription() {
      if (
        this.parkRidesPage.content.seo &&
        this.parkRidesPage.content.seo.description
      )
        return this.parkRidesPage.content.seo.description;
      return undefined;
    },
    seoImage() {
      return undefined;
    },
    seoPageUrl() {
      return `https://www.mydelgrossopark.com/amusement-park-rides/`;
    },
    seoShareImage() {
      return undefined;
    }
  },

  head() {
    return {
      title: this.seoTitle,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.seoDescription
        },
        {
          hid: "ogtitle",
          name: "og:title",
          content: this.seoTitle
        },
        {
          hid: "ogdescription",
          name: "og:description",
          content: this.seoDescription
        },
        {
          hid: "ogimage",
          name: "og:image",
          content: this.seoShareImage
        },
        {
          hid: "ogurl",
          name: "og:url",
          content: this.seoPageUrl
        }
      ],
      link: [{ rel: "canonical", href: this.seoPageUrl }],
      __dangerouslyDisableSanitizersByTagID: {
        ogimage: ["content"]
      }
    };
  }
};
</script>

<style lang="scss" scoped></style>
