<script setup lang="ts">
import { DEEZER } from '~/constants'
import type { Artist, Track } from '~/types'

const { data } = await useFetch('/api/popular_genres')
const { data: tracks } = await useFetch<{ data: Track[] }>(`${DEEZER().tracks}?limit=12`)
const { data: artists } = await useFetch<{ data: Artist[] }>(`${DEEZER().artists}?limit=21`)

const musicStore = useMusicStore()
</script>

<template>
  <MusicContainer title-class="ml3" title="Explore Genres" title-link="/genres">
    <CardGenre
      v-for="(genre, i) in data"
      :key="genre.id"
      :genre="genre"
      data-aos="fade-left"
      :data-aos-delay="100 * i"
      :data-aos-offset="-300"
    />
    <template #slider>
      <CardGenre
        v-for="genre in data"
        :key="genre.id"
        :genre="genre"
        class="min-w-20rem lt-lg:min-w-10rem"
      />
    </template>
  </MusicContainer>

  <MusicContainer title-class="ml3" mt20 lt-lg:mt10 title="Explore Tracks" title-link="/tracks">
    <CardTrack
      v-for="(track, j) in tracks?.data"
      :key="j"
      :track="track"
      data-aos="fade-left"
      :data-aos-delay="100 * j"
      :data-aos-offset="-300"
      @play="tracks?.data.length && musicStore.setCurrentPlaylist(tracks?.data)"
    />
    <template #slider>
      <CardTrack
        v-for="track in tracks?.data"
        :key="track.id"
        :track="track"
        class="min-w-20rem lt-lg:min-w-13rem"
        @play="tracks?.data.length && musicStore.setCurrentPlaylist(tracks?.data)"
      />
    </template>
  </MusicContainer>

  <MusicContainer title-class="ml3" grid-class="!grid-cols-minmax-5rem lg:!grid-cols-minmax-9rem" mt20 lt-lg:mt10 title="Explore Artists" title-link="/artists">
    <CardArtist
      v-for="(artist, j) in artists?.data"
      :key="j"
      :artist="artist"
      data-aos="fade-left"
      :data-aos-delay="100 * j"
      :data-aos-offset="-300"
    />
    <template #slider>
      <CardArtist
        v-for="artist in artists?.data"
        :key="artist.id"
        :artist="artist"
        class="min-w-20rem lt-lg:min-w-9.5rem"
      />
    </template>
  </MusicContainer>
</template>
