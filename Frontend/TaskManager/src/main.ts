import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { initPerformanceMonitoring } from './utils/performance'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// Initialize performance monitoring
initPerformanceMonitoring()
