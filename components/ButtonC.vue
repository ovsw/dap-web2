<template>
  <component v-bind="linkProps(url)" class="button" :class="buttonClasses">
    <span class="relative inset-y-0.5 mr-2">
      <slot></slot>
    </span>
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
      default: "light"
    }
  },
  computed: {
    buttonClasses: function() {
      if (this.bgColor == "yellow" || this.bgColor == "light") {
        return `bg-${this.bgColor} text-${this.color} hover:text-dark-dark`;
      }
      return `bg-${this.bgColor}-dark text-${this.color}`;
    }
  },
  methods: {
    cleanUrl(url) {
      return url.replace(/\/\//g, "/");
    },
    linkProps(url) {
      if (
        url.match(/((mailto:\w+)|(tel:\w+)|(http:\/\/\w+)|(https:\/\/\w+)).+/)
      ) {
        if (url)
          return {
            is: "a",
            href: url,
            target: "_blank",
            rel: "noopener"
          };
      }

      let routerLinkDestination = `/${url}/`;
      return {
        is: "router-link",
        to: this.cleanUrl(routerLinkDestination)
      };
    }
  }
};
</script>

<style></style>
