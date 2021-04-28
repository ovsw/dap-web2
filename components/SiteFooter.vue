<template>
  <footer class="footer bg-cyan text-light pt-20">
    <div class="container mx-auto px-4 md:px-6 pb-10">
      <div
        class="footer__grid md:grid gap-5 md:grid-cols-3 lg:grid-cols-6 space-y-10 md:space-y-0"
      >
        <!-- logos -->
        <div class="footer__logos flex col-span-1 lg:col-span-2 self-center">
          <a href="/" class="mr-8">
            <img
              src="~/assets/images/logos/dap-logo-traced.png"
              alt="DelGrosso's Amusement Park and Laguna Splash Logo"
          /></a>
          <a href="https://www.explorealtoona.com/" target="_blank">
            <img
              src="~/assets/images/logos/explore-altoona-logo-traced.png"
              alt="Explore Altoona Logo"
          /></a>
        </div>

        <!-- phone -->
        <div class="footer__phone self-center lg:col-span-2">
          <a href="tel:814-684-3538"
            ><span class="uppercase tracking-wider">Call us</span>
            <br />
            <span class="text-3xl">814-684-3538</span></a
          >
        </div>
        <!-- social icons -->
        <ul class="footer__social-wrapper text-3xl self-center lg:col-span-2">
          <SocialLinks />
        </ul>

        <!-- footer address -->
        <div class="footer__address space-y-3 md:col-span-2 py-6 text-light">
          <p>
            Italian-themed Family Amusement &amp; Water Park in Tipton, PA, with
            famous food.
          </p>
          <p>
            <a href="mailto:info@mydelgrossopark.com" class="flex items-start">
              <svg-icon
                name="icon-fb"
                title="Facebook icon"
                height="1em"
                width="1em"
                class="svgIcon mr-2"
              />
              info@mydelgrossopark.com</a
            >
          </p>
          <div class="flex items-start">
            <svg-icon
              name="icon-fb"
              title="Facebook icon"
              height="1em"
              width="1em"
              class="svgIcon mr-2"
            />
            <p>
              DelGrosso’s Amusement Park, Inc. <br />4352 E. Pleasant Valley
              Blvd <br />PO Box 335 Tipton, PA 16684
            </p>
          </div>
        </div>

        <!-- menu 1 -->
        <div class="footer__col col1">
          <h4>Passes &amp; Tickets</h4>
          <ul>
            <li><NuxtLink to="/passes/all-day-fun-pass/">All-Day Fun Pass</NuxtLink></li>
            <li><NuxtLink to="/passes/sundowner-fun-pass/">Sundowner Pass</NuxtLink></li>
            <li><NuxtLink to="/passes/season-pass/">Season Pass</NuxtLink></li>
            <li><NuxtLink to="/ride-tickets/">Ride Tickets</NuxtLink></li>
          </ul>
        </div>

        <!-- menu 2 -->
        <div class="footer__col col2">
          <h4>Groups</h4>
          <ul>
            <li><NuxtLink to="/group-picnics/">Group Picnics</NuxtLink></li>
            <li><NuxtLink to="/school-picnics/">School Picnics</NuxtLink></li>
            <li>
              <NuxtLink to="/kids-birthday-parties-at-the-park/">Birthday Parties</NuxtLink>
            </li>
            <li><NuxtLink to="/specialty-groups/">Specialty Groups</NuxtLink></li>
          </ul>
        </div>

        <!-- menu 3 -->
        <div class="footer__col col3">
          <h4>About</h4>
          <ul>
            <li>
              <NuxtLink to="/hours-and-schedule-of-operation/"
                >Hours &amp; Schedule</NuxtLink
              >
            </li>
            <li><NuxtLink to="/policies-info-and-faqs/">FAQs</NuxtLink></li>
            <li>
              <NuxtLink to="/famous-food/the-delgrosso-food-tradition/"
                >Famous Food</NuxtLink
              >
            </li>

            <li><NuxtLink to="/our-history/">History</NuxtLink></li>
            <li>
              <NuxtLink
                to="https://recruiting.ultipro.com/DEL1006DFOOD/JobBoard/6e776796-7545-42f2-9d1a-e6841f2719de/?q=&o=postedDateDesc"
                >Join Our Team</NuxtLink
              >
            </li>
            <li><NuxtLink to="/donation-requests/">Donation Requests</NuxtLink></li>
          </ul>
        </div>

        <!-- menu 4 -->
        <div class="footer__col col4">
          <h4>Legal</h4>
          <ul>
            <li><NuxtLink to="/contact/">Contact Us</NuxtLink></li>
            <li><NuxtLink to="/terms-and-conditions/">Terms &amp; Conditions</NuxtLink></li>
            <li><NuxtLink to="/privacy-policy/">Privacy Policy</NuxtLink></li>
            <li>
              <NuxtLink to="/website-accessibility-statement/"
                >Accessibility Statement</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/website-accessibility-policy/">Accessibility Policy</NuxtLink>
            </li>
          </ul>
        </div>
        <!-- end items -->
      </div>
      <!-- end grid -->
    </div>
    <!-- end container -->

    <div class="footer__bottom bg-cyan-dark p-4 md:text-center text-sm">
      <p>
        ©2014-2020 DelGrosso’s Amusement Park, Inc. All Rights Reserved.
        <span class="hidden md:inline"> | </span>
        <span class="block mt-3 md:inline">
          Website by:
          <a
            href="https://studiorovst.com"
            target="_blank"
            rel="noopener noreferrer"
            >Studio Rovst</a
          >
        </span>
      </p>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style></style>
