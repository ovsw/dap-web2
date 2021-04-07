<template>
    <li :class="'nav__item no-' + navIndex+1" v-on-click-outside="closeSubMenu">
      <button
        :aria-label="mainNavItem.name + 'sub-menu toggle'"
        :aria-controls="mainNavItem.name + '-submenu'"
        aria-haspopup="true"
        :aria-expanded="showSubMenu"
        @click="toggleSubMenu"
      >
        {{ mainNavItem.name }}
        <!-- {%- include "partials/svg/icon-caret-down.svg" -%} -->
      </button>

      <!-- {# submenu (columns wrapper) #} -->
      <header-nav-item-dropdown :mainNavItem="mainNavItem" :navIndex="navIndex" v-show="showSubMenu" @close-subMenu="closeSubMenu"/>
    </li>
</template>

<script>
import { mixin as onClickOutside } from "vue-on-click-outside";


export default {
  props: {
    mainNavItem: Object,
    navIndex: Number
  },
  mixins: [onClickOutside],
  data() {
    return { showSubMenu: false };
  },
  methods: {
    toggleSubMenu() {
      this.showSubMenu = !this.showSubMenu;
    },
    closeSubMenu() {
      this.showSubMenu = false;
    }
  }
};
</script>
</script>

<style lang="scss" scoped></style>
