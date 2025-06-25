<template>
  <div class="wrapper py-20 max-w-screen-lg">
    <SanityContent
      :blocks="page.content.body"
      :serializers="defaultSerializers"
      class="prose prose-lg xl:prose-2xl max-w-screen-lg px-4 break-words"
    />
  </div>
</template>

<script>
import { defaultSerializers } from "@/plugins/sanity-serializers";

export default {
  props: {
    page: {
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

<style></style>
