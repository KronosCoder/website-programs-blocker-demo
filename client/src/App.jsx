import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useBlocklist } from './hooks/useBlocklist'
import { useLanguage } from './context/LanguageContext'
import { LoadingSpinner } from './components/common/LoadingSpinner'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { WebsitesSection } from './components/websites/WebsitesSection'
import { ProgramsSection } from './components/programs/ProgramsSection'
import { ExportSection } from './components/export/ExportSection'
import Fallback from './fallback/fallback'
import './index.css'

function App() {
  const { t } = useLanguage()
  const { roomId } = useParams()

  if (!roomId || !roomId.startsWith('9') || roomId.length !== 3) {
    return <Fallback />
  }

  const {
    blocklist,
    loading,
    redirectUrl,
    addWebsite,
    deleteWebsite,
    addProgram,
    deleteProgram,
    exportBat,
    saveRedirectUrl
  } = useBlocklist(t, roomId)

  const [showExport, setShowExport] = useState(false)

  useEffect(() => {
    window.revealRedirectUrl = () => {
      setShowExport(true)
      console.log('Export section revealed!')
    }

    return () => {
      delete window.revealRedirectUrl
    }
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      {/* Animated Background */}
      <div className="app-background">
        <div className="light-orb light-orb-1 animate-glow"></div>
        <div className="light-orb light-orb-2 animate-glow"></div>
        <div className="light-orb light-orb-3 animate-glow"></div>
        <div className="light-orb light-orb-4 animate-glow"></div>
      </div>

      <div className="min-h-screen p-4 md:p-8 flex justify-center items-center relative">
        <div className="max-w-5xl w-full mx-auto flex flex-col gap-4">
          {/* Header */}
          <Header roomId={roomId} />

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WebsitesSection
              websites={blocklist.websites}
              onAdd={addWebsite}
              onDelete={deleteWebsite}
            />
            <ProgramsSection
              programs={blocklist.programs}
              onAdd={addProgram}
              onDelete={deleteProgram}
            />
          </div>

          {/* Export Section */}
          <ExportSection
            onExport={exportBat}
            isRevealRedirectUrl={showExport}
            redirectUrl={redirectUrl}
            onSaveRedirectUrl={saveRedirectUrl}
          />

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
