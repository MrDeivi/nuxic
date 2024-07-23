<script lang="ts" setup>
import { DEEZER } from '~/constants'
import type { Radio, Track } from '~/types'

const route = useRoute()
const musicStore = useMusicStore()

definePageMeta({ validate: async route => /^\d+$/.test(route.params.id as string) })

const id = computed(() => route.params.id as string)

const { data: radio } = await useFetch<Radio>(() => `${DEEZER().radio}/${id.value}`)

if (!radio.value || (radio.value as any).error)
	throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })

const { data, fetchMore, loading, isLastPage } = await usePaginatedFetch<Track>(
	`${DEEZER().radio}/${id.value}/tracks`,
	{ limit: 10 },
)

watch(data, () => musicStore.setCurrentPlaylist(data.value))

useInfiniteGrid(loading, fetchMore, isLastPage)
const title = computed(() => `${radio.value?.title} radio`)

useSeoMeta({
	title: () => title.value,
	description: 'Explore trending tracks in the radio in nuxic.',
	ogImage: radio.value.picture_big,
})
</script>

<template>
	<div v-if="id && radio && data.length" p="x2 y3" lt-md:py-0 lt-md:px-3>
		<MusicContainer back-link="/radio" :always-grid="true"
			grid-class="!grid-cols-minmax-12rem lg:!grid-cols-minmax-15rem" :title="title">
			<CardTrack v-for="(track, j) in data" :key="j" :track="track" data-aos="fade-left" :data-aos-delay="100 * j"
				:data-aos-offset="-300" @play="data?.length && musicStore.setCurrentPlaylist(data)" />
		</MusicContainer>

		<div v-if="loading" flex justify-center items-center wfull h-30>
			<div text-primary-300 text-4xl flex i-svg-spinners:3-dots-move />
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
