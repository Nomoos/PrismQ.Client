import { ref, computed } from 'vue'

// Navigation hierarchy: PrismQ.IdeaInspiration → PrismQ → PrismQ.Idea
export type NavigationLevel = 'PrismQ.IdeaInspiration' | 'PrismQ' | 'PrismQ.Idea'

const STORAGE_KEY = 'prismq_navigation_position'

// Persistent state
const currentPosition = ref<NavigationLevel>(loadPosition())

function loadPosition(): NavigationLevel {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && isValidLevel(saved)) {
    return saved as NavigationLevel
  }
  return 'PrismQ.IdeaInspiration' // Default starting position
}

function isValidLevel(level: string): boolean {
  return ['PrismQ.IdeaInspiration', 'PrismQ', 'PrismQ.Idea'].includes(level)
}

function savePosition(level: NavigationLevel) {
  localStorage.setItem(STORAGE_KEY, level)
  currentPosition.value = level
}

export function useNavigation() {
  const levels: NavigationLevel[] = [
    'PrismQ.IdeaInspiration',
    'PrismQ',
    'PrismQ.Idea'
  ]
  
  const currentIndex = computed(() => {
    return levels.indexOf(currentPosition.value)
  })
  
  const canGoBack = computed(() => currentIndex.value > 0)
  const canGoForward = computed(() => currentIndex.value < levels.length - 1)
  
  const breadcrumbs = computed(() => {
    return levels.slice(0, currentIndex.value + 1).map((level, index) => ({
      level,
      label: level,
      isActive: index === currentIndex.value
    }))
  })
  
  function navigateTo(level: NavigationLevel) {
    if (isValidLevel(level)) {
      savePosition(level)
    }
  }
  
  function goBack() {
    if (canGoBack.value) {
      const newPosition = levels[currentIndex.value - 1]
      savePosition(newPosition)
    }
  }
  
  function goForward() {
    if (canGoForward.value) {
      const newPosition = levels[currentIndex.value + 1]
      savePosition(newPosition)
    }
  }
  
  function reset() {
    savePosition('PrismQ.IdeaInspiration')
  }
  
  return {
    currentPosition: computed(() => currentPosition.value),
    currentIndex,
    levels,
    canGoBack,
    canGoForward,
    breadcrumbs,
    navigateTo,
    goBack,
    goForward,
    reset
  }
}
