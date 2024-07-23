<script lang="ts" setup>
import { DEEZER } from '~/constants'
import type { Artist, Track } from '~/types'

const route = useRoute()
definePageMeta({ validate: async route => /^\d+$/.test(route.params.id as string) })

const id = computed(() => route.params.id as string)
const { data } = await useFetch<Artist>(() => `${DEEZER().artist(id.value)}`)

if (!data.value || (data.value as any).error)
	throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })

const { data: topTracks, fetchMore, loading, isLastPage } = await usePaginatedFetch<Track>(
	`${DEEZER().artist(id.value)}/top`,
	{ limit: 10 },
)

useInfiniteGrid(loading, fetchMore, isLastPage)
const musicStore = useMusicStore()
watch(topTracks, () => musicStore.setCurrentPlaylist(topTracks.value))

useSeoMeta({
	title: data.value.name,
	description: `Artist: ${data.value.name} · Albums: ${data.value.nb_album}
Explore hundreds of artists in nuxic.`,
	ogImage: data.value.picture_big,
})
</script>

<template>
	<div v-if="data" p="x2 y3" lt-md:py-0 lt-md:px-3 overflow-hidden>
		<div absolute top-0 left-0 z-1 blur-2xl w-full h80 op20 lt-md:op40 overflow-hidden>
			<NuxtImg animate-fade-in animate-duration-400 :src="data.picture_small" object-cover wfull hfull />
		</div>

		<div flex relative z-10 flex-col>
			<div flex flex-col items-center justify-center>
				<div animate-fade-in-right animate-duration-200 rounded-3xl overflow-hidden w-50 h-50 min-w-50 min-h-50
					class="lt-md:(h-40 w-40 min-h-40 min-w-40)">
					<ImageBlurLoader v-if="data.picture_medium" :big-image-src="data.picture_medium"
						:small-image-src="data.picture_small"
						class="object-cover wfull hfull animate-fade-in animate-duration-400" />
				</div>
				<div animate-fade-in-right animate-duration-400 mt2 flex="~ col" space="y3" items-center justify-center
					ml0 mt4>
					<h1 text-3xl lt-md:text-2xl font-bold>
						{{ data.name }}
					</h1>
					<div flex space-x-3>
						<Badge op70 font-semibold>
							Fans: {{ Number(data.nb_fan).toLocaleString('en') }}
						</Badge>
						<Badge op70 font-semibold>
							Albums: {{ data.nb_album }}
						</Badge>
					</div>

					<div animate-fade-in-right animate-duration-600 mt2 lt-md:ml0 animate-duration-300 mt-8 ml-auto
						inline-flex h-min space-x-4 justify-center>
						<Button flex p3 round class="no-touch">
							<ClientOnly>
								<ButtonLike circle-class="!w10 !h10" icon-class="!text-xl"
									:active="useUserPreferencesStore().likedArtists.some(item => item.id === data?.id)"
									@change="useUserPreferencesStore().likeArtist(data)" />
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
		</div>

		<div class="">
			<MusicContainer :always-grid="true" grid-class="!grid-cols-minmax-12rem lg:!grid-cols-minmax-15rem"
				:navigate-back="true" title-class="ml3" mt15 lt-lg:mt10 title="Top Tracks">
				<CardTrack v-for="(track, j) in topTracks" :key="j" :track="track" data-aos="fade-left"
					:data-aos-delay="100 * j" :data-aos-offset="-300"
					@play="topTracks?.length && musicStore.setCurrentPlaylist(topTracks)" />
			</MusicContainer>

			<div v-if="loading" flex justify-center items-center wfull h-30>
				<div text-primary-300 text-4xl flex i-svg-spinners:3-dots-move />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
