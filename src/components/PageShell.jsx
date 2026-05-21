import { useEffect, useState } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
import { getAssetsForPath } from '../config/pageAssets'
import { usePreloadAssets } from '../hooks/usePreloadAssets'
import LoadingScreen from './LoadingScreen'
import './PageShell.css'

const FADE_MS = 450

function PageShell({ routes }) {
  const location = useLocation()
  const assets = getAssetsForPath(location.pathname)
  const ready = usePreloadAssets(assets)
  const element = useRoutes(routes)
  const [loaderMounted, setLoaderMounted] = useState(true)

  useEffect(() => {
    if (!ready) {
      setLoaderMounted(true)
      return undefined
    }

    const timer = window.setTimeout(() => setLoaderMounted(false), FADE_MS)
    return () => window.clearTimeout(timer)
  }, [ready])

  const showLoader = !ready || loaderMounted

  return (
    <div className="page-shell">
      <div className={`page-shell-content ${ready ? 'page-shell-content--visible' : ''}`}>
        {element}
      </div>
      {showLoader && (
        <div className={`page-shell-loading ${ready ? 'page-shell-loading--hide' : ''}`}>
          <LoadingScreen />
        </div>
      )}
    </div>
  )
}

export default PageShell
