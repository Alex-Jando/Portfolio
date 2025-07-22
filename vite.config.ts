import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    allowedHosts: ['localhost', 'jando.live', 'www.jando.live'],
  }
})
