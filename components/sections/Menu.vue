<template>
  <section class="faqSection m-grd">
    <div class="[ wrapper px-grd ]">
      <div class="[ pannel border-4 border-green p-10 md:p-20 bg-light ]">
        <h2 class="menuSection__heading mb-10">{{ section.title }}</h2>

        <dl class="space-y-16">
          <template v-for="menuItem in section.menuItems">
            <div :key="menuItem._key">
              <!-- heading -->
              <dt
                v-if="menuItem._type != 'menuItem'"
                class="font-bold text-3xl font-display mb-6"
              >
                <h2
                  :key="menuItem._key"
                  class="text-2xl font-display lg:text-3xl font-bold mt-16 text-red"
                >
                  {{ menuItem.value }}
                </h2>
              </dt>

              <!-- menuItem -->

              <dt
                v-if="menuItem._type === 'menuItem'"
                class="font-bold text-3xl font-display mb-6"
              >
                {{ menuItem.name }}
              </dt>
              <dd>
                <SanityContent
                  :blocks="menuItem.description"
                  class="prose text-lg max-w-full"
                  :serializers="defaultSerializers"
                />

                <p
                  v-for="(item, index) in menuItem.lineItems"
                  :key="index"
                  class="menuSection__listItem flex justify-end mt-2"
                >
                  <span class="menuSection__listItemName">{{ item.name }}</span>
                  <span class="menuSection__dots mx-4"></span>
                  <span
                    class="menuSection__price text-red-dark font-bold text-lg"
                    >{{ item.price }}</span
                  >
                </p>
              </dd>
            </div>
          </template>
        </dl>
        <p class="font-bold text-red-dark mt-10">
          Menu & Pricing Subject To Change
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { defaultSerializers } from "@/plugins/sanity-serializers";

export default {
  props: {
    section: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      defaultSerializers
    };
  }
};
</script>

<style lang="scss" scoped>
.menuSection__dots {
  border-bottom: 2px dotted gray;
  flex-grow: 1;
  flex-shrink: 0;
  transform: translateY(-0.625rem);
}
</style>
