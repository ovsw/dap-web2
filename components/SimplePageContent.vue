<template>
  <div class="wrapper py-20 max-w-screen-lg">
    <SanityContent
      :blocks="page.content.body"
      :serializers="serializers"
      class="prose prose-lg xl:prose-2xl max-w-screen-lg px-4 break-words"
    />
  </div>
</template>

<script>
import externalLink from "@/components/serializers/externalLink";
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
          iframeEmbed: iframe,
          link: externalLink
        }
      }
    };
  }
};
</script>

<style></style>
