export function useDurationText(duration: Ref<number> | number) {
  const durationText = computed(() => {
    const minutes = Math.floor(unref(duration) / 60)
    let seconds: any = Number.parseInt(`${unref(duration) - minutes * 60}`)

    if (seconds < 10)
      seconds = `0${seconds}`

    return `${minutes}:${seconds}`
  })

  return durationText
}
