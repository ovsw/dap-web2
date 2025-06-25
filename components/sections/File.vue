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
          <!-- {{ section }} <br />
          {{ section.file.asset._ref }} -->
          <!-- <p>
            {{ this.section.theme }}: {{ sectionThemeOptions }} -
            {{ bgClasses }}
          </p> -->
          <div v-if="section.subtitle" class="ctaSection__subHeadingWrapper">
            <h3 class="subtitle text-xl font-bold">{{ section.subtitle }}</h3>
          </div>

          <div v-if="section.text">
            <SanityContent :blocks="section.text" :serializers="defaultSerializers" />
          </div>

          <SanityFile :asset-id="section.file.asset._ref" :download="true">
            <template #default="{ src }">
              <ButtonC
                :url="src"
                class="[ button ]"
                :bgColor="sectionThemeOptions.buttonBgColor"
                :color="sectionThemeOptions.buttonTextColor"
              >
                download {{ section.fileDescription }}
              </ButtonC>
            </template>
          </SanityFile>
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
            alt="section.image.alt"
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
import { defaultSerializers } from "@/plugins/sanity-serializers";

export default {
  props: {
    section: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      defaultSerializers
    };
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

<style lang="scss" scoped></style>
