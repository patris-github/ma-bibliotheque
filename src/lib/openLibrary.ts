const OPEN_LIBRARY_SEARCH_URL = 'https://openlibrary.org/search.json'
const OPEN_LIBRARY_COVER_URL = 'https://covers.openlibrary.org/b/olid'

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
  try {
    const params = new URLSearchParams({
      title: titre,
      author: auteur,
      limit: '1',
      fields: 'key,title,author_name,cover_edition_key,edition_key',
    })

    const response = await fetch(`${OPEN_LIBRARY_SEARCH_URL}?${params}`)

    if (!response.ok) {
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
  } catch {
    // Network error or parsing error
    return null
  }
}
