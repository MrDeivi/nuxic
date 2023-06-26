<script lang="ts" setup>
const musicStore = useMusicStore()
</script>

<template>
  <div>
    <Sidebar />
    <Navbar />
    <MobileBar />
    <MobileNav />
    <ClientOnly>
      <MusicPlayer
        v-if="musicStore.currentTrack"
        :play-next="musicStore.playNext"
        :play-prev="musicStore.playPrev"
        :player-mode="musicStore.playerMode"
        :track="musicStore.currentTrack"
        :expand-player="musicStore.expandPlayer"
        :playlist="musicStore.currentPlaylist"
        @expand="musicStore.expandPlayer = !musicStore.expandPlayer"
        @set-player-mode="musicStore.setPlayerMode"
        @change="musicStore.setIsPlaying"
        @close="musicStore.closePlayer"
      />
    </ClientOnly>
    <div p="l-80 t-24 r-6 b-6" lt-lg="pt13 pl0 pr0" transition-all duration-200>
      <div
        wfull z-10 hfull bg-white:7 lt-lg:bg-transparent p7
        px10 lt-md:px0 relative overflow-hidden
        class="rounded-1.4rem min-h-[calc(100vh-8rem)] lt-md:rounded-none"
      >
        <slot />
      </div>
      <Footer />
    </div>
  </div>
</template>

<style scoped></style>
