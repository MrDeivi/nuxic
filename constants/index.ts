export function DEEZER() {
  const config = useAppConfig()

  return {
    genre: `${config.apiBaseUrl}/deezer/genre`,
    genreId: (id: string | number) => `${config.apiBaseUrl}/deezer/genre/${id}/artists`,
    search: `${config.apiBaseUrl}/deezer/search`,
    radio: `${config.apiBaseUrl}/deezer/radio`,
    artist: (id: string | number) => `${config.apiBaseUrl}/deezer/artist/${id}`,
    artists: `${config.apiBaseUrl}/deezer/artists`,
    track: (id: string | number) => `${config.apiBaseUrl}/deezer/track/${id}`,
    tracks: `${config.apiBaseUrl}/deezer/tracks`,
    album: (id: string | number) => `${config.apiBaseUrl}/deezer/album/${id}`,
    albums: `${config.apiBaseUrl}/deezer/albums`,
    playlists: `${config.apiBaseUrl}/deezer/playlists`,
  }
}
