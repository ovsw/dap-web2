<template>
  <header
    role="banner"
    class="site-head shadow"
    :class="[
      $store.state.showDrafPreviewBanner == true ? 'bodyPreviewActive' : ''
    ]"
  >
    <!-- <Header-TopBar /> -->

    <!-- .wrapper -->
    <div class="wrapper">
      <div class="site-head__inner flex items-center">
        <a class="logo  flex md:block items-center" href="/">
          <img
            class="hidden md:block"
            src="~/assets/images/logos/delgrosso-amusement-park-and-laguna-splash-wordmark.png"
            alt="DelGrossos Amusement Park and Laguna Splash Water Park logo"
          />
          <span class="md:hidden text-base sm:text-lg pl-4">
            DelGrossos Amusement Park & Laguna Splash Water Park
          </span>
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
    width: 90px;
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
