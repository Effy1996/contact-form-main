import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.', // Ensure Vite knows where the project root is
  build: {
    outDir: 'dist', // Ensure the build output goes to the correct folder
  },
})
