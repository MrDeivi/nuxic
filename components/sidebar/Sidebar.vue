<script lang="ts" setup>

</script>

<template>
  <div
    fixed w-80 left-0 top-0 z-50 h-100vh flex flex-col py-2 backdrop-blur backdrop-filter
    overflow-hidden transform lt-lg:translate-x--80 transition-all duration-200
  >
    <SidebarHeader />

    <div>
      <div class="scrollbox mt-3 max-h-67rem px-2">
        <div mb-4 px-2 not-first:mt-10>
          <div mb-3 block>
            <span style="letter-spacing: 1px" ml3 uppercase op70>
              MENU
            </span>
          </div>
          <SidebarLink :to="{ path: '/' }" icon="i-solar:compass-outline" active-icon="i-solar:compass-bold">
            Explore
          </SidebarLink>
          <SidebarLink :to="{ path: '/albums' }" icon="i-solar:music-library-2-linear" active-icon="i-solar:music-library-2-bold-duotone">
            Albums
          </SidebarLink>
          <SidebarLink :to="{ path: '/genres' }" icon="i-solar:music-note-slider-linear" active-icon="i-solar:music-note-slider-bold">
            Genres
          </SidebarLink>
          <SidebarLink :to="{ path: '/artists' }" icon="i-solar:people-nearby-outline" active-icon="i-solar:people-nearby-bold">
            Artists
          </SidebarLink>
          <SidebarLink :to="{ path: '/radio' }" icon="i-solar:radio-minimalistic-linear" active-icon="i-solar:radio-minimalistic-bold">
            Radio
          </SidebarLink>
        </div>

        <div mb-4 px-2 not-first:mt-10>
          <div mb-3 block>
            <span style="letter-spacing: 1px" ml3 uppercase op70>
              LIBRARY
            </span>
          </div>
          <SidebarLink :to="{ path: '/recent' }" icon="i-solar:clock-circle-linear" active-icon="i-solar:clock-circle-bold">
            Recent
          </SidebarLink>
          <!-- <SidebarLink :to="{ path: '/palylist' }" icon="i-solar:turntable-music-note-linear" active-icon="i-solar:turntable-music-note-bold">
            Playlist
          </SidebarLink> -->
          <SidebarLink :to="{ path: '/favorites' }" icon="i-solar:hearts-linear" active-icon="i-solar:hearts-bold">
            Favorites
          </SidebarLink>
        </div>
      </div>
    </div>
    <div mb-4 px-2 mt-auto>
      <SidebarLink :to="{ path: '/faq' }" icon="i-solar:info-circle-linear" active-icon="i-solar:info-circle-bold">
        FAQ
      </SidebarLink>
    </div>

    <div
      absolute h-400px w-300px
      pointer-events-none rounded-full blur-xl transition-all duration-1000 op8 blur-2xl
      class="bg-image left-70% top-20%"
    />
  </div>
</template>

<style scoped>
  .bg-image {
    background-image: linear-gradient(-45deg, #00a98e 30%, #009ff7);
  }
</style>
