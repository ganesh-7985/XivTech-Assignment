import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

const DetailChart = ({ data, timeframe }) => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (data) {
      // Transform data for the chart
      const formattedData = data.map((item) => ({
        timestamp: new Date(item.timestamp),
        price: item.price,
      }))

      setChartData(formattedData)
    }
  }, [data])

  // Format date based on timeframe
  const formatXAxis = (timestamp) => {
    const date = new Date(timestamp)

    switch (timeframe) {
      case "24h":
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      case "7d":
        return date.toLocaleDateString([], { weekday: "short" })
      case "30d":
        return date.toLocaleDateString([], { day: "numeric", month: "short" })
      case "90d":
      case "1y":
        return date.toLocaleDateString([], { month: "short", day: "numeric" })
      default:
        return date.toLocaleDateString()
    }
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded shadow-lg">
          <p className="text-gray-500 dark:text-gray-400">{new Date(label).toLocaleString()}</p>
          <p className="font-bold text-gray-900 dark:text-white">${payload[0].value.toFixed(2)}</p>
        </div>
      )
    }

    return null
  }

  const calculatePriceChange = () => {
    if (chartData.length < 2) return 0
    const firstPrice = chartData[0].price
    const lastPrice = chartData[chartData.length - 1].price

    return ((lastPrice - firstPrice) / firstPrice) * 100
  }

  const priceChange = calculatePriceChange()
  const chartColor = priceChange >= 0 ? "#10b981" : "#ef4444"

  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="timestamp" tickFormatter={formatXAxis} tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <YAxis
            domain={["auto", "auto"]}
            tickFormatter={(value) => `$${value.toFixed(2)}`}
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="price" stroke={chartColor} strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DetailChart
