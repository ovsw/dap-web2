<template>
  <div>
    <PageHeader
      :title="parkNewsPage.content.title"
      :image="parkNewsPage.content.mainImage"
    />
    <CardGridWrapper>
      <CardGrid
        v-for="item in news"
        :key="item._id"
        :title="item.content.title"
        :image="item.content.mainImage"
        :description="item.content.description"
        :url="`${item.content.slug.current}/`"
      />
    </CardGridWrapper>
  </div>
</template>

<script>
const query = /* groq */ `{
  "parkNewsPage": *[_id == 'parkNews'][0],
  "news": *[ _type == "newsItem" &&  ( content.date < now() ) ] | order(content.date desc)
}
`;

export default {
  name: "parkRidesPage",
  asyncData({ $sanity }) {
    const sanityCall = $sanity.fetch(query);
    // console.log("🎈 asyncData: called", sanityCall);
    return sanityCall;
  },

  computed: {
    seoTitle() {
      if (this.parkNewsPage.content.seo && this.parkNewsPage.content.seo.title)
        return this.parkNewsPage.content.seo.title;
      return undefined;
    },
    seoDescription() {
      if (
        this.parkNewsPage.content.seo &&
        this.parkNewsPage.content.seo.description
      )
        return this.parkNewsPage.content.seo.description;
      return undefined;
    },
    seoImage() {
      return undefined;
    },
    seoPageUrl() {
      return `https://www.mydelgrossopark.com/${this.parkNewsPage.content.slug.current}/`;
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
