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
    <div class="wrapper px-4 lg:py-4">
      <div class="site-head__inner flex items-center">
        <a class="logo block md:mr-10 w-full sm:w-auto md:w-48" href="/">
          <img
            class="block w-36"
            src="~/assets/images/logos/delgrosso-amusement-park-and-laguna-splash-wordmark.png"
            alt="DelGrossos Amusement Park and Laguna Splash Water Park logo"
          />
        </a>

        <Header-Nav />

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
