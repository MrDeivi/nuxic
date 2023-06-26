export function useDownloadFile(
  uri: string | Ref<string> | ComputedRef<string>,
  name: string | Ref<string> | ComputedRef<string>,
) {
  const download = () => {
    if (unref(name) && unref(uri)) {
      fetch(unref(uri) as string)
        .then(response => response.blob())
        .then((blob) => {
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = unref(name) as string
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })
        .catch((error) => {
          console.error('Error downloading fil:', error)
        })
    }
  }

  return { download }
}
