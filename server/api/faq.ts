export default defineEventHandler(() => {
  return [
    {
      title: 'What is Nuxic?',
      description: 'Nuxic is a music player built using the Nuxt3 framework and integrated with the Deezer API. ',
    },
    {
      title: 'How does Nuxic work?',
      description: 'The application leverages the power of Nuxt3, a modern web development framework, to create a seamless and server side rendered applications. It uses the Deezer API to fetch music data, including track information, album art, and artist details. Users can search for specific songs, artists, or albums and play them directly within the application.',
    },

    {
      title: 'Why are the songs limited to 30 seconds of playback?',
      description: 'The limitation of songs being reduced to 30 seconds of playback is due to the terms and conditions set by Deezer for their API usage. The Deezer API provides access to a wide range of music content, but the free tier of their API restricts full-length streaming.',
    },

    {
      title: 'Can I use Nuxic for free?',
      description: 'Nuxic is freely available to use and modify under an open source license. You can download the source code from our GitHub repository and customize it according to your needs. Please note that while the application is free to use, you may still need to comply with any licensing requirements imposed by Deezer for their API usage.',
    },

    {
      title: 'How do I install and run Nuxic locally?',
      description: 'To install and run Nuxic locally, you will need to follow the instructions in the project\'s documentation.',
    },

    {
      title: 'Is Nuxic affiliated with Deezer?',
      description: 'No, Nuxic utilizes the Deezer API to access and display music content, but it is not endorsed or certified by Deezer.',
    },
  ]
})
