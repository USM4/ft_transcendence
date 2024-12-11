import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,  // Disable source maps for production builds
  },
  server: {
    host: '0.0.0.0',  // Make the app accessible from outside the container
    port: 5173,       // You can specify the port your app runs on
  },
})