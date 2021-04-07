<<template>
  <div>
    <a class="[ skip-link ] [ button ]" href="#main-content">Skip to content</a>

    <header role="banner" class="[ site-head ]">
      <div class="wrapper">
        <div class="site-head__inner" x-data="{ mainMenuisOpen: false }">
          <!-- {# LEFT COLUMN - BRAND #} -->
          <div class="[ site-head__left-column ] [ site-head__brand ]">
            <a href="/">
              <img
                src="~/assets/images/logos/delgrosso-amusement-park-and-laguna-splash-wordmark.png"
                alt="DelGrossos Amusement Park and Laguna Splash Water Park logo"
              />
            </a>
          </div>
          <!-- end [ site-head__left-column ] [ site-head__brand ] -->

          <!-- MIDDLE COLUMN -->
          <div class="[ site-head__middle-column ]">
            <div class="[ status-bar ]">
              <a href="/">operating schedule</a>
            </div>
            <!-- /.site-head__status-bar -->

            <!-- MAIN NAV -->
            <header-nav />

            <!-- {# MOBILE MENU TOGGLE #} -->
            <div class="hamburger-menu__container">
              <button
                aria-controls="nav-list"
                aria-label="Main Menu toggle"
                class="hamburger-menu"
              >
                <!-- :aria-expanded="mainMenuisOpen" -->
                <!-- @click.prevent="mainMenuisOpen = !mainMenuisOpen" -->
                <!-- x-bind:data-open="mainMenuisOpen" -->
                <div></div>
              </button>
            </div>
            <!-- {# END MOBILE MENU TOGGLE #} -->
          </div>
          <!-- /.site-head__middle-column -->

          <!-- RIGHRT COLUMN 
       switches order on mobile to top -->
          <div class="[ site-head__right-column ]">
            <div class="site-head__phone">
              <a href="tel:814-684-3538"
                ><span class="visually-hidden">call us</span>
                <span>814-684-3538</span></a
              >
            </div>
            <!-- /.site-head__phone -->

            <ul class="site-head__social">
              <!-- {% include 'partials/social-icons.html' %} -->
            </ul>
          </div>
          <!-- end right column -->
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
