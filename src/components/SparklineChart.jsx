const SparklineChart = ({ data, change }) => {
  // Calculate min and max values for scaling
  const minValue = Math.min(...data)
  const maxValue = Math.max(...data)
  const range = maxValue - minValue

  // Prevent division by zero
  const normalizedRange = range === 0 ? 1 : range

  // Create SVG path
  const createPath = () => {
    const height = 30
    const width = 100

    return data
      .map((value, index) => {
        // Normalize the value to fit in our SVG
        const x = (index / (data.length - 1)) * width
        const y = height - ((value - minValue) / normalizedRange) * height

        return `${index === 0 ? "M" : "L"} ${x} ${y}`
      })
      .join(" ")
  }

  return (
    <div className="inline-block">
      <svg width="100" height="30" viewBox="0 0 100 30">
        <path d={createPath()} className={`sparkline ${change >= 0 ? "sparkline-positive" : "sparkline-negative"}`} />
      </svg>
    </div>
  )
}

export default SparklineChart
