import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { startWebSocket, stopWebSocket, fetchInitialData } from "./services/binanceWebSocket"
import { selectAllAssets } from "./features/assets/assetsSlice"
import CryptoTable from "./components/CryptoTable"
import Header from "./components/Header"
import FilterPanel from "./components/FilterPanel"
import AssetDetail from "./components/AssetDetail"
import SearchBar from "./components/SearchBar"
import { store } from "./store"

function App() {
  const dispatch = useDispatch()
  const assets = useSelector(selectAllAssets) || [] // Add fallback empty array
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Set loading state
    setIsLoading(true)
    setError(null)

    const initializeData = async () => {
      try {
        console.log("Initializing app and fetching data...")

        // First fetch initial data
        await fetchInitialData(dispatch)

        // Then start the WebSocket connection
        startWebSocket(dispatch, () => store.getState())

        console.log("App initialization complete")
        setIsLoading(false)
      } catch (err) {
        console.error("Error during app initialization:", err)
        setError("Failed to load cryptocurrency data. Please try again later.")
        setIsLoading(false)
      }
    }

    initializeData()

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      console.log("Stopping WebSocket connection...")
      stopWebSocket()
    }
  }, [dispatch])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 dark:border-white mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading real-time crypto data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <main className="container mx-auto px-4 py-8">
                <div className="mb-6">
                  <SearchBar />
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-md transition-colors"
                    >
                      {showFilters ? "Hide Filters" : "Show Filters"}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {showFilters && (
                    <div className="md:col-span-1">
                      <FilterPanel />
                    </div>
                  )}

                  <div className={showFilters ? "md:col-span-3" : "md:col-span-4"}>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Market Overview</h2>
                      {assets.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-500 dark:text-gray-400">No cryptocurrency data available.</p>
                          <button
                            onClick={() => window.location.reload()}
                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                          >
                            Refresh
                          </button>
                        </div>
                      ) : (
                        <CryptoTable assets={assets} />
                      )}
                    </div>
                  </div>
                </div>
              </main>
            }
          />
          <Route path="/asset/:id" element={<AssetDetail />} />
        </Routes>
        <footer className="container mx-auto px-4 py-6 text-center text-gray-500 dark:text-gray-400">
          <p>© 2023 Crypto Tracker. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
