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
  },

  computed: {
    seoTitle() {
      if (this.eventsPage.content.seo && this.eventsPage.content.seo.title)
        return this.eventsPage.content.seo.title;
      return undefined;
    },
    seoDescription() {
      if (
        this.eventsPage.content.seo &&
        this.eventsPage.content.seo.description
      )
        return this.eventsPage.content.seo.description;
      return undefined;
    },
    seoImage() {
      return undefined;
    },
    seoPageUrl() {
      return `https://www.mydelgrossopark.com/${this.eventsPage.content.slug.current}/`;
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
      link: [{ rel: "cannonical", href: this.seoPageUrl }],
      __dangerouslyDisableSanitizersByTagID: {
        ogimage: ["content"]
      }
    };
  }
};
</script>

<style lang="scss" scoped></style>
