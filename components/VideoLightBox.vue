<template>
    <div>
       <silent-box :image="video[0]">
        <template v-slot:silentbox-item="{ silentboxItem }">
          <slot></slot>
        </template>
      </silent-box>
    </div>
</template>

<script>

export default {
  name: 'VideoLightBox',
  inheritAttrs: false,
  props: {
    videoUrl: String
  },
  data() {
    return {
      video: [{
                src: this.videoUrl,
                // description: '',
                autoplay: true
            }],
    }
  }
}
</script>