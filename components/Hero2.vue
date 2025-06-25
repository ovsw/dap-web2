<template>
  <div class="heroWrapper lg:relative md:pt-24 mb-grd ">
    <component :is="'style'" v-if="image">
      .heroImage[data-id="heroImage"] { background-image: url('{{
        $urlFor(image)
          .width(1000)
          .height(500)
      }}')!important; }
    </component>

    <div class="heroImage relative bg-center bg-cover" data-id="heroImage">
      <div
        class="wrapper  
      sm:px-6 sm:py-6
      md:py-20 lg:py-28 xl:py-36
      lg:px-8"
      >
        <div
          class="relative 
            sm:rounded-2xl sm:overflow-hidden
            md:shadow-xl 
            lg:max-w-xl
        "
        >
          <div
            class="relative px-4 py-16  bg-light bg-opacity-95
            
              sm:px-6 sm:py-24 md:py-16 
              lg:py-16 lg:px-16 
            "
          >
            <h1
              class="text-center text-4xl font-extrabold tracking-tight sm:text-5xl 
              lg:text-6xl lg:text-left block text-dark max-w-2xl mx-auto
              lg:mx-0
              "
            >
                {{ title }}
              <!-- <span class="block text-indigo-200">customer support</span> -->
            </h1>
            <p class="text-center text-xl  sm:text-2xl 
              lg:text-3xl lg:text-left block text-dark max-w-2xl mx-auto mt-10
              lg:mx-0">
          {{ subtitle }}
        </p>
            <div
              class="mt-8 md:mt-10  mx-auto text-center text-xl text-dark sm:max-w-3xl
                lg:text-left lg:mx-0
              "
            >
              <SanityContent :blocks="text" :serializers="defaultSerializers" />
            </div>
            <div
              class="mt-10 max-w-sm mx-auto 
              sm:max-w-none sm:flex sm:justify-center 
              lg:justify-start
              "
            >
              <div
                class="space-y-4 text-center
                  sm:space-y-0 sm:mx-auto sm:gap-5 
                  lg:mx-0 lg:text-left
                "
              >
                <NuxtLink
                  :to="buttonUrl"
                  class="button [ button ] bg-yellow text-dark hover:text-dark-dark mt-4 md:mr-4"
                >
                  {{ buttonText }}
                </NuxtLink>
              </div>
              <!-- <div
                class="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5"
              >
                <a
                  href="#"
                  class="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
                >
                  Get started
                </a>
                <a
                  href="#"
                  class="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8"
                >
                  Live demo
                </a>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defaultSerializers } from "@/plugins/sanity-serializers";

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
    },
    text: {
      type: Array
    }
  },
  data() {
    return {
      defaultSerializers
    };
  }
};
</script>

<style lang="css" scoped>
.heroWrapper {
  padding-top: 73px;
}
</style>
