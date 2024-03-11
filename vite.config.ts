import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy(),
    VitePWA({
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.png'],
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Drink It!',
        short_name: 'DrinkIt',
        description: 'Nunca mais se esqueça de beber água, atinja sua meta diária com Drink It!',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa_icon_192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa_icon_512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            "src": "mask-icon.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
