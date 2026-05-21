import { useEffect, useState } from 'react'

function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(src)
    img.onerror = () => reject(new Error(`Failed to load ${src}`))
    img.src = src
  })
}

/**
 * Preloads image URLs (and web fonts) before showing the page.
 */
export function usePreloadAssets(sources) {
  const [ready, setReady] = useState(false)
  const key = sources.join('|')

  useEffect(() => {
    let cancelled = false
    setReady(false)

    const unique = [...new Set(sources.filter(Boolean))]

    Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      ...unique.map((src) => preloadImage(src)),
    ])
      .then(() => {
        if (!cancelled) setReady(true)
      })
      .catch(() => {
        if (!cancelled) setReady(true)
      })

    return () => {
      cancelled = true
    }
  }, [key, sources])

  return ready
}
