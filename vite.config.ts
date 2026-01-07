import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/tantsaha-connect/',
  plugins: [
    tailwindcss(), 
    react(),
    VitePWA({
      base: '/tantsaha-connect/',
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'Logo.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'Tantsaha Connect',
        short_name: 'Tantsaha',
        description: 'Application pour les agriculteurs malagasy',
        theme_color: '#58cc02',
        background_color: '#000000',
        display: 'standalone',
        start_url: '/tantsaha-connect/',
        scope: '/tantsaha-connect/',
        icons: [
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' 
          },
          {
            src: 'logo.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2,ttf}']
      }
    })
  ]
});