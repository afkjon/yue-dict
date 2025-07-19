<script setup>
import { ref } from 'vue'
import dictionaryData from './dictionary.json'

useHead({
  title: 'Cantonese Dictionary - Learn Cantonese Words & Phrases',
  meta: [
    { name: 'description', content: 'Search and learn Cantonese words, phrases, and their meanings. A comprehensive Cantonese dictionary built with Nuxt 3.' }
  ]
})

// Search functionality
const searchQuery = ref('')
const searchResults = ref([])
const isSearching = ref(false)

const searchDictionary = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    return
  }

  // Check if search query is alphanumeric to determine if we should search
  if (searchQuery.value.length == 1 
    && searchQuery.value.toLowerCase().charCodeAt(0) > 96 
    && searchQuery.value.toLowerCase().charCodeAt(0) < 123) {
    searchResults.value = []
    return
  }

  if (searchQuery.value.length == 2) {
    var firstChar = searchQuery.value.toLowerCase().charCodeAt(0) 
    var secondChar = searchQuery.value.toLowerCase().charCodeAt(1) 
    
    if ((firstChar > 96 && firstChar < 123) 
      && (secondChar > 96 && secondChar < 123)) { 
      searchResults.value = []
      return
    }
  }

  isSearching.value = true
  
  const query = searchQuery.value.toLowerCase().trim()
  searchResults.value = Object.values(dictionaryData).filter(entry => 
    entry.traditional?.includes(query) ||
    entry.simplified?.includes(query) ||
    entry.pingyin?.toLowerCase().includes(query) ||
    entry.jyutping?.toLowerCase().includes(query) ||
    entry.definitions?.toLowerCase().includes(query)
  )
  
  isSearching.value = false
}

const clearSearch = () => {
  searchQuery.value = ''
  searchResults.value = []
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
    <!-- Header -->
    <header class="container mx-auto px-6 py-8">
      <nav class="flex justify-between items-center">
        <div class="text-2xl font-bold text-gray-800">粵語字典</div>
      </nav>
    </header>

    <!-- Hero Section with Search -->
    <main class="container mx-auto px-6 py-16 text-center min-h-screen">
      <h1 class="text-5xl font-bold text-gray-800 mb-6">
        Cantonese Dictionary
      </h1>
      <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Discover the beauty of Cantonese language. Search for words, phrases, and their meanings.
      </p>
      
      <!-- Search Box -->
      <div id="search" class="max-w-2xl mx-auto mb-8">
        <div class="relative">
          <input
            v-model="searchQuery"
            @input="searchDictionary"
            type="text"
            placeholder="Search in Cantonese, Simplified, Pingyin, Jyutping, or Definitions..."
            class="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:border-red-500 focus:outline-none shadow-lg"
          />
          <button
            v-if="searchQuery"
            @click="clearSearch"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- Search Results -->
      <div v-if="isSearching" class="text-center py-8">
        <div class="text-gray-600">Searching...</div>
      </div>

      <div v-else-if="searchResults.length > 0" class="max-w-4xl mx-auto">
        <h3 class="text-2xl font-semibold mb-6 text-gray-800">Search Results</h3>
        <div class="grid gap-4">
          <div
            v-for="result in searchResults"
            :key="result.traditional"
            class="bg-white rounded-lg shadow-md p-6 text-left"
          >
            <div class="flex items-center gap-4 mb-3">
              <span class="text-3xl font-bold text-red-600">{{ result.traditional }}</span>
              <span class="text-3xl text-purple-400">[{{ result.simplified }}]</span>
            </div>
            <div class="flex items-center gap-4 mb-3">
              <span class="text-lg font-semibold text-gray-800">{{ result.jyutping }}</span>
              <span class="text-lg text-gray-600"><em>{{ result.pingyin }}</em></span>
            </div>
            <div class="text-lg font-semibold text-gray-800 mb-2">{{ result.definitions.split('/').join(', ') }}</div>
          </div>
        </div>
      </div>

      <div v-else-if="searchQuery && !isSearching" class="text-center py-8">
        <div class="text-gray-600">No results found for "{{ searchQuery }}"</div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8 mt-auto"> 
      <div class="container mx-auto px-6 text-center">
        <p>&copy; 2025 Cantonese Dictionary. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Add any custom styles here if needed */
</style>
