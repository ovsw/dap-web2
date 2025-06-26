<template>
  <section
    class="[ magSection ] 
    wrapper 
    my-grd
    lg:flex
    "
    data-theme="frame"
    data-theme-color="green"
  >
    <div class="[ magSection__image ] relative flex-1 2xl:ml-grd">
      <img
        class="object-cover w-full h-full"
        :src="
          $urlFor(section.image)
            .width(800)
            .height(800)
        "
        :alt="section.image.alt"
      />
      <!-- sizes="
          (min-width: 1500px) 860px,
          100vw
        " 
        :srcset="
          $urlFor(section.image)
            .width(400)
            .height(300) +
            ' 400w, ' +
            $urlFor(section.image)
              .width(800)
              .height(300) +
            ' 928w, ' +
            $urlFor(section.image)
              .width(200)
              .height(500) +
            ' 200w, ' +
            $urlFor(section.image)
              .width(928)
              .height(500) +
            ' 928w, ' +
            $urlFor(section.image)
              .width(1600)
              .height(1000) +
            ' 1600w, ' +
            $urlFor(section.image)
              .width(2500)
              .height(1500) +
            ' 2500w'
        "
        -->

      <client-only v-if="section.video">
        <silent-box
          class="playIcon "
          :image="{
            src: section.video,
            description: section.title
          }"
        >
          <template v-slot:silentbox-item="{}">
            <span class="w-full h-full block">
              <svg-icon
                name="icon-play"
                title="play icon"
                height="10em"
                width="10em"
              />
            </span>
            <span class="visually-hidden"
              >play video about {{ section.title }}</span
            >
          </template>
        </silent-box>
      </client-only>
    </div>

    <div
      class="[ magSection__content ] 
        flex-1
        border-4 border-green

        m-grd p-6 space-y-6

        md:border-5 md:p-10 
        
        lg:max-w-2xl lg:p-20   lg:my-0 flex flex-col justify-center
        "
      :class="`border-${sectionThemeOptions.color}`"
    >
      <div class="space-y-10">
        <div>
          <p class="eyebrow" :class="`text-${sectionThemeOptions.color}-dark`">
            {{ section.eyebrow }}
          </p>

          <h2 class="mt-2">{{ section.title }}</h2>
        </div>

        <div v-if="section.subtitle" class="magSection__subHeadingWrapper">
          <h3 class="[ subtitle text-xl font-bold ]">{{ section.subtitle }}</h3>
        </div>

        <div class="magSection__rteWrapper [  ]">
          <SanityContent
            :blocks="section.text"
            :serializers="serializers"
            class="prose text-lg"
          />
        </div>
      </div>
      <div v-if="sectionButtons" class="magSection__buttonWrapper">
        <l-cluster>
          <!-- <div v-for="(button, index) in sectionButtons" :key="index">
            {{ button.url }} - {{button.text}}
          </div> -->
          <ButtonC
            v-for="(button, index) in sectionButtons"
            :url="button.url || '#'"
            :key="index"
          >
            {{ button.text }}
          </ButtonC>
        </l-cluster>
      </div>
    </div>
  </section>
</template>

<script>
import externalLink from "@/components/serializers/externalLink";
import block from "@/components/serializers/block";

export default {
  name: "MagSection",
  props: {
    section: {
      type: Object,
      required: true
    }
  },
  computed: {
    sectionButtons() {
      return this.section.buttons || [];
    },
    sectionThemeOptions: function() {
      // generates an object from the string passed from the Sanity BE
      // string has the form 'blueTheme-frame-greenBtn', 'redTheme-fill-yellowBtn', etc
      try {
        const themeString = this.section.theme.split("-");
        const themeColor = themeString[0].replace("Theme", "");
        const themeBg = themeString[1];
        const buttonColor = themeString[2].replace("Btn", "");

        let buttonStyle = "colored-bg";

        if (themeBg == "fill") {
          if (themeColor != "yellow" || buttonColor != "yellow") {
            let buttonStyle = "colored-bg";
          }
        }

        const themeOptions = {
          color: themeColor,
          bg: themeBg,
          buttonColor: buttonColor,
          buttonStyle: buttonStyle
        };

        return themeOptions;
      } catch (error) {
        console.error(error);
        return {};
      }
    }
  },
  data() {
    return {
      serializers: {
        marks: {
          link: externalLink
        },
        types: {
          block: block
        }
      }
    };
  }
};
</script>

<style lang="scss">
.playIcon {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;

  color: white;
  fill: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(54, 52, 46, 0.5);
  transition: all 0.5s;
  cursor: pointer;

  & svg {
    width: 200px;
    height: 200px;
    transition: all 0.5s;
  }

  & a {
    width: 100%;
    height: 100%;
    & span {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  & a:focus {
    outline: 2px dashed white;
  }

  &:hover {
    background-color: rgba(45, 130, 98, 0.8);
    svg {
      transform: scale(1.1);
    }
  }
}
</style>
