export interface Genre {
  id: number
  name: string
  picture: string
  picture_small: string
  picture_medium: string
  picture_big: string
  picture_xl: string
}

export interface Artist {
  id: number
  name: string
  link: string
  share: string
  picture: string
  picture_small: string
  picture_medium: string
  picture_big: string
  picture_xl: string
  nb_album: string
  nb_fan: string
  radio: boolean
  tracklist: string
}

export interface Album {
  id: number
  title: string
  upc: string
  link: string
  share: string
  cover: string
  cover_small: string
  cover_medium: string
  cover_big: string
  cover_xl: string
  md5_image: string
  genre_id: number
  genres: Genre[]
  label: string
  nb_tracks: string
  duration: string
  fans: string
  release_date: string
  record_type: string
  available: boolean
  alternative: object
  tracklist: string
  explicit_lyrics: boolean
  explicit_content_lyrics: number
  explicit_content_cover: number
  contributors: Artist[]
  artist: Artist
  tracks: Track[]
}

export interface Chart {
  tracks: Track[]
  albums: Album[]
  artists: Artist[]
  playlists: Playlist[]
  podcasts: Podcast[]
}

export interface Playlist {
  id: number
  title: string
  description: string
  duration: number
  public: boolean
  is_loved_track: boolean
  collaborative: boolean
  nb_tracks: number
  unseen_track_count: number
  fans: number
  link: string
  share: string
  picture: string
  picture_small: string
  picture_medium: string
  picture_big: string
  picture_xl: string
  checksum: string
  tracks: Track[]
}

export interface Podcast {
  id: number
  title: string
  description: string
  available: boolean
  fans: number
  link: string
  share: string
  picture: string
  picture_small: string
  picture_medium: string
  picture_big: string
  picture_xl: string
}

export interface Radio {
  id: number
  title: string
  description: string
  share: string
  picture: string
  picture_small: string
  picture_medium: string
  picture_big: string
  picture_xl: string
  tracklist: string
  md5_image: string
}

export interface Track {
  id: number
  readable: boolean
  title: string
  title_short: string
  title_version: string
  unseen: boolean
  isrc: string
  link: string
  share: string
  duration: number
  track_position: number
  disk_number: number
  rank: number
  release_date: string
  explicit_lyrics: string
  explicit_content_lyrics: number
  explicit_content_cover: number
  preview: string
  bpm: number
  gain: number
  available_countries: object[]
  alternative?: Track
  contributors?: Artist[]
  md5_image: string
  artist: Artist
  album: Album
}

export type PlayerMode = 'repeat' | 'list' | 'none'
export type SearchFilter = 'all' | 'artist' | 'track' | 'album'
export interface CollapsablePanel {
  title: string
  description: string
}
