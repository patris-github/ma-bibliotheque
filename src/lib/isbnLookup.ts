const OPEN_LIBRARY_ISBN_URL = 'https://openlibrary.org/isbn'
const OPEN_LIBRARY_COVER_URL = 'https://covers.openlibrary.org/b/id'
const FETCH_TIMEOUT_MS = 8000 // 8 seconds timeout (ISBN lookup can be slower)

interface OpenLibraryISBNResult {
  title: string
  authors?: Array<{ key: string }>
  covers?: number[]
  publishers?: string[]
  publish_date?: string
  number_of_pages?: number
}

interface OpenLibraryAuthor {
  name: string
}

export interface BookFromISBN {
  titre: string
  auteur: string
  cover_url: string | null
}

const AUTHOR_TIMEOUT_MS = 5000 // 5 seconds timeout for author lookup

async function fetchAuthorName(authorKey: string): Promise<string | null> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), AUTHOR_TIMEOUT_MS)

  try {
    const response = await fetch(`https://openlibrary.org${authorKey}.json`, {
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    if (!response.ok) return null
    const data: OpenLibraryAuthor = await response.json()
    return data.name || null
  } catch {
    clearTimeout(timeoutId)
    return null
  }
}

export async function fetchBookByISBN(isbn: string): Promise<BookFromISBN | null> {
  // Clean ISBN - remove hyphens and spaces
  const cleanISBN = isbn.replace(/[-\s]/g, '')

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

  try {
    const response = await fetch(`${OPEN_LIBRARY_ISBN_URL}/${cleanISBN}.json`, {
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`[ISBN Lookup] Book not found for ISBN: ${cleanISBN}`)
      } else {
        console.warn(`[ISBN Lookup] API returned ${response.status} for ISBN: ${cleanISBN}`)
      }
      return null
    }

    const data: OpenLibraryISBNResult = await response.json()

    // Get author name if available
    let auteur = ''
    if (data.authors && data.authors.length > 0) {
      const authorName = await fetchAuthorName(data.authors[0].key)
      auteur = authorName || ''
    }

    // Get cover URL if available
    let cover_url: string | null = null
    if (data.covers && data.covers.length > 0) {
      cover_url = `${OPEN_LIBRARY_COVER_URL}/${data.covers[0]}-M.jpg`
    }

    return {
      titre: data.title || '',
      auteur,
      cover_url,
    }
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error && error.name === 'AbortError') {
      console.warn(`[ISBN Lookup] Request timeout for ISBN: ${cleanISBN}`)
    } else {
      console.warn(`[ISBN Lookup] Network error for ISBN: ${cleanISBN}:`, error)
    }
    return null
  }
}

export function isValidISBN(code: string): boolean {
  const clean = code.replace(/[-\s]/g, '')
  // ISBN-10: 10 digits (last can be X)
  // ISBN-13: 13 digits (starts with 978 or 979)
  // EAN-13: 13 digits (starts with 978 or 979 for books)
  return /^(\d{10}|\d{9}X|\d{13})$/i.test(clean)
}
