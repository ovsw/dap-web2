<template>
  <div>
    <!-- <button
          class="glightbox glightbox-1" 
          :data-href="videoUrl"
          data-draggable="false"
          data-videos-width="100vw"
          data-type="video"
          >
          <span class="magSection__playIcon">
            
            <span class="visually-hidden">play</span>
          </span>
          <slot></slot>
        </button> -->

    <silent-box
      :image="{
        src: 'https://www.youtube.com/watch?v=d0tU18Ybcvk',
        description: 'Sunken dreams II. by Arbebuk'
      }"
    >
      <template v-slot:silentbox-item="{ silentboxItem }">
        <slot></slot>
      </template>
    </silent-box>
  </div>
</template>

<script>
export default {
  name: "VideoLightBox",
  inheritAttrs: false,
  props: {
    videoUrl: String
  },
  data() {
    return {};
  }
};
</script>
