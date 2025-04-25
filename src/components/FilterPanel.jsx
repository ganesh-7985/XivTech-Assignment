import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  setPriceRangeFilter,
  setCategoriesFilter,
  toggleFavoriteFilter,
  setSorting,
  selectFilters,
  selectSorting,
} from "../features/assets/assetsSlice"

const FilterPanel = () => {
  const dispatch = useDispatch()
  const filters = useSelector(selectFilters)
  const sorting = useSelector(selectSorting)

  // Local state for price range slider
  const [priceRange, setPriceRange] = useState(filters.priceRange)
  const [minPrice, setMinPrice] = useState(filters.priceRange[0])
  const [maxPrice, setMaxPrice] = useState(filters.priceRange[1])

  // Update price range filter when inputs change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setPriceRangeFilter([minPrice, maxPrice]))
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [minPrice, maxPrice, dispatch])

  // Categories
  const categories = [
    { id: "currency", label: "Currency" },
    { id: "platform", label: "Platform" },
    { id: "defi", label: "DeFi" },
    { id: "stablecoin", label: "Stablecoin" },
    { id: "nft", label: "NFT" },
    { id: "exchange", label: "Exchange" },
  ]

  // Handle category checkbox change
  const handleCategoryChange = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]

    dispatch(setCategoriesFilter(newCategories))
  }

  // Handle sorting change
  const handleSortingChange = (e) => {
    const [field, direction] = e.target.value.split("-")
    dispatch(setSorting({ field, direction }))
  }

  // Format price for display
  const formatPrice = (price) => {
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(1)}K`
    }
    return `$${price}`
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Filters</h3>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Price Range</h4>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
          <span className="text-gray-500">to</span>
          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Sort By</h4>
        <select
          value={`${sorting.field}-${sorting.direction}`}
          onChange={handleSortingChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          <option value="marketCap-desc">Market Cap (High to Low)</option>
          <option value="marketCap-asc">Market Cap (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="twentyFourHourChange-desc">24h Change (Highest)</option>
          <option value="twentyFourHourChange-asc">24h Change (Lowest)</option>
        </select>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category.id}`}
                checked={filters.categories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
                className="mr-2"
              />
              <label htmlFor={`category-${category.id}`} className="text-gray-700 dark:text-gray-300">
                {category.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Favorites */}
      <div>
        <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Favorites</h4>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="favorites-only"
            checked={filters.showOnlyFavorites}
            onChange={() => dispatch(toggleFavoriteFilter())}
            className="mr-2"
          />
          <label htmlFor="favorites-only" className="text-gray-700 dark:text-gray-300 flex items-center gap-1">
            Show only favorites <span className="text-yellow-400">★</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default FilterPanel
