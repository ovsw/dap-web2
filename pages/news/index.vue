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
  }
};
</script>

<style lang="scss" scoped></style>
