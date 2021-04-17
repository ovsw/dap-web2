<template>
  <div class="wrapper py-20 max-w-screen-xl">
    <SanityContent
      :blocks="page.content.body"
      :serializers="serializers"
      class="prose text-lg max-w-screen-xl px-4"
    />
  </div>
</template>

<script>
import iframe from "@/components/serializers/iframe";

export default {
  props: {
    page: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      serializers: {
        // marks: {
        //   link: externalLink
        // },
        // TODO: form serializer
        types: {
          iframeEmbed: iframe
        }
      }
    };
  }
};
</script>

<style></style>
