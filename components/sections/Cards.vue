<template>
  <section class="cardSection relative py-44">
    <div class="[ container mx-auto relative z-10 ]">
      <h2 class="text-4xl md:text-5xl text-center lg:text-left">
        {{ section.title }}
      </h2>

      <div
        class="px-4 flex flex-wrap justify-center lg:flex-nowrap mt-24 space-y-10 lg:space-y-0 lg:space-x-10"
      >
        <!--       cardSection__{{cardCount}} 
      cardSection__{{cardCountType}}  -->
        <div
          v-for="(card, index) in section.cards"
          :key="index"
          class="flex w-full max-w-lg"
        >
          <CardGeneric
            :color="card.theme"
            :title="card.title"
            :subtitle="card.subTitle"
            :buttonText="card.button.text"
            :buttonUrl="card.button.url"
            class="flex-1"
          >
            <SanityContent :blocks="card.text" class="prose" />
          </CardGeneric>
        </div>

        <!-- {% for card in section.cards %}
          {{singleCard(
          variant=card.theme, 
          headingContent=card.title,
          subHeadingContent=card.subTitle,
          topHeadingLvl=3,
          contentBottom=card.text | blocksToMarkdown | markdownify | safe,
          buttonText=card.button.text,
          buttonLink=card.button.url
          )
          }}
      {% endfor %} -->
      </div>
    </div>
    <!-- {% responsiveImage section.image, "500, 1200, 1600", "(min-width: 40em)
    70vw, 100vw", "cardSection__image bgImage", section.image.alt %} -->
  </section>
</template>

<script>
export default {
  props: {
    section: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.cardSection {
  // background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 20 20'%3E%3Cg fill-opacity='0.13'%3E%3Cpolygon fill='%23ffefc2' points='20 10 10 0 0 0 20 20'/%3E%3Cpolygon fill='%23ffefc2' points='0 10 0 20 10 20'/%3E%3C/g%3E%3C/svg%3E");
  background-image: url("https://cdn.sanity.io/images/zjwbgj71/production/07f29dad6b7619710bc4e12cc969d59f4a687e86-4272x2848.jpg?w=1500");
  background-size: cover;
}
.cardSection::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
