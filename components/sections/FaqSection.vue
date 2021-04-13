<template>
  <section class="faqSection [ grid-margin ]">
    <div class="[ wrapper grid-padding ]">
      <div class="[ pannel frame-thick ]">
        <h2 class="faqSection__heading">{{ section.title }}</h2>

        <dl class="[ flow ]">
          <div
            v-for="(item, index) in section.faqItems"
            class="faqsWrapper"
            :key="index"
          >
            <dt>
              <button
                :id="'accordion' + sectionIndex + '-header-' + index"
                :aria-controls="'accordion' + sectionIndex + '-panel-' + index"
                @click="
                  index != selected ? (selected = index) : (selected = -1)
                "
                :aria-expanded="selected == index ? 'true' : 'false'"
              >
                {{ item.question }}
                <span>+</span>
              </button>
            </dt>

            <dd
              :id="'accordion' + sectionIndex + '-panel-' + index"
              :aria-labelledby="'accordion' + sectionIndex + '-header-' + index"
              v-show="selected == index"
            >
              <SanityContent :blocks="item.answer" />
            </dd>
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

<style lang="scss" scoped>
.faqSection {
  h3 {
    margin-top: get-size("800");
    margin-bottom: get-size("600");
  }

  dt {
    display: block;
  }

  dt button {
    cursor: pointer;
    background: get-color("primary");
    border: none;
    color: get-color("light-glare");
    padding: get-size("400") get-size("600");
    padding-top: calc(#{get-size("400")} * 1.3);

    display: block !important;
    width: 100%;
    text-align: left;

    span {
      float: right;
    }
  }
}

.faqSection__heading {
  margin-bottom: get-size("700");
}
</style>
