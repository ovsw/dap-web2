<template>
  <component v-bind="linkProps(href)">
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true
    }
  },

  methods: {
    linkProps(href) {
      if (
        href.match(/((mailto:\w+)|(tel:\w+)|(http:\/\/\w+)|(https:\/\/\w+)).+/)
      ) {
        return {
          is: "a",
          href: href,
          target: "_blank",
          rel: "noopener noreferrer"
        };
      }
      return {
        is: "router-link",
        to: href
      };
    }
  }
};
</script>

<style></style>
