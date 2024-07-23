<script lang="ts" setup>
import { DEEZER } from '~/constants'
import type { Album, Track } from '~/types'

const route = useRoute()
definePageMeta({ validate: async route => /^\d+$/.test(route.params.id as string) })

const id = computed(() => route.params.id as string)
const { data } = await useFetch<Album>(() => `${DEEZER().album(id.value)}`)

if (!data.value || (data.value as any).error)
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })

const durationText = useDurationText(data.value?.duration ? Number(data.value?.duration) : 0)

const { data: albumTracks, fetchMore, loading, isLastPage } = await usePaginatedFetch<Track>(
    `${DEEZER().album(id.value)}/tracks`,
    { limit: 10 },
)
const musicStore = useMusicStore()

watch(albumTracks, () => musicStore.setCurrentPlaylist(albumTracks.value))
useInfiniteGrid(loading, fetchMore, isLastPage)

function playSong() {
	albumTracks?.value.length && musicStore.setCurrentPlaylist(albumTracks.value)
}

useSeoMeta({
  title: data.value.title,
  description: `Album: ${data.value.title} · Artist: ${data.value.artist.name}. 
Explore albums from hundreds of artists in nuxic.`,
  ogImage: data.value.cover_big,
})
</script>

<template>
  <div v-if="data" p="x2 y3" lt-md:py-0 lt-md:px-3 overflow-hidden>
    <div absolute top-0 left-0 z-1 blur-2xl w-full h80 op20 lt-md:op40 overflow-hidden>
      <NuxtImg
        v-if="data?.cover_small"
        animate-fade-in animate-duration-400
        :src="data?.cover_small" object-cover wfull hfull
      />
    </div>

    <div flex relative z-10 flex-col>
      <div flex flex-row lt-md:flex-col>
        <div flex flex-row lt-lg:mb5>
          <div
            animate-fade-in-right animate-duration-200 rounded-3xl
            overflow-hidden w-52 h-52 min-w-52 min-h-52 relative
            class="lt-md:(h-40 w-40 min-h-40 min-w-40)"
          >
            <ImageBlurLoader
              v-if="data?.cover_medium"
              :big-image-src="data?.cover_medium"
              :small-image-src="data?.cover_small"
              class="object-cover wfull hfull"
            />
          </div>
          <div
            animate-fade-in-right
            animate-duration-400
            flex="~ col" space="y2"
            ml10 lt-lg:ml6
          >
            <h1 mb-2 text-2xl lt-md:text-lg font-bold>
              <span min-w20 lt-md:min-w17 inline-flex>Album:</span> {{ data.title }}
            </h1>
            <h2 lt-md:text-sm>
              <span min-w20 lt-md:min-w17 inline-flex>Artist:</span> <NuxtLink :to="`/artists/${data.artist?.id}`" class="link">
                {{ data.artist?.name }}
              </NuxtLink>
            </h2>
            <h2 v-if="data?.nb_tracks" lt-md:text-sm>
              <span min-w20 lt-md:min-w17 inline-flex>Tracks:</span>
              {{ data?.nb_tracks }}
            </h2>
            <h2 v-if="data.release_date" lt-md:text-sm>
              <span min-w20 lt-md:min-w17 inline-flex>Release:</span>
              {{ data.release_date }}
            </h2>
            <h2 lt-md:text-sm>
              <span inline-flex min-w20 lt-md:min-w17>Duration:</span>
              {{ durationText }}
            </h2>
            <h2 lt-md:text-sm flex items-center>
              <span min-w20 lt-md:min-w17 inline-flex>Collaborators:</span>
              <span flex ml4>
                <NuxtLink
                  v-for="(collaborator, index) in data.contributors"
                  :key="index" :title="collaborator.name" :to="`/artists/${collaborator?.id}`" class="link"
                  hover:op80
                >
                  <NuxtImg
                    v-if="collaborator.picture_small"
                    :src="collaborator.picture_small"
                    w9 object-cover wfull hfull rounded-full
                  />
                </NuxtLink>
              </span>
            </h2>
          </div>
        </div>
        <div
          animate-fade-in-right animate-duration-600 mt2 lt-md:ml0
          animate-duration-300 ml-auto
          mt-8 inline-flex h-min space-x-4
        >
          <Button flex p3 round class="no-touch">
            <ClientOnly>
              <ButtonLike
                circle-class="!w10 !h10"
                icon-class="!text-xl"
                :active="useUserPreferencesStore().likedAlbums.some(item => item.id === data?.id)"
                @change="useUserPreferencesStore().likeAlbum(data)"
              />
            </ClientOnly>
          </Button>
          <a :href="data.link" target="_blank" flex>
            <Button flex p4 round items-center>
              Open in Deezer
              <span ml2 text-lg op40 i-solar:arrow-right-up-linear />
            </Button>
          </a>
        </div>
      </div>
    </div>

    <div class="">
      <MusicContainer
        :always-grid="true"
        grid-class="!grid-cols-minmax-12rem lg:!grid-cols-minmax-15rem"
        :navigate-back="true"
        title-class="ml3" mt15 lt-lg:mt10 title="Album Tracks"
      >
        <CardTrack
          v-for="(track, j) in albumTracks"
          :key="j"
          :track="track"
          data-aos="fade-left"
          :data-aos-delay="100 * j"
          :data-aos-offset="-300"
          @play="playSong"
        />
      </MusicContainer>

      <div v-if="loading" flex justify-center items-center wfull h-30>
        <div text-primary-300 text-4xl flex i-svg-spinners:3-dots-move />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
