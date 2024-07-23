import { delay } from "./utils";

export function useInfiniteGrid(loading: Ref<boolean>, fetchMore: Function, isLastPage: Ref<boolean>, offset = 400) {
	onMounted(async () => {
		if (process.client) {
			// useInfiniteScroll(document, async () => {
			// 	if (!loading.value)
			// 		fetchMore()
			// }, { offset: { bottom: offset } })

			while (!unref(isLastPage.value)) {
				if (!loading.value) {
					fetchMore()
					await delay(2000)
				}
			}
		}
	})
}
