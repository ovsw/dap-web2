<template>
  <nav class="[ nav ] [ site-head__nav ]" id="nav-list" aria-label="Main Menu">
    <!-- x-bind:data-open="mainMenuisOpen" -->
    <!-- :aria-expanded="mainMenuisOpen" -->
    <ul class="nav__list">
      <template v-for="(mainNavItem, index) in nav">
        <HeaderNavItem
          :mainNavItem="mainNavItem"
          :navIndex="index"
          v-if="mainNavItem.children.length > 0"
          :key="mainNavItem.name"
        />
      </template>
    </ul>
  </nav>
</template>

<script>
import nav from "@/assets/nav.json";

export default {
  data() {
    return {
      nav: nav
    };
  }
};
</script>
<style lang="scss" scoped></style>
