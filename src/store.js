import { configureStore } from "@reduxjs/toolkit"
import assetsReducer from "./features/assets/assetsSlice"
import {
  loadFavorites,
  saveFavorites,
  loadFilters,
  saveFilters,
  loadSorting,
  saveSorting,
} from "./services/localStorageService"

// Create a middleware to sync state with localStorage
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action)
  const state = store.getState()

  // Save favorites when they change
  if (action.type === "assets/toggleFavorite") {
    saveFavorites(state.assets.favorites)
  }

  // Save filters when they change
  if (
    action.type === "assets/setPriceRangeFilter" ||
    action.type === "assets/setCategoriesFilter" ||
    action.type === "assets/toggleFavoriteFilter" ||
    action.type === "assets/setSearchQuery"
  ) {
    saveFilters(state.assets.filters)
  }

  // Save sorting when it changes
  if (action.type === "assets/setSorting") {
    saveSorting(state.assets.sorting)
  }

  return result
}

// Create a logging middleware for debugging
const loggingMiddleware = (store) => (next) => (action) => {
  // Log actions related to asset updates
  if (
    action.type === "assets/updateAssetPrice" ||
    action.type === "assets/updateAssetPercentages" ||
    action.type === "assets/updateAssetVolume" ||
    action.type === "assets/updateSparklineData" ||
    action.type === "assets/addNewAsset"
  ) {
    console.log(`Action: ${action.type}`, action.payload)
  }

  return next(action)
}

// Load initial state from localStorage
const preloadedState = {
  assets: {
    assets: [], // Start with empty array, will be populated from API
    favorites: loadFavorites(),
    filters: loadFilters() || {
      priceRange: [0, 100000],
      categories: [],
      showOnlyFavorites: false,
      searchQuery: "",
    },
    sorting: loadSorting() || {
      field: "marketCap",
      direction: "desc",
    },
  },
}

export const store = configureStore({
  reducer: {
    assets: assetsReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware).concat(loggingMiddleware),
})
