<script lang="ts" setup>

</script>

<template>
  <div
    round mt-10 flex flex-col py-10 lt-md:px0 transition-all duration-200
    :class="{ 'pb-30': useMusicStore().currentTrack?.id }"
    wfull hfull lt-lg:bg-transparent relative overflow="hidden"
  >
    <div
      absolute h-full w-20px z-10 bg-gradient-to-r from-black via-transparent to-transparent top-0 left-0
    />
    <div
      absolute h-full w-10px z-10 bg-gradient-to-r from-transparent via-black:50 to-black:50 top-0 right-0
    />
    <div
      absolute h-50px z-10 w-full bg-gradient-to-b from-black via-transparent to-transparent top-0 left-0
    />
    <div
      absolute h-50px z-10 w-full bg-gradient-to-b from-transparent via-black to-black bottom-0 left-0
    />

    <div
      absolute h-350px bg-black:80 backdrop-blur-xl
      pointer-events-none rounded-full blur-xl transition-all duration-1000 lt-md:op10 op8 blur-2xl
      class="bg-image left--3% top-0 w-120%"
    />

    <div p-4 px10 lt-md:px-4 lt-md:pb-10>
      <div flex items-center>
        <span i-akar-icons:music-album-fill text-4xl text-primary-300 rounded-2xl />
        <h2 class="mb-0 ml4 font-bold text-3xl">
          Nuxic
        </h2>
      </div>

      <div flex items-center mt10>
        <span>Built using</span>
        <a href="https://nuxt.com/" target="__blank">
          <LogosNuxt3 ml5 w30 text-5xl />
        </a>
      </div>
      <div flex items-center mt2>
        <span>Built using data from</span>
        <a href="https://developers.deezer.com/" target="__blank">
          <img ml10 mb2 width="90" src="/img/deezer-logo.png">
        </a>
      </div>
      <div flex mt2 flex-col>
        <span>This project uses the Deezer API, but is not endorsed or certified by Deezer.
          See Deezer API <a text-primary-300 hover:underline href="https://developers.deezer.com/termsofuse" target="__blank">terms of use</a>
        </span>
      </div>

      <div flex items-center mt7>
        <span>Contact creator
          <a
            text-primary-300
            hover:underline
            href="mailto: email@deivi.me"
          >
            email@deivi.me
          </a>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-image {
    background-image: linear-gradient(-45deg, #00a98e 30%, #009ff7);
  }
</style>
