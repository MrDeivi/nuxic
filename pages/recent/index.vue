<script lang="ts" setup>
const musicStore = useMusicStore()
const userPreferences = useUserPreferencesStore()
const { recentPlayed } = storeToRefs(userPreferences)
</script>

<template>
  <div class="">
    <MusicContainer
      :always-grid="true"
      grid-class="!grid-cols-minmax-12rem lg:!grid-cols-minmax-15rem"
      :navigate-back="true"
      title-class="ml3" title="Recent played tracks"
    >
      <CardTrack
        v-for="(track, j) in recentPlayed"
        :key="j"
        :track="track"
        data-aos="fade-left"
        :data-aos-delay="100 * j"
        :data-aos-offset="-300"
        @play="recentPlayed?.length && musicStore.setCurrentPlaylist(recentPlayed)"
      />
    </MusicContainer>
  </div>
</template>

<style lang="scss" scoped></style>
