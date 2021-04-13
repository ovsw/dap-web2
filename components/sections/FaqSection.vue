<template>
  <section class="faqSection">
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

<style></style>
