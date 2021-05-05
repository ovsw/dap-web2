<template>
  <section class="faqSection m-grd">
    <div class="[ wrapper px-grd ]">
      <div class="[ pannel border-4 border-green p-10 md:p-20 bg-light ]">
        <h2 class="menuSection__heading mb-10">{{ section.title }}</h2>

        <dl class="space-y-16">
          <template v-for="menuItem in section.menuItems">
            <div :key="menuItem._key">
              <dt class="font-bold text-3xl font-display mb-6">
                {{ menuItem.name }}
              </dt>
              <dd>
                <SanityContent
                  :blocks="menuItem.description"
                  class="prose text-lg max-w-full"
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
.menuSection__dots {
  border-bottom: 2px dotted gray;
  flex-grow: 1;
  flex-shrink: 0;
  transform: translateY(-0.625rem);
}
</style>
