<script lang="ts" setup>
import { DEEZER } from '~/constants'
import type { Album } from '~/types'

const { data, fetchMore, loading, isLastPage } = await usePaginatedFetch<Album>(`${DEEZER().albums}`, { limit: 30 })
useInfiniteGrid(loading, fetchMore, isLastPage)

useSeoMeta({
	title: 'Explore albums',
	description: 'Explore albums from hundreds of artists in nuxic.',
})
</script>

<template>
	<MusicContainer lt-md:px2 :always-grid="true" grid-class="!grid-cols-minmax-12rem lg:!grid-cols-minmax-15rem"
		title="Explore Albums">
		<CardAlbum v-for="(album, j) in data" :key="j" data-aos="fade-left" :data-aos-delay="100 * j"
			:data-aos-offset="-300" :album="album" />
	</MusicContainer>
	<div v-if="loading" flex justify-center items-center wfull h-30>
		<div text-primary-300 text-4xl flex i-svg-spinners:3-dots-move />
	</div>
</template>

<style lang="scss" scoped></style>
