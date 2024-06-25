<template>
  <section class="faqSection py-20">
    <div class="[ wrapper max-w-screen-lg ] pb-10">
      <div class="">
        <h2 class="faqSection__heading my-10">
          {{ section.title }}
        </h2>
        <div class="faqsWrapper space-y-10 text-xl">
          <template v-for="(item, index) in section.faqItems" class="">
            <!-- heading item -->
            <h3
              :key="index"
              v-if="item.type == 'heading'"
              class="text-2xl font-display lg:text-3xl font-bold mt-16"
            >
              {{ item.value }}
            </h3>
            <!-- Q&A item -->
            <div v-if="item.type == 'faqItem'" :key="index">
              <component :is="`h${itemHeadingLvl}`">
                <button
                  @click="
                    index != selected ? (selected = index) : (selected = -1)
                  "
                  :aria-expanded="selected == index ? 'true' : 'false'"
                  class="bg-green text-light-light p-6 pt-8 block w-full text-left focus:outline-green-large"
                >
                 - {{ item.faqItem.question }}
                  <span class="float-right text-2xl">
                    <svg
                      viewBox="0 0 10 10"
                      aria-hidden="true"
                      focusable="false"
                      class="w-6 h-6 text-current fill-current"
                    >
                      <rect
                        class="vert"
                        height="8"
                        width="2"
                        y="1"
                        x="4"
                        rx="1"
                      />
                      <rect height="2" width="8" y="4" x="1" rx="1" />
                    </svg>
                  </span>
                </button>
              </component>

              <div class="p-6 lg:pt-8 bg-gray-100" v-show="selected == index">
                <SanityContent
                  :blocks="item.faqItem.answer"
                  class="prose text-xl max-w-screen-lg"
                />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  created() {
    console.log(this.first_room)  //undefined;
  },
  props: {
    section: {
      type: Object
    },
    sectionIndex: {
      type: Number
    }
  },
  watch: {
    section (n, o) {
      console.log("??", n, o) // n is the new value, o is the old value.
    }
  },
  computed: {
    itemHeadingLvl() {
      console.log("FROM faqComponent, this.section",this.section)
      // check if there are heading items among the FAQ items list
      const headingItems = this.section.faqItems.filter(item => !item._type);

      // return object with heading levels
      // if we have category headings, the Q headings should be 4 (category headings are 3), else default to 3
      return headingItems.length > 0 ? "4" : "3";
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
/* plus minus styles */
[aria-expanded="true"] .vert {
  display: none;
}
</style>
