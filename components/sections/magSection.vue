<template>
   <section class="[ magSection ] [ wrapper ]" data-theme="frame" data-theme-color="red">
    <div class="[ magSection__image ]">
      
    <img :src="$urlFor(section.image)" />

  <!-- <img src="https://cdn.sanity.io/images/0un18sqx/production/07f29dad6b7619710bc4e12cc969d59f4a687e86-4272x2848.jpg?rect=0,410,4272,1831&amp;w=700&amp;h=300&amp;auto=format" 
  
  alt="Image of people enjoying a sunny day at the Laguna Splash Water Park" /> -->
<!-- srcset="https://cdn.sanity.io/images/0un18sqx/production/07f29dad6b7619710bc4e12cc969d59f4a687e86-4272x2848.jpg?rect=246,0,3797,2848&amp;w=400&amp;h=300&amp;auto=format 400w, https://cdn.sanity.io/images/0un18sqx/production/07f29dad6b7619710bc4e12cc969d59f4a687e86-4272x2848.jpg?rect=0,634,4272,1381&amp;w=928&amp;h=300&amp;auto=format  928w, https://cdn.sanity.io/images/0un18sqx/production/07f29dad6b7619710bc4e12cc969d59f4a687e86-4272x2848.jpg?rect=0,43,4272,2563&amp;w=1000&amp;h=600&amp;auto=format  1000w, https://cdn.sanity.io/images/0un18sqx/production/07f29dad6b7619710bc4e12cc969d59f4a687e86-4272x2848.jpg?rect=0,257,4272,2136&amp;w=1600&amp;h=800&amp;auto=format  1600w, https://cdn.sanity.io/images/0un18sqx/production/07f29dad6b7619710bc4e12cc969d59f4a687e86-4272x2848.jpg?rect=0,0,4272,2734&amp;w=2500&amp;h=1600&amp;auto=format  2500w"  -->
  

    </div>
    <div class="[ magSection__content ] [ pannel frame-thick flow ]">


      <h2>{{section.title}}</h2>

      
        <div class="magSection__subHeadingWrapper">
          <h3 class="[ subtitle ]">{{section.subtitle}}</h3> 
        </div>
      
      <div class="magSection__rteWrapper [ flow ]">
        <SanityContent :blocks="section.text" :serializers="serializers" />
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
  props: ['section'],
  data() {
    return {
      serializers: {
        marks: {
          link: externalLink,
        },
      },
    }
  },
}
</script>

<style lang="scss">
  $sectionColors: (
    'green': get-color('primary'),
    'blue': get-color('secondary'),
    'red': get-color('accent'),
    'yellow': get-color('tertiary')
  );

  .magSection {
      padding: 0!important;
      margin-top: var(--grid-space);
      margin-bottom: var(--grid-space);

      display: flex;
      flex-wrap: wrap;

      @media screen and (min-width: 50rem) {
        flex-wrap: nowrap;
      }

      // GENERATE SECTION COLORS
      @each $name, $color in $sectionColors {
        &[data-theme-color=#{$name}] {
          .magSection__content {
            border-color: $color!important;
          }
        }
        &[data-theme=fill][data-theme-color=#{$name}] {
          .magSection__content {
            background-color: $color;
            color: get-color('light-glare');
          }
        }
        &[data-theme=fill][data-theme-color=yellow] {
          .magSection__content {
            background-color: $color;
            color: get-color('dark');
          }
        }
      }

    &__image {
      flex: 1 1 60%;
      min-height: 18.75rem;
      margin-left: var(--grid-space);
      margin-right: var(--grid-space);
      margin-bottom: var(--grid-space);
      position: relative;

      @media screen and (min-width: 50rem) {

        margin:0;
      }
      @media screen and (min-width: 1600px) {
        margin-left: var(--grid-space);
      }

      img {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__content {
      margin: 0 var(--grid-space);
      font-size: 1.125rem;
      
      @media screen and (min-width: 1200px) {
        flex-basis: 40%;
      }
      
      h2 {
        font-size: get-size('600');
        text-transform: uppercase;
        
        // @include media-query('md') {
        //   font-size: get-size('700');
        // }
      }
    }
    &__playIcon {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 100;
      font-size: 100px;
      color: white;
      fill: white;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba($color: get-color('dark'), $alpha: 0.5);
      transition: all 0.5s;
      cursor: pointer;
      
      & svg {
        width: 200px;
        height: 200px;
        transition: all 0.5s;
      }
      
      &:hover {
        background-color: rgba($color: get-color('primary'), $alpha: 0.8);
        svg{
          transform: scale(1.1);
        }
      }
    }
  }

  // alternate order of elements for consecutive sections

  .magSection:nth-child(even) {
    flex-direction: row-reverse;
    .magSection__image {
      @media screen and (min-width: 1600px) {
        margin-left: 0!important;
        margin-right: var(--grid-space)!important;
      }
    }
  }
</style>