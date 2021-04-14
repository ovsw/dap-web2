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
    <div class="wrapper">
      <div class="site-head__inner flex items-center">
        <a class="logo block md:mr-10 w-full lg:w-48 pl-6" href="/">
          <img
            class="block w-36"
            src="~/assets/images/logos/delgrosso-amusement-park-and-laguna-splash-wordmark.png"
            alt="DelGrossos Amusement Park and Laguna Splash Water Park logo"
          />
          <!-- <span class="md:hidden text-base sm:text-lg pl-4">
            DelGrossos Amusement Park & Laguna Splash Water Park
          </span> -->
        </a>

        <Header-Nav />
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
