import { ref, onMounted, onUnmounted } from 'vue'
import { useTaskStore } from '../stores/tasks'

/**
 * Composable for polling task updates
 * @param intervalMs - Polling interval in milliseconds (default: 5000)
 * @param autoStart - Whether to start polling automatically on mount (default: true)
 */
export function useTaskPolling(intervalMs = 5000, autoStart = true) {
  const taskStore = useTaskStore()
  const isPolling = ref(false)
  let intervalId: number | null = null
  let consecutiveErrors = 0
  const MAX_CONSECUTIVE_ERRORS = 3
  
  async function poll() {
    try {
      await taskStore.fetchTasks()
      // Reset error counter on success
      consecutiveErrors = 0
    } catch (e) {
      consecutiveErrors++
      console.error(`[TaskPolling] Error fetching tasks (${consecutiveErrors}/${MAX_CONSECUTIVE_ERRORS})`, e)
      
      // Stop polling after too many consecutive errors
      if (consecutiveErrors >= MAX_CONSECUTIVE_ERRORS) {
        console.error('[TaskPolling] Too many consecutive errors, stopping polling')
        stopPolling()
      }
    }
  }
  
  function startPolling() {
    if (isPolling.value) return
    
    isPolling.value = true
    consecutiveErrors = 0 // Reset error counter when starting
    
    // Fetch immediately on start
    poll()
    
    // Set up interval for subsequent fetches
    intervalId = window.setInterval(() => {
      poll()
    }, intervalMs)
  }
  
  function stopPolling() {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
    isPolling.value = false
  }
  
  if (autoStart) {
    onMounted(() => {
      startPolling()
    })
  }
  
  onUnmounted(() => {
    stopPolling()
  })
  
  return {
    isPolling,
    startPolling,
    stopPolling
  }
}
