import type { PlayerMode, Track } from '~/types'

export const useMusicStore = defineStore('music', () => {
	const currentTrack = ref<Track | undefined>()
	const isPlaying = ref(false)
	const expandPlayer = ref(false)

	const playerMode = ref<PlayerMode>('list')

	if (getCurrentInstance()) {
		onMounted(() => {
			const item = localStorage.getItem('playerMode')
			if (item)
				playerMode.value = item as PlayerMode
		})
	}

	watch(playerMode, () => localStorage.setItem('playerMode', playerMode.value))

	const currentPlaylist = ref<Track[]>()

	const setCurrentPlaylist = (list: Track[]) => {
		console.log('set currentPlaylist',list);
		
		currentPlaylist.value = list
	}

	const setPlayerMode = (val?: PlayerMode) => {
		if (val)
			playerMode.value = val
		else if (playerMode.value === 'none')
			playerMode.value = 'list'
		else if (playerMode.value === 'list')
			playerMode.value = 'repeat'
		else
			playerMode.value = 'none'
	}

	const closePlayer = () => {
		currentTrack.value = undefined
		expandPlayer.value = false
	}

	const currentTrackIndex = computed(() => {
		return currentPlaylist.value?.findIndex(track => track.id === currentTrack.value?.id)
	})

	const setIsPlaying = (val: boolean) => {
		isPlaying.value = val
	}

	const setCurrentTrack = (track: Track | undefined) => {
		(currentTrack.value as any) = track ? { ...track } : undefined
	}

	const playNext = () => {
		console.log(currentPlaylist.value,'playlist');

		const i = currentTrackIndex?.value
		const length = currentPlaylist.value?.length ?? 0

		if (Number.isInteger(i) && i! < length - 1)
			setCurrentTrack(currentPlaylist.value?.[i! + 1])
	}

	const playPrev = () => {
		const i = currentTrackIndex?.value
		if (i && i > 0)
			setCurrentTrack(currentPlaylist.value?.[i - 1])
	}

	const getRecentTracks = (): Track[] => {
		if (process.client) {
			try {
				const recentStr = localStorage.getItem('recentPlayed')
				if (!recentStr)
					return []

				const recent = JSON.parse(recentStr)
				return recent as Track[]
			}
			catch (err) {}
		}
		return []
	}

	watch(currentTrack, () => {
		const route = useRoute()
		if (currentTrack.value && route.path !== '/recent') {
			const recent = getRecentTracks()

			if (recent.length) {
				const index = recent.findIndex(track => track.id === currentTrack.value?.id)
				if (index !== -1)
					recent.splice(index, 1)
			}
			if (recent.length === 50)
				recent.splice(recent.length - 1, 1)

			recent.unshift(currentTrack.value)
			localStorage.setItem('recentPlayed', JSON.stringify(recent))
		}
	})

	return {
		currentTrack,
		setCurrentTrack,
		setCurrentPlaylist,
		currentPlaylist,
		isPlaying,
		setIsPlaying,
		setPlayerMode,
		playerMode,
		playNext,
		playPrev,
		expandPlayer,
		closePlayer,
	}
})

if (import.meta.hot)
	import.meta.hot.accept(acceptHMRUpdate(useMusicStore, import.meta.hot))
