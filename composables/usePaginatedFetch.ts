interface PaginatedFetchOptions {
	limit?: number
	page?: number
}

export async function usePaginatedFetch<T = any>(url: string, options?: PaginatedFetchOptions) {
	const limit = useState(`${url}_limit`, () => options?.limit ?? 10)
	const page = useState(`${url}_page`, () => options?.page ?? 0)
	const result = useState<T[]>(`${url}_data`, () => [])
	const isLastPage = useState(`${url}_isLastPage`, () => false)

	const { data, pending, error } = await useFetch<{ data: T[]; total: number }>(() => `${url}?limit=${limit.value}&page=${page.value}`)

	if (data.value?.data) {
		if (data.value.total === 0)
			isLastPage.value = true
		result.value = [...data.value?.data]
	}

	watch(data, () => {
		const resData = data.value?.data

		if (data.value?.total === 0 || !data.value?.data?.length)
			isLastPage.value = true

		if (Array.isArray(resData))
			result.value = [...result.value, ...resData]
	})

	const fetchMore = async () => {
		if (!pending.value && !isLastPage.value && !error.value) {
			page.value = page.value + 1
		}
	}

	return { data: result, fetchMore, loading: pending, page, isLastPage }
}
