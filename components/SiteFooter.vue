<template>
  <footer class="footer bg-cyan text-light-light pt-20">
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
          <!-- <a href="https://www.explorealtoona.com/" target="_blank">
            <img
              src="~/assets/images/logos/explore-altoona-logo-traced.png"
              alt="Explore Altoona Logo"
          /></a> -->
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
        <SocialLinks
          class="footer__social-wrapper text-3xl self-center lg:col-span-2 flex space-x-4"
        />

        <!-- footer address -->
        <div
          class="footer__address space-y-3 md:col-span-2 py-6 text-light-light"
        >
          <p>
            Italian-themed Family Amusement &amp; Water Park in Tipton, PA, with
            famous food.
          </p>
          <p>
            <a href="mailto:parkinfo@delgrossos.com" class="flex items-start">
              <svg-icon
                name="at-solid"
                height="1em"
                width="1em"
                class="svgIcon mr-2"
              />
              parkinfo@delgrossos.com
            </a>
          </p>
          <div class="flex items-start">
            <svg-icon
              name="envelope-regular"
              height="1em"
              width="1em"
              class="svgIcon mr-2"
            />
            <p>
              DelGrosso’s Amusement Park, Inc. <br />4352 E. Pleasant Valley
              Blvd <br />PO Box 335 Tipton, PA 16684
            </p>
          </div>
          <div class="footer__us-privacy-controls">
            <a :href="noticeAtCollectionUrl" class="iubenda-cs-uspr-link"
              >Notice at Collection</a
            >
            <a :href="privacyChoicesUrl" class="iubenda-cs-preferences-link">
              <img
                style="width: 2rem"
                src="data:image/svg+xml;charset=UTF-8,%3csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 30 14' style='enable-background:new 0 0 30 14;' xml:space='preserve'%3e%3cstyle type='text/css'%3e .st0%7bfill-rule:evenodd;clip-rule:evenodd;fill:%23FFFFFF;%7d .st1%7bfill-rule:evenodd;clip-rule:evenodd;fill:%230066FF;%7d .st2%7bfill:%23FFFFFF;%7d .st3%7bfill:%230066FF;%7d %3c/style%3e%3cg%3e%3cg id='final---dec.11-2020_1_'%3e%3cg id='_x30_208-our-toggle_2_' transform='translate(-1275.000000, -200.000000)'%3e%3cg id='Final-Copy-2_2_' transform='translate(1275.000000, 200.000000)'%3e%3cpath class='st0' d='M7.4,12.8h6.8l3.1-11.6H7.4C4.2,1.2,1.6,3.8,1.6,7S4.2,12.8,7.4,12.8z'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3cg id='final---dec.11-2020'%3e%3cg id='_x30_208-our-toggle' transform='translate(-1275.000000, -200.000000)'%3e%3cg id='Final-Copy-2' transform='translate(1275.000000, 200.000000)'%3e%3cpath class='st1' d='M22.6,0H7.4c-3.9,0-7,3.1-7,7s3.1,7,7,7h15.2c3.9,0,7-3.1,7-7S26.4,0,22.6,0z M1.6,7c0-3.2,2.6-5.8,5.8-5.8 h9.9l-3.1,11.6H7.4C4.2,12.8,1.6,10.2,1.6,7z'/%3e%3cpath id='x' class='st2' d='M24.6,4c0.2,0.2,0.2,0.6,0,0.8l0,0L22.5,7l2.2,2.2c0.2,0.2,0.2,0.6,0,0.8c-0.2,0.2-0.6,0.2-0.8,0 l0,0l-2.2-2.2L19.5,10c-0.2,0.2-0.6,0.2-0.8,0c-0.2-0.2-0.2-0.6,0-0.8l0,0L20.8,7l-2.2-2.2c-0.2-0.2-0.2-0.6,0-0.8 c0.2-0.2,0.6-0.2,0.8,0l0,0l2.2,2.2L23.8,4C24,3.8,24.4,3.8,24.6,4z'/%3e%3cpath id='y' class='st3' d='M12.7,4.1c0.2,0.2,0.3,0.6,0.1,0.8l0,0L8.6,9.8C8.5,9.9,8.4,10,8.3,10c-0.2,0.1-0.5,0.1-0.7-0.1l0,0 L5.4,7.7c-0.2-0.2-0.2-0.6,0-0.8c0.2-0.2,0.6-0.2,0.8,0l0,0L8,8.6l3.8-4.5C12,3.9,12.4,3.9,12.7,4.1z'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e"
                alt="California Consumer Privacy Act (CCPA) Opt-Out Icon"
              />
              Your Privacy Choices
            </a>
          </div>
        </div>

        <!-- menu 1 -->
        <div class="footer__col col1">
          <p class="uppercase text-sm tracking-wider mb-4 mt-6 font-semibold">
            Passes &amp; Tickets
          </p>
          <ul>
            <li>
              <NuxtLink to="/passes/all-day-fun-pass/"
                >All-Day Fun Pass</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/passes/sundowner-fun-pass/"
                >Sundowner Pass</NuxtLink
              >
            </li>
            <li><NuxtLink to="/passes/season-pass/">Season Pass</NuxtLink></li>
            <li><NuxtLink to="/ride-tickets/">Ride Tickets</NuxtLink></li>
          </ul>
        </div>

        <!-- menu 2 -->
        <div class="footer__col col2">
          <p class="uppercase text-sm tracking-wider mb-4 mt-6 font-semibold">
            Groups
          </p>
          <ul>
            <li><NuxtLink to="/group-picnics/">Group Picnics</NuxtLink></li>
            <li><NuxtLink to="/school-picnics/">School Picnics</NuxtLink></li>
            <li>
              <NuxtLink to="/kids-birthday-parties-at-the-park/"
                >Birthday Parties</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/specialty-groups/">Specialty Groups</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- menu 3 -->
        <div class="footer__col col3">
          <p class="uppercase text-sm tracking-wider mb-4 mt-6 font-semibold">
            About
          </p>
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
              <NuxtLink to="/employment/">Jobs</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/donation-requests/">Donation Requests</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- menu 4 -->
        <div class="footer__col col4">
          <p class="uppercase text-sm tracking-wider mb-4 mt-6 font-semibold">
            Legal
          </p>
          <ul>
            <li><NuxtLink to="/contact/">Contact Us</NuxtLink></li>
            <li>
              <a
                :href="privacyPolicyUrl"
                class="iubenda-nostyle no-brand iubenda-noiframe iubenda-embed"
                title="Privacy Policy"
                >Privacy Policy</a
              >
            </li>
            <li>
              <a
                :href="cookiePolicyUrl"
                class="iubenda-nostyle no-brand iubenda-noiframe iubenda-embed"
                title="Cookie Policy"
                >Cookie Policy</a
              >
            </li>
            <li>
              <a
                :href="termsPolicyUrl"
                class="iubenda-nostyle no-brand iubenda-noiframe iubenda-embed"
                title="Terms and Conditions"
                >Terms &amp; Conditions</a
              >
            </li>
            <li>
              <NuxtLink to="/website-accessibility-statement/"
                >Accessibility Statement</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/website-accessibility-policy/"
                >Accessibility Policy</NuxtLink
              >
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
import {
  privacyPolicyUrl,
  cookiePolicyUrl,
  termsPolicyUrl,
  privacyChoicesUrl,
  noticeAtCollectionUrl
} from "../lib/privacy-links";

export default {
  mounted() {
    // The footer survives normal Nuxt navigation. If a layout remounts it,
    // run the official scanner again so the new anchors get their lightboxes.
    const previous = document.getElementById("park-iubenda-legal");
    if (previous) previous.remove();
    const script = document.createElement("script");
    script.id = "park-iubenda-legal";
    script.src = "https://cdn.iubenda.com/iubenda.js";
    script.async = true;
    document.head.appendChild(script);
  },
  data() {
    return {
      privacyPolicyUrl,
      cookiePolicyUrl,
      termsPolicyUrl,
      privacyChoicesUrl,
      noticeAtCollectionUrl
    };
  }
};
</script>

<style scoped>
.footer__address p {
  max-width: 20rem;
}
.footer__us-privacy-controls {
  display: inline-flex;
  flex-direction: column;
  max-width: 100%;
  overflow: hidden;
  border: 1px solid #333;
  border-radius: 0.25rem;
  background: #fff;
  font-size: 13px;
  font-weight: 700;
}
.footer__us-privacy-controls a {
  display: inline-flex;
  align-items: center;
  min-height: 2.5rem;
  padding: 0.5rem 0.75rem;
  color: #333;
  text-decoration: none;
  white-space: nowrap;
}
.footer__us-privacy-controls a + a {
  border-top: 1px solid #333;
}
.footer__us-privacy-controls a:focus {
  outline: 2px dashed #333 !important;
  outline-offset: -3px !important;
}
.footer__us-privacy-controls .iubenda-cs-preferences-link {
  gap: 0.5rem;
}
.footer__us-privacy-controls img {
  display: inline-block;
  flex: 0 0 auto;
}
@media (min-width: 380px) and (max-width: 767px), (min-width: 1152px) {
  .footer__us-privacy-controls {
    flex-direction: row;
  }
  .footer__us-privacy-controls a + a {
    border-top: 0;
    border-left: 1px solid #333;
  }
}
</style>
