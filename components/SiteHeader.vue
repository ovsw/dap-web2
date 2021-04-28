<template>
  <header
    role="banner"
    class="site-head shadow-lg fixed z-50 w-full bg-light"
    :class="[
      $store.state.showDrafPreviewBanner == true ? 'bodyPreviewActive' : ''
    ]"
  >
    <!-- <Header-TopBar /> -->

    <!-- .wrapper -->
    <div class="wrapper px-4 py-0 lg:py-2">
      <div class="site-head__inner flex flex-wrap items-center">
        <NuxtLink
          class="logo block  flex-grow md:flex-grow-0 sm:w-auto md:w-48"
          to="/"
        >
          <img
            class="block w-36"
            src="~/assets/images/logos/delgrosso-amusement-park-and-laguna-splash-wordmark.png"
            alt="DelGrossos Amusement Park and Laguna Splash Water Park logo"
          />
        </NuxtLink>

        <Header-Nav />
        <!-- <Search
          class="w-full flex-grow lg:pr-8 lg:pl-4 order-5 lg:order-none lg:w-auto mt-1"
        /> -->
        <HeaderStatus class="hidden xl:flex" />

        <!-- TODO: status badges -->
        <!-- TODO: alert bar -->

        <a href="tel:814-684-3538" class="hidden lg:flex ml-auto items-center">
          <svg-icon
            name="icon-phone"
            title="Telephone Icon"
            height="2em"
            width="2em"
            class="svgIcon mr-2 text-green"
          />
          <div>
            <span class="uppercase tracking-wider font-sm">Call us</span>
            <br />
            <span class="text-xl">814-684-3538</span>
          </div>
        </a>
      </div>
    </div>
    <!-- <HeaderAlert /> -->
  </header>
</template>

<script>
export default {
  name: "SiteHeader"
};
</script>

<style lang="scss" scoped>
.logo {
  top: -2.3rem;
  left: 50%;

  z-index: 500;
  & img {
  }
}

@media screen and (min-width: 768px) {
  .logo {
    // transform: translateX(-100px);
  }
  .logo img {
    width: 180px;
  }
}
</style>
