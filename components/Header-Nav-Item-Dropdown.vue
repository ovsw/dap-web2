<template>
  <ul
    :class="'nav__submenu no-' + (navIndex + 1)"
    x-show="subMenuIsOpen"
    :id="mainNavItem.name + '-submenu'"
    :aria-label="mainNavItem.name + 'sub-menu'"
  >
    <!-- :data-show="submenuVisible" -->
    <!-- @click.away="subMenuIsOpen = false" -->

    <li
      class="nav__column"
      v-for="column in mainNavItem.children"
      :key="column.name"
    >
      <span class="col-title">{{ column.name }}</span>

      <ul class="nav__column-items">
        <li v-for="columnItem in column.children" :key="columnItem.name">
          <NuxtLink :to="columnItem.url" @click.native="closeParentMenu">{{
            columnItem.name
          }}</NuxtLink>
        </li>
      </ul>

      <!-- <div class="banner">
        {% include 'partials/' + column.banner + '.html' %}
      </div> -->
    </li>

    <div class="arrow"></div>
  </ul>
</template>

<script>
export default {
  props: {
    mainNavItem: Object,
    closeSubMenu: Function,
    navIndex: Number
  },
  methods: {
    closeParentMenu() {
      this.$emit("close-subMenu");
    }
  }
};
</script>

<style lang="scss" scoped></style>
