<<template>
  <section
    class="[ ctaSection ] p-grd my-grd 2xl:px-0"
    :class="bgClasses"
    data-theme-color="green"
    data-theme="dark"
  >
    <!-- {% if section.image.asset %}
      {% responsiveImage section.image, 
      "500, 1200, 1600", 
      "(min-width: 40em) 70vw, 100vw",
      "[ bgImage bgImage--gray bgImage--withOverlay ]",
      imageAlt
    %}
    {% endif %} -->

    <div class="[ ctaSection__color-overlay ] [ pinned ]"></div>

    <div class="[ wrapper 2xl:px-grd ]">
      <div
        class="[ ctaSection__content ] [ pannel ] border-4 md:border-4 p-10 md:p-24 relative "
        :class="contentClasses"
      >
        <div class="ctaSection__leftColumn space-y-6 relative z-20">
          <h2>{{ section.title }}</h2>
          <!-- <p>
            {{ this.section.theme }}: {{ sectionThemeOptions }} -
            {{ bgClasses }}
          </p> -->
          <div v-if="section.subtitle" class="ctaSection__subHeadingWrapper">
            <h3 class="subtitle text-xl font-bold">{{ section.subtitle }}</h3>
          </div>

          <div v-if="section.text">
            <SanityContent :blocks="section.text" />
          </div>
          <ButtonC
            v-if="section.button1"
            :url="section.button1.url"
            class="[ button ]"
            :bgColor="sectionThemeOptions.buttonBgColor"
            :color="sectionThemeOptions.buttonTextColor"
          >
            {{ section.button1.text }}
          </ButtonC>
        </div>

        <div
          v-if="section.image && section.image.asset"
          class="w-2/3 absolute top-0 right-0 h-full opacity-30 hidden lg:block"
        >
          <img
            :src="
              $urlFor(section.image)
                .width(800)
                .height(400)
            "
            class="absolute top-0 right-0 h-full w-full z-0 object-cover"
          />
          <div
            class="absolute top-0 left-0 right-0 h-full w-full z-10 bg-gradient-to-r to-transparent"
            :class="`from-${sectionThemeOptions.color}`"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    section: {
      type: Object,
      required: true
    }
  },
  computed: {
    sectionThemeOptions: function() {
      // generates an object from the string passed from the Sanity BE
      // string has the form 'blueTheme-frame-greenBtn', 'redTheme-fill-yellowBtn', etc
      try {
        const lightColors = ["yellow"];

        const themeString = this.section.theme.split("-");
        const themeColor = themeString[0].replace("Theme", "");
        const buttonColor = themeString[1].replace("Btn", "");

        const themeBgValue = lightColors.includes(themeColor)
          ? "light"
          : "dark";

        const themeOptions = {
          color: themeColor,
          bgValue: themeBgValue,
          buttonBgColor: buttonColor,
          buttonTextColor: themeBgValue
        };

        return themeOptions;
      } catch (error) {
        console.error(error);
        return {};
      }
    },
    bgClasses: function() {
      return `bg-${this.sectionThemeOptions.color}`;
    },
    contentClasses: function() {
      if (this.sectionThemeOptions.bgValue == "light") {
        return "border-dark-panelBorder";
      }
      return `border-light-panelBorder text-light-light`;
    }
  }
};
</script>

<style lang="scss" scoped>
// $sectionColors: (
//   "green": get-color("primary"),
//   "blue": get-color("secondary"),
//   "red": get-color("accent"),
//   "yellow": get-color("tertiary")
// );

// .ctaSection {
//   position: relative;
//   margin: var(--grid-space) 0;
//   padding: var(--grid-space) 0;

//   &__image img {
//     // pinned

//     -webkit-filter: grayscale(100%);
//     -moz-filter: grayscale(100%);
//     -ms-filter: grayscale(100%);
//     -o-filter: grayscale(100%);
//     filter: gray;
//     z-index: 10;
//     opacity: 15%;
//   }
//   &__color-overlay {
//     // background-color: get-color('secondary');
//     z-index: 5;

//     @each $name, $color in $sectionColors {
//       section[data-theme-color="#{$name}"] & {
//         background-color: $color;
//       }
//     }
//   }

//   &__content {
//     position: relative;
//     z-index: 20;

//     section[data-theme="dark"] & {
//       color: get-color("light-glare");
//       border: 3px solid rgba($color: get-color("light-glare"), $alpha: 0.5);
//     }
//     section[data-theme="light"] & {
//       color: get-color("dark");
//       border: 5px solid rgba($color: get-color("dark"), $alpha: 0.5);
//     }

//     > * + * {
//       margin-top: var(--flow-space);
//     }

//     @include media-query("lg") {
//       display: flex;
//       align-items: center;
//     }

//     h2,
//     h3 {
//       font-size: get-size("700");
//       @include media-query("md") {
//         font-size: get-size("800");
//       }
//     }

//     .subtitle {
//       @include media-query("lg") {
//         font-size: 28px !important;
//       }
//     }

//     a {
//       text-decoration-color: currentColor;
//     }
//   }

//   &__leftColumn {
//     flex: 2;
//     @include media-query("lg") {
//       padding-right: calc(var(--grid-space) * 2);
//     }
//   }

//   &__rightColumn {
//     flex: 0 1 auto;
//   }
// }

// .bigHeadingSection + .ctaSection {
//   margin-top: 0 !important;
// }
</style>
