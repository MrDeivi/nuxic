<script lang="ts" setup>

</script>

<template>
  <div
    fixed lg:hidden bottom-0 left-0 wfull h-16 bg-black:80 backdrop-blur z-300
    border-t border-solid border-white:10
  >
    <div flex="~ row" justify="around" hfull>
      <MobileBarLink :to="{ path: '/' }" icon="i-solar:compass-outline" active-icon="i-solar:compass-bold">
        Explore
      </MobileBarLink>
      <MobileBarLink :to="{ path: '/radio' }" icon="i-solar:radio-minimalistic-linear" active-icon="i-solar:radio-minimalistic-bold">
        Radio
      </MobileBarLink>
      <MobileBarLink :to="{ path: '/search' }" icon="i-ri:search-line" active-icon="i-ri:search-fill">
        Search
      </MobileBarLink>
      <MobileBarLink :to="{ path: '/genres' }" icon="i-solar:music-note-slider-linear" active-icon="i-solar:music-note-slider-bold">
        Genres
      </MobileBarLink>
      <MobileBarLink :to="{ path: '/favorites' }" icon="i-solar:hearts-linear" active-icon="i-solar:hearts-bold">
        Favorites
      </MobileBarLink>
    </div>
  </div>
</template>

<style  scoped></style>
