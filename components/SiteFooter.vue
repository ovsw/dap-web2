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
            <li><a href="/passes/all-day-fun-pass/">All-Day Fun Pass</a></li>
            <li><a href="/passes/sundowner-fun-pass/">Sundowner Pass</a></li>
            <li><a href="/passes/season-pass/">Season Pass</a></li>
            <li><a href="/ride-tickets/">Ride Tickets</a></li>
          </ul>
        </div>

        <!-- menu 2 -->
        <div class="footer__col col2">
          <h4>Groups</h4>
          <ul>
            <li><a href="/group-picnics/">Group Picnics</a></li>
            <li><a href="/school-picnics/">School Picnics</a></li>
            <li>
              <a href="/kids-birthday-parties-at-the-park/">Birthday Parties</a>
            </li>
            <li><a href="/specialty-groups/">Specialty Groups</a></li>
          </ul>
        </div>

        <!-- menu 3 -->
        <div class="footer__col col3">
          <h4>About</h4>
          <ul>
            <li>
              <a href="/hours-and-schedule-of-operation/"
                >Hours &amp; Schedule</a
              >
            </li>
            <li><a href="/policies-info-and-faqs/">FAQs</a></li>
            <li>
              <a href="/famous-food/the-delgrosso-food-tradition/"
                >Famous Food</a
              >
            </li>

            <li><a href="/our-history/">History</a></li>
            <li>
              <a
                href="https://recruiting.ultipro.com/DEL1006DFOOD/JobBoard/6e776796-7545-42f2-9d1a-e6841f2719de/?q=&o=postedDateDesc"
                >Join Our Team</a
              >
            </li>
            <li><a href="/donation-requests/">Donation Requests</a></li>
          </ul>
        </div>

        <!-- menu 4 -->
        <div class="footer__col col4">
          <h4>Legal</h4>
          <ul>
            <li><a href="/contact/">Contact Us</a></li>
            <li><a href="/terms-and-conditions/">Terms &amp; Conditions</a></li>
            <li><a href="/privacy-policy/">Privacy Policy</a></li>
            <li>
              <a href="/website-accessibility-statement/"
                >Accessibility Statement</a
              >
            </li>
            <li>
              <a href="/website-accessibility-policy/">Accessibility Policy</a>
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
