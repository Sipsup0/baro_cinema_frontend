import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    proxy: {
      '/user': {
        target: 'https://nodejs211.dszcbaross.edu.hu',
        changeOrigin: true
      },
      '/movies': {
        target: 'https://nodejs211.dszcbaross.edu.hu',
        changeOrigin: true
      },
      '/api/uploads': {
        target: 'https://nodejs211.dszcbaross.edu.hu',
        changeOrigin: true
      },
      '/seats':{
        target: 'https://nodejs211.dszcbaross.edu.hu',
        changeOrigin: true
      },
      '/uploads': {
        target: 'https://nodejs211.dszcbaross.edu.hu',
        changeOrigin: true
      }
    },
  },
})