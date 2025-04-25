// services/binanceWebSocket.js
import {
  updateAssetPrice,
  updateAssetPercentages,
  updateAssetVolume,
  updateSparklineData,
  addNewAsset,
} from "../features/assets/assetsSlice"

// Map Binance symbols to your Redux asset IDs
const symbolMap = {
  BTCUSDT: "bitcoin",
  ETHUSDT: "ethereum",
  BNBUSDT: "binancecoin",
  ADAUSDT: "cardano",
  SOLUSDT: "solana",
  DOGEUSDT: "dogecoin",
  // …add more here if you like
}

let websocket = null
let reconnectTimeout = null
const RECONNECT_DELAY = 5000

export function startWebSocket(dispatch, getState) {
  // 1) close old
  if (websocket) websocket.close()
  if (reconnectTimeout) clearTimeout(reconnectTimeout)

  // 2) build multi-stream URL
  const streams = Object.keys(symbolMap)
    .map((sym) => `${sym.toLowerCase()}@ticker`)
    .join("/")
  const wsUrl = `wss://stream.binance.com:9443/stream?streams=${streams}`

  console.log("Connecting to Binance WS:", wsUrl)
  websocket = new WebSocket(wsUrl)

  websocket.onopen = () => console.log("✅ Binance WS opened")
  websocket.onerror = (err) => {
    console.error("❌ Binance WS error", err)
    websocket.close()
  }
  websocket.onclose = (ev) => {
    console.warn("⚠️ Binance WS closed, retry in", RECONNECT_DELAY)
    reconnectTimeout = setTimeout(() => startWebSocket(dispatch, getState), RECONNECT_DELAY)
  }

  websocket.onmessage = ({ data: raw }) => {
    try {
      // Combined‐stream payload: { stream, data }
      const { data: d } = JSON.parse(raw)
      const sym = d.s        // e.g. "BTCUSDT"
      const id  = symbolMap[sym]
      if (!id) return

      const state = getState()
      const asset = state.assets.assets.find((a) => a.id === id)
      if (!asset) return

      // parse floats
      const oldPrice = asset.price
      const newPrice = parseFloat(d.c)    // current price
      const perc24  = parseFloat(d.P)     // 24h %

      // 1) price & flash
      dispatch(updateAssetPrice({ id, oldPrice, newPrice }))

      // 2) percentages
      dispatch(
        updateAssetPercentages({
          id,
          // if you don't have a real 1h, just duplicate 24h:
          oneHourChange: perc24,
          twentyFourHourChange: perc24,
          sevenDayChange: asset.sevenDayChange,
        })
      )

      // 3) volume in quote currency
      dispatch(
        updateAssetVolume({
          id,
          volume: parseFloat(d.v) * newPrice,
        })
      )

      // 4) sparkline
      dispatch(
        updateSparklineData({
          id,
          sparklineData: [...asset.sparklineData.slice(1), newPrice],
        })
      )
    } catch (err) {
      console.error("🛑 WS message parse error:", err)
    }
  }
}

export function stopWebSocket() {
  if (websocket) websocket.close()
  if (reconnectTimeout) clearTimeout(reconnectTimeout)
}