// import { useEffect, useState } from "react"
// import { useParams, Link } from "react-router-dom"
// import { useSelector, useDispatch } from "react-redux"
// import { selectAssetById, toggleFavorite, selectIsFavorite, updateAssetDetails } from "../features/assets/assetsSlice"
// import DetailChart from "./DetailChart"

// const AssetDetail = () => {
//   const { id } = useParams()
//   const dispatch = useDispatch()
//   const asset = useSelector((state) => selectAssetById(state, id))
//   const isFavorite = useSelector((state) => selectIsFavorite(state, id))
//   const [loading, setLoading] = useState(true)
//   const [timeframe, setTimeframe] = useState("24h")
//   const [additionalInfo, setAdditionalInfo] = useState(null)

//   useEffect(() => {
//     // Fetch additional asset details
//     const fetchAssetDetails = async () => {
//       try {
//         setLoading(true)
//         await new Promise((resolve) => setTimeout(resolve, 1000))

//         const mockAdditionalInfo = {
//           description: `${asset?.name} is a decentralized cryptocurrency that aims to revolutionize the financial industry through blockchain technology.`,
//           website: "https://example.com",
//           twitter: "https://twitter.com/example",
//           github: "https://github.com/example",
//           reddit: "https://reddit.com/r/example",
//           marketData: {
//             allTimeHigh: asset?.price * 1.5,
//             allTimeHighDate: "2021-11-10",
//             allTimeLow: asset?.price * 0.2,
//             allTimeLowDate: "2020-03-13",
//             marketCapRank: Math.floor(Math.random() * 20) + 1,
//             totalSupply: asset?.maxSupply || asset?.circulatingSupply * 1.2,
//             fullyDilutedValuation: (asset?.maxSupply || asset?.circulatingSupply * 1.2) * asset?.price,
//           },
//           priceHistory: {
//             "24h": generatePriceHistory(24, asset?.price),
//             "7d": generatePriceHistory(7, asset?.price),
//             "30d": generatePriceHistory(30, asset?.price),
//             "90d": generatePriceHistory(90, asset?.price),
//             "1y": generatePriceHistory(365, asset?.price),
//           },
//         }

//         setAdditionalInfo(mockAdditionalInfo)

//         // Update asset details in Redux
//         dispatch(
//           updateAssetDetails({
//             id,
//             details: {
//               description: mockAdditionalInfo.description,
//               website: mockAdditionalInfo.website,
//               twitter: mockAdditionalInfo.twitter,
//               github: mockAdditionalInfo.github,
//             },
//           }),
//         )

//         setLoading(false)
//       } catch (error) {
//         console.error("Error fetching asset details:", error)
//         setLoading(false)
//       }
//     }

//     if (asset) {
//       fetchAssetDetails()
//     }
//   }, [id, asset, dispatch])

//   // Generate mock price history data
//   function generatePriceHistory(points, currentPrice) {
//     const data = []
//     const now = new Date()

//     for (let i = points; i >= 0; i--) {
//       const date = new Date(now)
//       date.setHours(now.getHours() - i)

//       // Generate a random price within ±20% of current price
//       const randomFactor = 0.8 + Math.random() * 0.4 // 0.8 to 1.2
//       const price = currentPrice * randomFactor

//       data.push({
//         timestamp: date.toISOString(),
//         price,
//       })
//     }

//     return data
//   }

//   // Format price with appropriate decimal places
//   const formatPrice = (price) => {
//     if (!price) return "$0.00"

//     if (price >= 1000) {
//       return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
//     }
//     if (price >= 1) {
//       return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`
//     }
//     return `$${price.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 8 })}`
//   }

//   // Format percentage
//   const formatPercentage = (percentage) => {
//     if (!percentage) return "0.00%"
//     return `${percentage > 0 ? "+" : ""}${percentage.toFixed(2)}%`
//   }

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   // Format market cap and other large numbers
//   const formatLargeNumber = (num) => {
//     if (!num) return "$0"

//     if (num >= 1000000000000) {
//       return `$${(num / 1000000000000).toFixed(2)}T`
//     }
//     if (num >= 1000000000) {
//       return `$${(num / 1000000000).toFixed(2)}B`
//     }
//     if (num >= 1000000) {
//       return `$${(num / 1000000).toFixed(2)}M`
//     }
//     return `$${num.toLocaleString()}`
//   }

//   if (!asset) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
//           <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Asset not found</h2>
//           <Link
//             to="/"
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md inline-flex items-center"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//               <path
//                 fillRule="evenodd"
//                 d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             Back to Market Overview
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-6">
//         <Link
//           to="/"
//           className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-md inline-flex items-center"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//             <path
//               fillRule="evenodd"
//               d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
//               clipRule="evenodd"
//             />
//           </svg>
//           Back to Market Overview
//         </Link>
//       </div>

//       <div className="grid gap-6 md:grid-cols-3">
//         <div className="md:col-span-2">
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center">
//                 <img src={asset.logo || "/placeholder.svg"} alt={asset.name} className="h-12 w-12 rounded-full mr-4" />
//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{asset.name}</h1>
//                   <p className="text-gray-500 dark:text-gray-400">{asset.symbol}</p>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <button
//                   className={`p-2 rounded-full ${isFavorite ? "text-yellow-400" : "text-gray-400"}`}
//                   onClick={() => dispatch(toggleFavorite(asset.id))}
//                 >
//                   <span className="text-xl">{isFavorite ? "★" : "☆"}</span>
//                 </button>

//                 {additionalInfo?.website && (
//                   <a
//                     href={additionalInfo.website}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
//                       />
//                     </svg>
//                   </a>
//                 )}

//                 {additionalInfo?.twitter && (
//                   <a
//                     href={additionalInfo.twitter}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
//                     </svg>
//                   </a>
//                 )}

//                 {additionalInfo?.github && (
//                   <a
//                     href={additionalInfo.github}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
//                     </svg>
//                   </a>
//                 )}
//               </div>
//             </div>

//             <div className="mb-6">
//               <div className="flex items-baseline">
//                 <h2 className="text-3xl font-bold text-gray-800 dark:text-white mr-3">{formatPrice(asset.price)}</h2>
//                 <span
//                   className={`text-lg font-semibold ${asset.twentyFourHourChange >= 0 ? "text-green-500" : "text-red-500"}`}
//                 >
//                   {formatPercentage(asset.twentyFourHourChange)} (24h)
//                 </span>
//               </div>
//             </div>

//             <div className="mb-4">
//               <div className="flex border-b border-gray-200 dark:border-gray-700">
//                 {["24h", "7d", "30d", "90d", "1y"].map((period) => (
//                   <button
//                     key={period}
//                     className={`py-2 px-4 ${
//                       timeframe === period
//                         ? "border-b-2 border-blue-500 text-blue-500"
//                         : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//                     }`}
//                     onClick={() => setTimeframe(period)}
//                   >
//                     {period}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="h-80">
//               {loading || !additionalInfo ? (
//                 <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 animate-pulse">
//                   <p className="text-gray-500 dark:text-gray-400">Loading chart data...</p>
//                 </div>
//               ) : (
//                 <DetailChart data={additionalInfo.priceHistory[timeframe]} timeframe={timeframe} />
//               )}
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
//             <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">About {asset.name}</h2>

//             {loading ? (
//               <div className="space-y-2">
//                 <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
//                 <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
//                 <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
//               </div>
//             ) : (
//               <p className="text-gray-600 dark:text-gray-300 mb-6">
//                 {additionalInfo?.description || "No description available."}
//               </p>
//             )}
//           </div>
//         </div>

//         <div>
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
//             <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Market Stats</h3>
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">Market Cap</p>
//                   {loading ? (
//                     <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
//                   ) : (
//                     <p className="font-medium">{formatLargeNumber(asset.marketCap)}</p>
//                   )}
//                 </div>

//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">24h Volume</p>
//                   {loading ? (
//                     <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
//                   ) : (
//                     <p className="font-medium">{formatLargeNumber(asset.volume)}</p>
//                   )}
//                 </div>

//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">Circulating Supply</p>
//                   {loading ? (
//                     <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
//                   ) : (
//                     <p className="font-medium">
//                       {asset.circulatingSupply?.toLocaleString()} {asset.symbol}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">Max Supply</p>
//                   {loading ? (
//                     <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
//                   ) : (
//                     <p className="font-medium">{asset.maxSupply ? asset.maxSupply.toLocaleString() : "∞"}</p>
//                   )}
//                 </div>
//               </div>

//               <div className="border-t pt-4">
//                 <h3 className="text-sm font-medium mb-2">All Time High</h3>
//                 {loading ? (
//                   <div className="space-y-2">
//                     <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
//                     <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
//                   </div>
//                 ) : (
//                   <>
//                     <p className="text-lg font-bold">{formatPrice(additionalInfo?.marketData?.allTimeHigh)}</p>
//                     <p className="text-sm text-gray-500">
//                       {additionalInfo?.marketData?.allTimeHighDate
//                          formatDate(additionalInfo.marketData.allTimeHighDate)
//                         : "Date not available"}
//                     </p>
//                   </>
//                 )}
//               </div>

//               <div className="border-t pt-4">
//                 <h3 className="text-sm font-medium mb-2">All Time Low</h3>
//                 {loading ? (
//                   <div className="space-y-2">
//                     <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
//                     <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
//                   </div>
//                 ) : (
//                   <>
//                     <p className="text-lg font-bold">{formatPrice(additionalInfo?.marketData?.allTimeLow)}</p>
//                     <p className="text-sm text-gray-500">
//                       {additionalInfo?.marketData?.allTimeLowDate
//                         formatDate(additionalInfo.marketData.allTimeLowDate)
//                         : "Date not available"}
//                     </p>
//                   </>
//                 )}
//               </div>

//               <div className="border-t pt-4">
//                 <h3 className="text-sm font-medium mb-2">Market Cap Rank</h3>
//                 {loading ? (
//                   <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
//                 ) : (
//                   <p className="font-bold">#{additionalInfo?.marketData?.marketCapRank || "N/A"}</p>
//                 )}
//               </div>

//               <div className="border-t pt-4">
//                 <h3 className="text-sm font-medium mb-2">Fully Diluted Valuation</h3>
//                 {loading ? (
//                   <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
//                 ) : (
//                   <p className="font-bold">{formatLargeNumber(additionalInfo?.marketData?.fullyDilutedValuation)}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AssetDetail


// src/components/AssetDetail.jsx
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {
  selectAssetById,
  toggleFavorite,
  selectIsFavorite,
  updateAssetDetails,
} from "../features/assets/assetsSlice"
import DetailChart from "./DetailChart"

const AssetDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const asset = useSelector((state) => selectAssetById(state, id))
  const isFavorite = useSelector((state) => selectIsFavorite(state, id))

  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState("24h")
  const [additionalInfo, setAdditionalInfo] = useState(null)

  useEffect(() => {
    if (!asset) return

    const fetchAssetDetails = async () => {
      try {
        setLoading(true)
        // simulate network/API
        await new Promise((res) => setTimeout(res, 800))

        const price = asset.price
        const mockAdditionalInfo = {
          description: `${asset.name} is a decentralized cryptocurrency that aims to revolutionize the financial industry through blockchain technology.`,
          website: "https://example.com",
          twitter: "https://twitter.com/example",
          github: "https://github.com/example",
          reddit: "https://reddit.com/r/example",
          marketData: {
            allTimeHigh: price * 1.5,
            allTimeHighDate: "2021-11-10",
            allTimeLow: price * 0.2,
            allTimeLowDate: "2020-03-13",
            marketCapRank: Math.floor(Math.random() * 20) + 1,
            totalSupply: asset.maxSupply || asset.circulatingSupply * 1.2,
            fullyDilutedValuation:
              (asset.maxSupply || asset.circulatingSupply * 1.2) * price,
          },
          priceHistory: {
            "24h": generatePriceHistory(24, price, "hour"),
            "7d": generatePriceHistory(7, price, "day"),
            "30d": generatePriceHistory(30, price, "day"),
            "90d": generatePriceHistory(90, price, "day"),
            "1y": generatePriceHistory(365, price, "day"),
          },
        }

        setAdditionalInfo(mockAdditionalInfo)

        // persist lightweight details to Redux
        dispatch(
          updateAssetDetails({
            id,
            details: {
              description: mockAdditionalInfo.description,
              website: mockAdditionalInfo.website,
              twitter: mockAdditionalInfo.twitter,
              github: mockAdditionalInfo.github,
            },
          })
        )

        setLoading(false)
      } catch (err) {
        console.error("Error fetching details:", err)
        setLoading(false)
      }
    }

    fetchAssetDetails()
  }, [asset, dispatch, id])

  // Generate mock history: hours for 24h, days for others
  function generatePriceHistory(count, currentPrice, unit = "hour") {
    const data = []
    const now = new Date()
    for (let i = count; i >= 0; i--) {
      const date = new Date(now)
      if (unit === "hour") date.setHours(now.getHours() - i)
      else if (unit === "day") date.setDate(now.getDate() - i)
      // random ±20%
      const factor = 0.8 + Math.random() * 0.4
      data.push({ timestamp: date.toISOString(), price: currentPrice * factor })
    }
    return data
  }

  // Formatting helpers
  const formatPrice = (p) => {
    if (p >= 1000)
      return `$${p.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    if (p >= 1)
      return `$${p.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
      })}`
    return `$${p.toLocaleString(undefined, {
      minimumFractionDigits: 4,
      maximumFractionDigits: 8,
    })}`
  }

  const formatPercentage = (num) =>
    `${num > 0 ? "+" : ""}${num.toFixed(2)}%`

  const formatDate = (s) =>
    new Date(s).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })

  const formatLargeNumber = (n) => {
    if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`
    if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`
    if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`
    return `$${n.toLocaleString()}`
  }

  if (!asset) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Asset not found
          </h2>
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md inline-flex items-center"
          >
            ← Back to Overview
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <div className="mb-6">
        <Link
          to="/"
          className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-md inline-flex items-center"
        >
          ← Back to Overview
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left: Chart & About */}
        <div className="md:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <img
                  src={asset.logo || "/placeholder.svg"}
                  alt={asset.name}
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {asset.name}
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400">
                    {asset.symbol}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className={`p-2 rounded-full ${
                    isFavorite ? "text-yellow-400" : "text-gray-400"
                  }`}
                  onClick={() => dispatch(toggleFavorite(asset.id))}
                >
                  {isFavorite ? "★" : "☆"}
                </button>
                {additionalInfo?.website && (
                  <a
                    href={additionalInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    🌐
                  </a>
                )}
                {additionalInfo?.twitter && (
                  <a
                    href={additionalInfo.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    🐦
                  </a>
                )}
                {additionalInfo?.github && (
                  <a
                    href={additionalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    🐙
                  </a>
                )}
              </div>
            </div>

            {/* Price & 24h change */}
            <div className="mb-6">
              <div className="flex items-baseline">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mr-3">
                  {formatPrice(asset.price)}
                </h2>
                <span
                  className={`text-lg font-semibold ${
                    asset.twentyFourHourChange >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {formatPercentage(asset.twentyFourHourChange)} (24h)
                </span>
              </div>
            </div>

            {/* Timeframe tabs */}
            <div className="mb-4">
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                {["24h", "7d", "30d", "90d", "1y"].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`py-2 px-4 ${
                      timeframe === tf
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart area */}
            <div className="h-80">
              {loading || !additionalInfo ? (
                <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 animate-pulse">
                  <p className="text-gray-500 dark:text-gray-400">
                    Loading chart data...
                  </p>
                </div>
              ) : (
                <DetailChart
                  data={additionalInfo.priceHistory[timeframe]}
                  timeframe={timeframe}
                />
              )}
            </div>
          </div>

          {/* About section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              About {asset.name}
            </h2>
            {loading ? (
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-300">
                {additionalInfo.description ||
                  "No description available."}
              </p>
            )}
          </div>
        </div>

        {/* Right: Market Stats */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Market Stats
            </h3>

            {/* Grid of stats */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Market Cap
                </p>
                {loading ? (
                  <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                ) : (
                  <p className="font-medium">
                    {formatLargeNumber(asset.marketCap)}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  24h Volume
                </p>
                {loading ? (
                  <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                ) : (
                  <p className="font-medium">
                    {formatLargeNumber(asset.volume)}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Circulating Supply
                </p>
                {loading ? (
                  <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                ) : (
                  <p className="font-medium">
                    {asset.circulatingSupply.toLocaleString()} {asset.symbol}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Max Supply
                </p>
                {loading ? (
                  <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                ) : (
                  <p className="font-medium">
                    {asset.maxSupply
                      ? asset.maxSupply.toLocaleString()
                      : "∞"}
                  </p>
                )}
              </div>
            </div>

            {/* All Time High */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-400">
                All Time High
              </h4>
              {loading ? (
                <div className="space-y-2">
                  <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              ) : (
                <>
                  <p className="text-lg font-bold text-gray-800 dark:text-white">
                    {formatPrice(additionalInfo.marketData.allTimeHigh)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(additionalInfo.marketData.allTimeHighDate)}
                  </p>
                </>
              )}
            </div>

            {/* All Time Low */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-400">
                All Time Low
              </h4>
              {loading ? (
                <div className="space-y-2">
                  <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              ) : (
                <>
                  <p className="text-lg font-bold text-gray-800 dark:text-white">
                    {formatPrice(additionalInfo.marketData.allTimeLow)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(additionalInfo.marketData.allTimeLowDate)}
                  </p>
                </>
              )}
            </div>

            {/* Market Cap Rank */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-400">
                Market Cap Rank
              </h4>
              {loading ? (
                <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              ) : (
                <p className="font-bold text-gray-800 dark:text-white">
                  #{additionalInfo.marketData.marketCapRank}
                </p>
              )}
            </div>

            {/* Fully Diluted Valuation */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-400">
                Fully Diluted Valuation
              </h4>
              {loading ? (
                <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              ) : (
                <p className="font-bold text-gray-800 dark:text-white">
                  {formatLargeNumber(
                    additionalInfo.marketData.fullyDilutedValuation
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssetDetail