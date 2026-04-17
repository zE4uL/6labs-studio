import { useState, useEffect } from 'react'
import { HomePage } from './pages/HomePage'
import { DesignSystemLayout } from './design-system/DesignSystemLayout'
import { BaristaProvider } from './state/BaristaContext'

type Page = 'home' | 'ds'

function getPage(): Page {
  const hash = window.location.hash
  if (hash.startsWith('#/design-system')) return 'ds'
  return 'home'
}

function App() {
  const [page, setPage] = useState<Page>(getPage)

  useEffect(() => {
    const handleHash = () => setPage(getPage())
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  if (page === 'ds') return <DesignSystemLayout />
  return (
    <BaristaProvider>
      <HomePage />
    </BaristaProvider>
  )
}

export default App
