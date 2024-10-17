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

    <div v-for="(month, i) in eventsByMonth" :key="i">
      <!-- <h2 class="mt-16 pl-8">{{month.name}} {{new Date().getFullYear()}}</h2> -->
      <CardGridWrapper :title="month.name + ' ' + (new Date().getMonth() > 8 ? new Date().getFullYear()+1 : new Date().getFullYear())">
        <CardGrid
          enableEndDates={true}
          v-for="event in month.events"
          :key="event._id"
          :date="event.content.date"
          :endDate="event.content.endDate"
          :title="event.content.title"
          :tags="event.content.tags"
          :image="event.content.mainImage"
          :description="event.content.description"
          :url="`${event.content.slug.current}/`"
        />
      </CardGridWrapper>
    </div>

    <SectionsRenderer :sections="eventsPage.content.sectionsBottom" />
  </article>
</template>

<script>
const query = /* groq */ `{
  "eventsPage": *[_id == 'eventsPage'][0],
  // "events": *[ _type == "event" && (content.endDate > now())] | order(content.date asc)
  "events": *[ _type == "event" && (dateTime(content.endDate+"T23:59:59Z") > dateTime(now()) - 3600 * 24 )] | order(content.date asc) // delayed hiding an event by 24 hours
}
`;

export default {
  name: "EventsPage",
  async asyncData({ $sanity }) {
    const sanityCall = await $sanity.fetch(query);

    // Create an array for the months
    var months = [
      { name: "January", events: [] },
      { name: "February", events: [] },
      { name: "March", events: [] },
      { name: "April", events: [] },
      { name: "May", events: [] },
      { name: "June", events: [] },
      { name: "July", events: [] },
      { name: "August", events: [] },
      { name: "September", events: [] },
      { name: "October", events: [] },
      { name: "November", events: [] },
      { name: "December", events: [] }
    ];

    // Iterate through the original events array and push objects into corresponding sub-arrays
    for (const event of sanityCall.events) {
      const monthIndex = new Date(event.content.date).getMonth();
      months[monthIndex].events.push(event);
    }
    // console.log("📆 months data", months.filter(month => month.events.length > 0));

    sanityCall.eventsByMonth = months.filter(month => month.events.length > 0);
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
      return `https://www.mydelgrossopark.com/events/`;
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
