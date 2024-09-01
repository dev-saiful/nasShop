import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/uploads':"https://nasshop-server.onrender.com",
      '/api/v1': {
        target: 'https://nasshop-server.onrender.com',
        changeOrigin: true,
      },
    },
  },
})
