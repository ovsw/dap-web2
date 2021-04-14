<template>
  <div class="pt-18 bg-yellow-200">
    <component :is="'style'" v-if="image">
      .page-header[data-id="12312321"] { background-image: url('{{
        $urlFor(image)
          .width(600)
          .height(400)
      }}')!important; } @media screen and (min-width: 600px) {
      .page-header[data-id="12312321"] { background-image: url('{{
        $urlFor(image)
          .width(1200)
          .height(800)
      }}')!important; } } @media screen and (min-width: 1200px) {
      .page-header[data-id="12312321"] { background-image: url('{{
        $urlFor(image)
          .width(1600)
          .height(1200)
      }}')!important; } }
    </component>

    <div
      class="[ page-header ] bg-cover bg-fixed pt-96 md:pt-160 relative"
      :id="12312321"
      :data-id="12312321"
    >
      <div class="[ wrapper ] z-10 relative">
        <div
          class="page-header__content bg-light inline-block p-14 rounded-tr-large"
        >
          <h1 class="text-5xl">{{ title }}</h1>
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
    }
  }
};
</script>

<style lang="scss" scoped>
.page-header {
  background-position: center center;
  // background-image: url("https://cdn.sanity.io/images/lwnx6aqb/production/192addb25424b75a86ef70b629971457e081c9a0-1200x794.jpg?fit=crop&w=1600&h=500");

  &::before {
    background-color: #000;
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.3;
    z-index: 1;
  }
  // &::before {
  //   background-color: rgb(131,187,65);
  //   content: '';
  //   display: block;
  //   width: 100%;
  //   height: 100%;
  //   mix-blend-mode: darken;
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  // }

  // &::after {
  //   background-color: rgb(34,48,19);
  //   content: '';
  //   display: block;
  //   width: 100%;
  //   height: 100%;
  //   mix-blend-mode: lighten;
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   bottom:0;
  // }
}

// .narrow .wrapper {
//   @include media-query("lg") {
//     max-width: 1000px !important;
//     margin-left: auto;
//     margin-right: auto;
//   }
// }
</style>
