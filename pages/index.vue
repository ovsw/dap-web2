<template>
  <div>
    <component :is="'style'" v-if="siteHome.content.hero.image">
      .hero[data-id="12312321"] { background-image: url('{{
        $urlFor(siteHome.content.hero.image)
          .width(600)
          .height(400)
      }}')!important; } @media screen and (min-width: 600px) {
      .hero[data-id="12312321"] { background-image: url('{{
        $urlFor(siteHome.content.hero.image)
          .width(1200)
          .height(800)
      }}')!important; } } @media screen and (min-width: 1200px) {
      .hero[data-id="12312321"] { background-image: url('{{
        $urlFor(siteHome.content.hero.image)
          .width(1600)
          .height(1200)
      }}')!important; } }
    </component>

    <div class=" pt-24">
      <div
        class="hero relative bg-center bg-cover py-36 px-4"
        :id="12312321"
        :data-id="12312321"
      >
        <div class="container mx-auto">
          <div class="hero__content">
            <CardGeneric
              color="green"
              :title="siteHome.content.hero.title"
              :subtitle="siteHome.content.hero.subTitle"
              :buttonText="siteHome.content.hero.button.text"
              :buttonUrl="siteHome.content.hero.button.url"
              class="max-w-lg"
            >
              <div class="prose">
                <ul>
                  <li>Visit The Kid's Kingdom</li>
                  <li>Enjoy our thrilling midway rides and games</li>
                  <li>Dig into our famous food</li>
                  <li>Cool off at our Water Park</li>
                </ul>
              </div>
            </CardGeneric>

            <!-- {{
            singleCard(
              (variant = "green"),
              (size = "large"),
              (headingContent = siteHome.content.hero.title),
              (subHeadingContent = siteHome.content.hero.subTitle),
              (topHeadingLvl = 1),
              (contentBottom =
                siteHome.content.hero.text
                | blocksToMarkdown
                | markdownify
                | safe),
              (buttonText = siteHome.content.hero.button.text),
              (buttonLink = siteHome.content.hero.button.url)
            )
          }} -->
          </div>
          <!-- /.hero__content -->
        </div>
      </div>
    </div>

    <SectionsRenderer :sections="siteHome.content.sections" />
  </div>
</template>

<script>
const query = /* groq */ `{
  "siteHome": *[_type == 'siteHome'] {
    ...
  }[0]
}
`;

export default {
  name: "siteHome",
  asyncData({ $sanity }) {
    const sanityCall = $sanity.fetch(query);
    // console.log("🎈 asyncData: called", sanityCall);
    return sanityCall;
  }
};
</script>
