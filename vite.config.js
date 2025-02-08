import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows access from external devices
    port: 5173, // Default port (change if needed)
    strictPort: true, // Ensures the server uses the specified port
    allowedHosts: ['.ngrok-free.app'], // Allow ngrok subdomains
  },
})
