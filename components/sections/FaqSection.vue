<template>
  <section class="faqSection py-20">
    <div class="[ wrapper max-w-screen-lg ] pb-10">
      <div class="">
        <h2 class="faqSection__heading my-10">{{ section.title }}</h2>

        <dl class=" space-y-10 text-xl">
          <div
            v-for="(item, index) in section.faqItems"
            class="faqsWrapper"
            :key="index"
          >
            <h3
              v-if="!item._type"
              class="text-2xl font-display lg:text-3xl font-bold mt-16"
            >
              {{ item.value }}
            </h3>
            <div v-if="item._type">
              <dt>
                <button
                  :id="'accordion' + sectionIndex + '-header-' + index"
                  :aria-controls="
                    'accordion' + sectionIndex + '-panel-' + index
                  "
                  @click="
                    index != selected ? (selected = index) : (selected = -1)
                  "
                  :aria-expanded="selected == index ? 'true' : 'false'"
                  class="bg-green text-light p-6 pt-8 block w-full text-left focus:outline-green-large"
                >
                  {{ item.question }}
                  <span class="float-right text-2xl">+</span>
                </button>
              </dt>

              <dd
                class="p-6 lg:pt-8 bg-gray-100"
                :id="'accordion' + sectionIndex + '-panel-' + index"
                :aria-labelledby="
                  'accordion' + sectionIndex + '-header-' + index
                "
                v-show="selected == index"
              >
                <SanityContent
                  :blocks="item.answer"
                  class="prose text-xl max-w-screen-lg"
                />
              </dd>
            </div>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    section: {
      type: Object
    },
    sectionIndex: {
      type: Number
    }
  },
  data() {
    return {
      selected: -1
    };
  }
};
</script>

<style>
.faqSection {
  /* background-color: #fdfcff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' %3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(29,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23fffdde'/%3E%3Cstop offset='1' stop-color='%23d3d6ba'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpattern id='b' width='49' height='49' patternUnits='userSpaceOnUse'%3E%3Ccircle fill='%23fdfcff' cx='24.5' cy='24.5' r='24.5'/%3E%3C/pattern%3E%3Crect width='100%25' height='100%25' fill='url(%23a)'/%3E%3Crect width='100%25' height='100%25' fill='url(%23b)' fill-opacity='0.1'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover; */
  \background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 20 20'%3E%3Cg fill-opacity='0.13'%3E%3Cpolygon fill='%23ffefc2' points='20 10 10 0 0 0 20 20'/%3E%3Cpolygon fill='%23ffefc2' points='0 10 0 20 10 20'/%3E%3C/g%3E%3C/svg%3E");
}
</style>
