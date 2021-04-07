<template>
  <section 
    class="
      [ magSection ] [ wrapper ]
      

      my-grd
      

      max-w-screen-2xl
      mx-auto

      md:flex
    " 
    :data-theme="sectionThemeOptions.bg" 
    :data-theme-color="sectionThemeOptions.color"
  >
      <div
        class="[ magSection__image ] md:mr-grd"
      >
      
      <img v-if="!section.video"
        class="object-cover w-full h-full"
        :src="
          $urlFor(section.image)
            .width(700)
            .height(300)
        "
        :alt="section.image.alt"
        :srcset="
          $urlFor(section.image)
            .width(400)
            .height(300) +
            ' 400w, ' +
            $urlFor(section.image)
              .width(928)
              .height(300) +
            ' 928w, ' +
            $urlFor(section.image)
              .width(200)
              .height(500) +
            ' 1000w, ' +
            $urlFor(section.image)
              .width(928)
              .height(500) +
            ' 1200w, '
        "
        />
        
        <client-only>
          <video-light-box v-if="section.video" :videoUrl="section.video">
            <img
              class="object-cover w-full h-full"
              :src="
                $urlFor(section.image)
                  .width(700)
                  .height(300)
              "
              :alt="section.image.alt"
              :srcset="
                $urlFor(section.image)
                  .width(400)
                  .height(300) +
                  ' 400w, ' +
                  $urlFor(section.image)
                    .width(928)
                    .height(300) +
                  ' 928w, ' +
                  $urlFor(section.image)
                    .width(200)
                    .height(500) +
                  ' 1000w, ' +
                  $urlFor(section.image)
                    .width(928)
                    .height(500) +
                  ' 1200w, '
              "
              />
          </video-light-box>
        </client-only>
      </div>
      <div
        class="
          [ magSection__content ]
          [ pannel frame-thick flow ]
          
          p-10 md:p-20
          space-y-6

          md:max-w-2xl
          m-grd
          md:m-0

         flex-auto
         
          border-5
        "
        :class="`border-${sectionThemeOptions.color}`"
      >
        <!-- :class="`border-${sectionThemeOptions.color}`" -->
        <h2>{{section.title}}</h2>
      
          <div class="magSection__subHeadingWrapper">
            <h3 class="[ subtitle ] uppercase font-bold text-lg tracking-wide">{{section.subtitle}}</h3>
            <!-- <p>{{section.theme}}</p>
            <p>themeOptions: {{sectionThemeOptions}}</p> -->
      
          </div>
      
        <div class="magSection__rteWrapper [ flow ] ">
          <SanityContent :blocks="section.text" :serializers="serializers" class="prose"/>
          <p>Hot Ride, Cool Slides, and America's Best Amusement Park Food! Hot Ride, Cool Slides, and America's Best Amusement Park Food! Hot Ride, Cool Slides, and America's Best Amusement Park Food!</p>
        </div>
        <!-- <div class="magSection__buttonWrapper">
            <a href="https://dap-web.netlify.app/laguna-splash-water-park-attractions/" class="[ button ] [ button--colored-bg button--color-green ]">View Our Attractions!</a>
        </div> -->
      </div>

  </section>

</template>

<script>
import externalLink from '@/components/serializers/externalLink'

export default {
  name: 'magSection',
  props: ['section'],
  data() {
    return {
      // frame: this.section.theme.indexOf('frame') !== -1 ? true : false,
      // panel: this.section.theme.indexOf('panel') !== -1 ? true : false,
      // panel: this.section.theme.indexOf('panel') !== -1 ? true : false,
      serializers: {
        marks: {
          link: externalLink,
        },
      },
    }
  },
  computed: {
    sectionThemeOptions: function () {
      // generates an object from the string passed from the Sanity BE
      // string has the form 'blueTheme-frame-greenBtn', 'redTheme-fill-yellowBtn', etc
      try {
        const themeString = this.section.theme.split('-')
        const themeColor = themeString[0].replace('Theme','')
        const themeBg = themeString[1]
        const buttonColor = themeString[2].replace('Btn','')
        
        let buttonStyle = 'colored-bg'

        if (themeBg == 'fill') {
          if (themeColor != 'yellow' || buttonColor != 'yellow') {
            let buttonStyle = 'colored-bg'
          }
        }

        const themeOptions = {
          color: themeColor,
          bg: themeBg,
          buttonColor: buttonColor,
          buttonStyle: buttonStyle
        } 

        return themeOptions
        
      } catch (error) {
        console.error(error);
        return {}
      }

    }
  }
}
</script>

<style lang="css">

</style>