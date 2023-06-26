<script lang="ts" setup>
const filter = ref<'artists' | 'tracks' | 'albums'>('tracks')

const musicStore = useMusicStore()
const userPreferences = useUserPreferencesStore()
const { likedAlbums, likedArtists, likedTracks } = storeToRefs(userPreferences)

const filters = [
  { label: 'Tracks', key: 'tracks' },
  { label: 'Artists', key: 'artists' },
  { label: 'Albums', key: 'albums' },
]

const noData = computed(() => {
  const val = filter.value
  return (val === 'albums' && !likedAlbums.value.length)
      || (val === 'artists' && !likedArtists.value.length)
      || (val === 'tracks' && !likedTracks.value.length)
})
</script>

<template>
  <div>
    <NavbarSearchFilters v-model:filter="filter" lt-lg:px2 :default-items="filters" />

    <div
      flex flex-col flex-grow grow hfull wfull
    >
      <div v-if="noData" absoluteCenter flex="~ col" justify-center items-center>
        <span
          flex text-9xl op10
          :class="{
            ' i-solar:music-library-2-linear': filter === 'albums',
            ' i-solar:people-nearby-outline': filter === 'artists',
            ' i-solar:turntable-music-note-linear': filter === 'tracks',
          }"
        />
        <span text-xl mt3 op60>No {{ filter }} liked yet</span>
      </div>
      <div v-else>
        <template v-if="filter === 'artists'">
          <MusicContainer lt-md:px3 :always-grid="true" grid-class="!grid-cols-minmax-10rem !mt0 lg:!grid-cols-minmax-10rem">
            <CardArtist
              v-for="(artist, j) in likedArtists"
              :key="j"
              :artist="artist"
            />
          </MusicContainer>
        </template>
        <template v-else-if="filter === 'tracks'">
          <MusicContainer lt-md:px2 :always-grid="true" grid-class="!grid-cols-minmax-12rem !mt0 lg:!grid-cols-minmax-15rem">
            <CardTrack
              v-for="(track, j) in likedTracks"
              :key="j"
              :track="track"
              data-aos="fade-left"
              :data-aos-delay="100 * j"
              :data-aos-offset="-300"
              @play="likedTracks?.length && musicStore.setCurrentPlaylist(likedTracks)"
            />
          </MusicContainer>
        </template>
        <template v-else>
          <MusicContainer lt-md:px2 :always-grid="true" grid-class="!grid-cols-minmax-12rem lg:!grid-cols-minmax-15rem !mt0">
            <CardAlbum
              v-for="(album, j) in likedAlbums"
              :key="j"
              data-aos="fade-left"
              :data-aos-delay="100 * j"
              :data-aos-offset="-300"
              :album="album"
            />
          </MusicContainer>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
