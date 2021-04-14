<template>
  <component v-bind="linkProps(url)" class="button" :class="buttonClasses">
    <slot></slot>
    <svg-icon
      name="icon-chevron-right-light"
      title="chevron right icon"
      height="1em"
      width="1em"
    />
  </component>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    bgColor: {
      type: String,
      default: "green"
    },
    color: {
      type: String,
      default: "dark"
    }
  },
  computed: {
    buttonClasses: function() {
      // `this` points to the vm instance
      return `bg-${this.bgColor} text-${this.color}`;
    }
  },
  methods: {
    linkProps(url) {
      if (
        url.match(/((mailto:\w+)|(tel:\w+)|(http:\/\/\w+)|(https:\/\/\w+)).+/)
      ) {
        return {
          is: "a",
          href: url,
          target: "_blank",
          rel: "noopener"
        };
      }
      return {
        is: "router-link",
        to: url
      };
    }
  }
};
</script>

<style></style>
