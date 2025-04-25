// Local storage keys
const FAVORITES_KEY = "crypto_tracker_favorites"
const FILTERS_KEY = "crypto_tracker_filters"
const SORTING_KEY = "crypto_tracker_sorting"

// Load favorites from localStorage
export const loadFavorites = () => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY)
    return favorites ? JSON.parse(favorites) : []
  } catch (error) {
    console.error("Error loading favorites from localStorage:", error)
    return []
  }
}

// Save favorites to localStorage
export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  } catch (error) {
    console.error("Error saving favorites to localStorage:", error)
  }
}

// Load filters from localStorage
export const loadFilters = () => {
  try {
    const filters = localStorage.getItem(FILTERS_KEY)
    return filters ? JSON.parse(filters) : null
  } catch (error) {
    console.error("Error loading filters from localStorage:", error)
    return null
  }
}

// Save filters to localStorage
export const saveFilters = (filters) => {
  try {
    localStorage.setItem(FILTERS_KEY, JSON.stringify(filters))
  } catch (error) {
    console.error("Error saving filters to localStorage:", error)
  }
}

// Load sorting from localStorage
export const loadSorting = () => {
  try {
    const sorting = localStorage.getItem(SORTING_KEY)
    return sorting ? JSON.parse(sorting) : null
  } catch (error) {
    console.error("Error loading sorting from localStorage:", error)
    return null
  }
}

// Save sorting to localStorage
export const saveSorting = (sorting) => {
  try {
    localStorage.setItem(SORTING_KEY, JSON.stringify(sorting))
  } catch (error) {
    console.error("Error saving sorting to localStorage:", error)
  }
}
