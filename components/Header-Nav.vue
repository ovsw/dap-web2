<template>
  <nav
    class="[ nav ] [ site-head__nav ] flex md:block mr-4 md:mr-0"
    id="nav-list"
    aria-label="Main Menu"
  >
    <!-- x-bind:data-open="mainMenuisOpen"
    :aria-expanded="mainMenuisOpen" -->
    <ul
      class="nav__list 
      
      absolute z-10 
      shadow-lg md:shadow-none 
      pt-20
      pl-6
      bg-light-dark
      space-y-4
      justify-center 
      overflow-y-scroll

      w-full bg-light left-0 right-0 top-0

      h-screen 

      px-2 pb-32 
      mt-8 

      md:p-0 md:bg-light

      md:static md:flex md:items-center md:mt-0  md:pb-2 md:pt-2 
      md:overflow-y-visible
      md:h-auto  
       
      lg:space-y-0
    "
      style="top: 2.5rem;"
      :class="menuOpen ? 'block' : 'hidden'"
    >
      <li class="nav__item ">
        <HeaderMegamenu :menuData="nav[0]" :menuIndex="1" />
      </li>
      <li class="nav__item">
        <HeaderMegamenu :menuData="nav[1]" :menuIndex="2" />
      </li>

      <li class="nav__item ">
        <HeaderMegamenu :menuData="nav[2]" :menuIndex="3" />
      </li>
      <li class="nav__item ">
        <HeaderMegamenu :menuData="nav[3]" :menuIndex="4" />
      </li>
      <!-- <li class="nav__item">
        <NuxtLink
          to="/programs/general-camp-program/"
          class="block text-base focus:outline-none md:p-4 focus:bg-green focus:text-light-light font-bold uppercase"
          >Contact Us</NuxtLink
        >
      </li> -->
    </ul>

    <div class="hamburger-menu__container flex md:hidden">
      <button
        aria-controls="nav-list"
        aria-label="Main Menu toggle"
        :aria-expanded="menuOpen"
        class="hamburger-menu hidden"
        @click.prevent="toggleMenu"
        :data-open="menuOpen"
      >
        <div></div>
      </button>
    </div>
  </nav>
</template>

<script>
import nav from "@/assets/nav2.json";
export default {
  data() {
    return {
      nav: nav,
      menuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  }
};
</script>

<style>
.hamburger-menu__container {
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
}

.hamburger-menu {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.hamburger-menu div {
  width: 1.6rem;
  height: 3px;
  border-radius: 3px;
  background-color: green;
  position: relative;
  z-index: 1001;
  transition: 0.5s;
}

.hamburger-menu div:before,
.hamburger-menu div:after {
  content: "";
  position: absolute;
  width: inherit;
  height: inherit;
  background-color: green;
  border-radius: 3px;
  transition: 0.5s;
}

.hamburger-menu div:before {
  transform: translate(-13px, -7px);
}

.hamburger-menu div:after {
  transform: translate(-13px, 7px);
}

.hamburger-menu[data-open="true"] div {
  background-color: transparent;
}

.hamburger-menu[data-open="true"] div:before {
  transform: translate(-13px, 0) rotate(-45deg);
}

.hamburger-menu[data-open="true"] div:after {
  transform: translate(-13px, 0) rotate(45deg);
}

@keyframes animation {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
