import { useSelector } from "react-redux"
import { selectAllAssets } from "../features/assets/assetsSlice"

const Header = () => {
  const assets = useSelector(selectAllAssets) || []

  // Calculate total market cap
  const totalMarketCap = assets.reduce((sum, asset) => sum + asset.marketCap, 0)

  // Calculate 24h volume
  const total24hVolume = assets.reduce((sum, asset) => sum + asset.volume, 0)

  // Format numbers with commas and abbreviations
  const formatNumber = (num) => {
    if (num >= 1000000000000) {
      return `$${(num / 1000000000000).toFixed(2)}T`
    }
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`
    }
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`
    }
    return `$${num.toLocaleString()}`
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Crypto Tracker</h1>
            <p className="text-gray-500 dark:text-gray-400">Real-time cryptocurrency prices</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Market Cap</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">{formatNumber(totalMarketCap)}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">24h Volume</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">{formatNumber(total24hVolume)}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Assets</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">{assets.length}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
