import { acceptHMRUpdate, defineStore } from 'pinia'
import type { RemovableRef } from '@vueuse/core'
import type { Album, Artist, Track } from '~/types'

export const useUserPreferencesStore = defineStore('userPreferences', () => {
  const likedTracks = useLocalStorage<Track[]>('likedTracks', [])
  const likedArtists = useLocalStorage<Artist[]>('likedArtists', [])
  const likedAlbums = useLocalStorage<Album[]>('likedAlbums', [])
  const recentPlayed = useLocalStorage<Track[]>('recentPlayed', [])

  function _toggle<T extends { id: number }>(list: RemovableRef<T[]>, item: T) {
    const index = list.value.findIndex(el => el.id === item.id)
    if (index !== -1)
      list.value.splice(index, 1)
    else
      list.value.push(item)
  }

  const likeTrack = (track: Track) => _toggle(likedTracks, track)
  const likeArtist = (artist: Artist) => _toggle(likedArtists, artist)
  const likeAlbum = (album: Album) => _toggle(likedAlbums, album)

  return {
    recentPlayed,
    likedTracks,
    likedArtists,
    likedAlbums,
    likeTrack,
    likeArtist,
    likeAlbum,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserPreferencesStore, import.meta.hot))
