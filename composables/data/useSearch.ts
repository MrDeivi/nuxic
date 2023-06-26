import { DEEZER } from '~/constants'
import type { Album, Artist, SearchFilter, Track } from '~/types'

export function useSearch() {
  const search = useState('search', () => '')
  const searchFilter = useState<SearchFilter>('searchFilter', () => 'all')

  const searchDebounced = useDebounce(search, 400)
  const { data, pending } = useLazyFetch<{ data: (Artist | Album | Track)[] }>(
    () => `${DEEZER().search}/${searchFilter.value === 'all' ? '' : searchFilter.value}?q=${searchDebounced.value}`, {},
  )

  return { search, searchDebounced, searchFilter, data, loading: pending }
}
