const OPEN_LIBRARY_SEARCH_URL = 'https://openlibrary.org/search.json'
const OPEN_LIBRARY_COVER_URL = 'https://covers.openlibrary.org/b/olid'
const FETCH_TIMEOUT_MS = 5000 // 5 seconds timeout

interface OpenLibrarySearchResult {
  docs: Array<{
    key: string
    title: string
    author_name?: string[]
    cover_edition_key?: string
    edition_key?: string[]
  }>
  numFound: number
}

export async function fetchBookCover(
  titre: string,
  auteur: string
): Promise<string | null> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

  try {
    const params = new URLSearchParams({
      title: titre,
      author: auteur,
      limit: '1',
      fields: 'key,title,author_name,cover_edition_key,edition_key',
    })

    const response = await fetch(`${OPEN_LIBRARY_SEARCH_URL}?${params}`, {
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      console.warn(`[OpenLibrary] API returned ${response.status} for "${titre}"`)
      return null
    }

    const data: OpenLibrarySearchResult = await response.json()

    if (data.numFound === 0 || !data.docs[0]) {
      return null
    }

    const book = data.docs[0]

    // Try cover_edition_key first, then first edition_key
    const editionKey = book.cover_edition_key || book.edition_key?.[0]

    if (!editionKey) {
      return null
    }

    // Return the cover URL (Medium size)
    return `${OPEN_LIBRARY_COVER_URL}/${editionKey}-M.jpg`
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error && error.name === 'AbortError') {
      console.warn(`[OpenLibrary] Request timeout for "${titre}"`)
    } else {
      console.warn(`[OpenLibrary] Network error for "${titre}":`, error)
    }
    return null
  }
}
