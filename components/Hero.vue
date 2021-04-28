<template>
  <div class="lg:relative pt-24 lg:pt-24 mb-grd bg-green-dark">
    <!-- <component :is="'style'" v-if="image">
      .heroImage[data-id="heroImage"] { background-image: url('{{
        $urlFor(image)
          .width(600)
          .height(400)
      }}')!important; } @media screen and (min-width: 640px) {
      .heroImage[data-id="heroImage"] { background-image: url('{{
        $urlFor(image)
          .width(1200)
          .height(800)
      }}')!important; } } @media screen and (min-width: 1280px) {
      .heroImage[data-id="heroImage"] { background-image: url('{{
        $urlFor(image)
          .width(1600)
          .height(1200)
      }}')!important; } }
    </component> -->

    <div class="lg:pr-16 w-full pb-grd  lg:py-grd">
      <div
        class="  border-indigo-100 border-5   lg:w-1/2
           p-4 md:p10
          lg:p-20 xl:pr-16
           mx-grd
        "
      >
        <h1
          class="text-3xl tracking-tight font-extrabold text-yellow sm:text-4xl md:text-5xl lg:text-5xl"
        >
          {{ title }}
          <!-- <span class="block xl:inline">Data to enrich your</span>
          {{ " " }}
          <span class="block text-indigo-600 xl:inline">online business</span> -->
        </h1>
        <p class="mt-3 max-w-md  text-lg text-gray-200 sm:text-xl md:mt-5 ">
          {{ subtitle }}
        </p>
        <div
          class="prose mt-3 max-w-md  text-lg text-gray-200 sm:text-xl md:mt-5"
        >
          <ul>
            <li>Visit The Kid's Kingdom</li>
            <li>Enjoy our thrilling midway rides and games</li>
            <li>Dig into our famous food</li>
            <li>Cool off at our Water Park</li>
          </ul>
        </div>
        <div class="sm:flex justify-start mt-6">
          <NuxtLink
            :to="buttonUrl"
            class="button [ button ] bg-yellow text-dark hover:text-dark-dark mt-4 mr-4"
          >
            {{ buttonText }}
          </NuxtLink>
          <!-- <NuxtLink
            to="/contact/"
            class=" button [ button ] bg-light text-dark hover:text-dark-dark mt-4"
          >
            Contact
          </NuxtLink> -->
        </div>
      </div>
    </div>
    <div
      class="hidden lg:block [ heroImage ] bg-cover relative w-full h-64 sm:h-96 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full bg-center"
      data-id="heroImage"
    >
      <img
        class="absolute inset-0 w-full h-full object-cover"
        :src="
          $urlFor(image)
            .width(1200)
            .height(800)
        "
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "missing title"
    },
    subtitle: {
      type: String,
      default: "missing subtitle"
    },
    buttonText: {
      type: String,
      default: "missing buttonText"
    },
    buttonUrl: {
      type: String,
      default: "missing buttonUrl"
    },
    image: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
