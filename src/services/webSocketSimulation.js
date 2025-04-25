import {
  updateAssetPrice,
  updateAssetPercentages,
  updateAssetVolume,
  updateSparklineData,
} from "../features/assets/assetsSlice"

let intervalId = null

// Helper function to generate random number within a range
const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min
}

// Helper function to generate random percentage change
const getRandomPercentageChange = (baseValue, maxChange) => {
  return baseValue + getRandomNumber(-maxChange, maxChange)
}

// Helper function to update sparkline data
const updateSparkline = (currentData, newPrice) => {
  const newData = [...currentData.slice(1), newPrice]
  return newData
}

export const startWebSocketSimulation = (dispatch) => {
  if (intervalId) {
    clearInterval(intervalId)
  }

  console.log("WebSocket simulation started")

  // Update all assets immediately on start
  setTimeout(() => {
    updateAllAssets(dispatch)
  }, 500)

  // Then set up interval for regular updates
  intervalId = setInterval(() => {
    // Update a random asset
    updateRandomAsset(dispatch)
  }, 2000) // Update every 2 seconds
}

// Function to update all assets at once
const updateAllAssets = (dispatch) => {
  // Import the assets directly to avoid circular dependencies
  const { initialAssets } = require("../data/initialAssets")

  initialAssets.forEach((asset) => {
    // Update price (random fluctuation within 5%)
    const oldPrice = asset.price
    const priceChangePercent = getRandomNumber(-0.05, 0.05)
    const newPrice = oldPrice * (1 + priceChangePercent)

    dispatch(
      updateAssetPrice({
        id: asset.id,
        oldPrice,
        newPrice: Number.parseFloat(newPrice.toFixed(2)),
      }),
    )

    // Update sparkline data
    const newSparklineData = updateSparkline(asset.sparklineData, newPrice)
    dispatch(
      updateSparklineData({
        id: asset.id,
        sparklineData: newSparklineData,
      }),
    )

    // Update percentages
    dispatch(
      updateAssetPercentages({
        id: asset.id,
        oneHourChange: getRandomPercentageChange(asset.oneHourChange, 1),
        twentyFourHourChange: getRandomPercentageChange(asset.twentyFourHourChange, 2),
        sevenDayChange: getRandomPercentageChange(asset.sevenDayChange, 0.5),
      }),
    )

    // Update volume
    dispatch(
      updateAssetVolume({
        id: asset.id,
        volume: asset.volume * (1 + getRandomNumber(-0.1, 0.1)),
      }),
    )
  })
}

// Function to update a random asset
const updateRandomAsset = (dispatch) => {
  // Import the assets directly to avoid circular dependencies
  const { initialAssets } = require("../data/initialAssets")

  // Randomly select an asset to update
  const assetIndex = Math.floor(Math.random() * initialAssets.length)
  const asset = initialAssets[assetIndex]

  // Update price (random fluctuation within 2%)
  const oldPrice = asset.price
  const priceChangePercent = getRandomNumber(-0.02, 0.02)
  const newPrice = oldPrice * (1 + priceChangePercent)

  dispatch(
    updateAssetPrice({
      id: asset.id,
      oldPrice,
      newPrice: Number.parseFloat(newPrice.toFixed(2)),
    }),
  )

  // Update sparkline data
  const newSparklineData = updateSparkline(asset.sparklineData, newPrice)
  dispatch(
    updateSparklineData({
      id: asset.id,
      sparklineData: newSparklineData,
    }),
  )

  // Randomly update percentages (1 in 3 chance)
  if (Math.random() < 0.33) {
    dispatch(
      updateAssetPercentages({
        id: asset.id,
        oneHourChange: getRandomPercentageChange(asset.oneHourChange, 0.5),
        twentyFourHourChange: getRandomPercentageChange(asset.twentyFourHourChange, 0.8),
        sevenDayChange: getRandomPercentageChange(asset.sevenDayChange, 0.3),
      }),
    )
  }

  // Randomly update volume (1 in 4 chance)
  if (Math.random() < 0.25) {
    const volumeChange = getRandomNumber(-0.05, 0.05)
    dispatch(
      updateAssetVolume({
        id: asset.id,
        volume: asset.volume * (1 + volumeChange),
      }),
    )
  }
}

export const stopWebSocketSimulation = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
    console.log("WebSocket simulation stopped")
  }
}
