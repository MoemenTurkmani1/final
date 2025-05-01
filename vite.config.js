import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    hmr: {
      overlay: false // Disables the error overlay
    }
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss() // Using Tailwind as ES module
      ]
    }
  }
})