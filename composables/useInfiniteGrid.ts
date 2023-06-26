export function useInfiniteGrid(loading: Ref<boolean>, fetchMore: Function, offset = 400) {
  if (process.client) {
    useInfiniteScroll(document, async () => {
      if (!loading.value)
        fetchMore()
    }, { offset: { bottom: offset } })
  }
}
