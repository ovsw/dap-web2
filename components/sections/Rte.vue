<template>
  <section class="faqSection  px-grd my-grd 2xl:px-0">
    <div class="[ wrapper 2xl:px-grd ]">
      <div class="[ pannel border-4 border-green p-10 md:p-20 bg-light ]">
        <div class="max-w-2xl mx-auto md:py-10 lg:py-20">
          <h2 class="menuSection__heading mb-10 ">
            {{ section.title }}
          </h2>

          <SanityContent
            :blocks="section.body"
            class="prose"
            :serializers="defaultSerializers"
          />
        </div>
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

<style lang="scss" scoped></style>
