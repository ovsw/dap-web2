<template>
  <article>
    <PageHeader
      :title="waterAttractionsPage.content.title"
      :image="waterAttractionsPage.content.mainImage"
    />
    <SectionsRenderer :sections="waterAttractionsPage.content.sectionsTop" />

    <!-- <script>
        console.log({{ ride }})
      </script> -->

    <CardGridWrapper title="Laguna Splash Water Park Attractions List">
      <CardGrid
        v-for="ride in rides"
        :key="ride._id"
        :title="ride.content.name"
        :image="ride.content.mainImage"
        :description="ride.content.description"
        :url="`${ride.content.slug.current}/`"
      />
    </CardGridWrapper>

    <SectionsRenderer :sections="waterAttractionsPage.content.sectionsBottom" />
  </article>
</template>

<script>
const query = /* groq */ `{
  "waterAttractionsPage": *[_id == 'waterParkAttractions'][0],
  "rides": *[ _type == "attraction" && content.category match 'Water']
}
`;

export default {
  name: "waterParkAttractionsPage",
  asyncData({ $sanity }) {
    const sanityCall = $sanity.fetch(query);
    // console.log("🎈 asyncData: called", sanityCall);
    return sanityCall;
  },

  computed: {
    seoTitle() {
      if (
        this.waterAttractionsPage.content.seo &&
        this.waterAttractionsPage.content.seo.title
      )
        return this.waterAttractionsPage.content.seo.title;
      return undefined;
    },
    seoDescription() {
      if (
        this.waterAttractionsPage.content.seo &&
        this.waterAttractionsPage.content.seo.description
      )
        return this.waterAttractionsPage.content.seo.description;
      return undefined;
    },
    seoImage() {
      return undefined;
    },
    seoPageUrl() {
      return `https://www.mydelgrossopark.com/laguna-splash-water-park-attractions/`;
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
