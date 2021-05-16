<template>
  <div class="pt-18 bg-yellow-200 shadow-inner-lg">
    <component :is="'style'" v-if="image">
      .page-header[data-id="pageheader"] { background-image: url('{{
        $urlFor(image)
          .width(600)
          .height(600)
      }}')!important; } @media screen and (min-width: 640px) {
      .page-header[data-id="pageheader"] { background-image: url('{{
        $urlFor(image)
          .width(1200)
          .height(1200)
      }}')!important; } } @media screen and (min-width: 1280px) {
      .page-header[data-id="pageheader"] { background-image: url('{{
        $urlFor(image)
          .width(1900)
          .height(1200)
      }}')!important; } }
    </component>

    <div
      class="[ page-header ] bg-bottom 2xl:bg-cover bg-fixed pt-96  2xl:pt-160 relative"
      id="pageheader"
      data-id="pageheader"
    >
      <div
        class="[ wrapper ] z-10 relative lg:mt-36"
        :class="{ 'lg:max-w-screen-lg': narrow, 'lg:-inset-x-10': narrow }"
      >
        <div
          class="page-header__content bg-light inline-block p-10 xl:p-14 rounded-tr-medium"
        >
          <h1 class="text-3xl lg:text-4xl xl:text-5xl">{{ title }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Missing Title"
    },
    image: {
      type: Object,
      required: true
    },
    narrow: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.page-header {
  // background-image: url("https://cdn.sanity.io/images/lwnx6aqb/production/192addb25424b75a86ef70b629971457e081c9a0-1200x794.jpg?fit=crop&w=1600&h=500");
}

// .narrow .wrapper {
//   @include media-query("lg") {
//     max-width: 1000px !important;
//     margin-left: auto;
//     margin-right: auto;
//   }
// }
</style>
