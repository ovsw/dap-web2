<template>
  <section class="[  sponsorsSection ] my-grd ">
    <div class="[ wrapper  ]">
      <div class=" bg-white p-grd">
        <div class="border-4 md:border-4 p-10 md:p-16 relative ">
          <div class="ctaSection__leftColumn space-y-6 relative z-20">
            <h2 class="mb-16">
              <span v-if="section.title">{{ section.title }}</span
              ><span v-else>Sponsors</span>
            </h2>
            <div class="[ sponsorsSection__content ] [ pannel md:flex flex-wrap ]">
              <a
                v-for="(sponsor, index) in section.sponsorsList"
                :key="index"
                :href="sponsor.url"
                target="_blank"
                rel="noopener"
                class="sponsorGridCell md:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 flex justify-center"
              >
                <!-- <img
                  :src="$urlFor(sponsor.image).width(200)"
                  :alt="`${sponsor.name} logo`"
                /> -->
                <img class="sponsorGridCell  flex items-center justify-center px-10 py-6   object-contain"
                  :src="$urlFor(sponsor.image).height(200)"
                  :alt="`${sponsor.name} logo`"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
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
.sponsorGridCell {
  min-height: 10rem;
}
</style>
