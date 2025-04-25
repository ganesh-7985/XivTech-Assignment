import { createSlice } from "@reduxjs/toolkit"
import { initialAssets } from "../../data/initialAssets"

const assetsSlice = createSlice({
  name: "assets",
  initialState: {
    assets: initialAssets,
    status: "idle",
    error: null,
    filters: {
      priceRange: [0, 100000],
      categories: [],
      showOnlyFavorites: false,
      searchQuery: "",
    },
    sorting: {
      field: "marketCap",
      direction: "desc",
    },
    favorites: [],
  },
  reducers: {
    updateAssetPrice: (state, action) => {
      const { id, newPrice, oldPrice } = action.payload
      const asset = state.assets.find((asset) => asset.id === id)
      if (asset) {
        asset.priceChangeDirection = newPrice > oldPrice ? "up" : newPrice < oldPrice ? "down" : ""
        asset.price = newPrice
      }
    },
    updateAssetPercentages: (state, action) => {
      const { id, oneHourChange, twentyFourHourChange, sevenDayChange } = action.payload
      const asset = state.assets.find((asset) => asset.id === id)
      if (asset) {
        asset.oneHourChange = oneHourChange
        asset.twentyFourHourChange = twentyFourHourChange
        asset.sevenDayChange = sevenDayChange
      }
    },
    updateAssetVolume: (state, action) => {
      const { id, volume } = action.payload
      const asset = state.assets.find((asset) => asset.id === id)
      if (asset) {
        asset.volume = volume
      }
    },
    updateSparklineData: (state, action) => {
      const { id, sparklineData } = action.payload
      const asset = state.assets.find((asset) => asset.id === id)
      if (asset) {
        asset.sparklineData = sparklineData
      }
    },
    addNewAsset: (state, action) => {
      const newAsset = action.payload
      if (!state.assets.find((asset) => asset.id === newAsset.id)) {
        state.assets.push(newAsset)
      }
    },
    setPriceRangeFilter: (state, action) => {
      state.filters.priceRange = action.payload
    },
    setCategoriesFilter: (state, action) => {
      state.filters.categories = action.payload
    },
    toggleFavoriteFilter: (state) => {
      state.filters.showOnlyFavorites = !state.filters.showOnlyFavorites
    },
    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload
    },
    setSorting: (state, action) => {
      state.sorting = action.payload
    },
    toggleFavorite: (state, action) => {
      const assetId = action.payload
      const index = state.favorites.indexOf(assetId)
      if (index === -1) {
        state.favorites.push(assetId)
      } else {
        state.favorites.splice(index, 1)
      }
    },
    updateAssetDetails: (state, action) => {
      const { id, details } = action.payload
      const asset = state.assets.find((asset) => asset.id === id)
      if (asset) {
        asset.details = { ...asset.details, ...details }
      }
    },
  },
})

export const {
  updateAssetPrice,
  updateAssetPercentages,
  updateAssetVolume,
  updateSparklineData,
  addNewAsset,
  setPriceRangeFilter,
  setCategoriesFilter,
  toggleFavoriteFilter,
  setSearchQuery,
  setSorting,
  toggleFavorite,
  updateAssetDetails,
} = assetsSlice.actions

// Selectors
export const selectAllAssets = (state) => {
  const { assets, filters, sorting, favorites } = state.assets

  // Check if assets exists and is an array before proceeding
  if (!assets || !Array.isArray(assets)) {
    return []
  }

  // Apply filters
  let filteredAssets = [...assets]

  // Price range filter
  filteredAssets = filteredAssets.filter(
    (asset) => asset.price >= filters.priceRange[0] && asset.price <= filters.priceRange[1],
  )

  // Categories filter
  if (filters.categories.length > 0) {
    filteredAssets = filteredAssets.filter((asset) => asset.category && filters.categories.includes(asset.category))
  }

  // Favorites filter
  if (filters.showOnlyFavorites) {
    filteredAssets = filteredAssets.filter((asset) => favorites.includes(asset.id))
  }

  // Search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase()
    filteredAssets = filteredAssets.filter(
      (asset) => asset.name.toLowerCase().includes(query) || asset.symbol.toLowerCase().includes(query),
    )
  }

  // Apply sorting
  filteredAssets.sort((a, b) => {
    let valueA = a[sorting.field]
    let valueB = b[sorting.field]

    // Handle string values
    if (typeof valueA === "string") {
      valueA = valueA.toLowerCase()
      valueB = valueB.toLowerCase()
    }

    if (sorting.direction === "asc") {
      return valueA > valueB ? 1 : -1
    } else {
      return valueA < valueB ? 1 : -1
    }
  })

  return filteredAssets
}

export const selectAssetById = (state, assetId) => state.assets.assets.find((asset) => asset.id === assetId)
export const selectFilters = (state) => state.assets.filters
export const selectSorting = (state) => state.assets.sorting
export const selectIsFavorite = (state, assetId) => state.assets.favorites.includes(assetId)

export default assetsSlice.reducer
