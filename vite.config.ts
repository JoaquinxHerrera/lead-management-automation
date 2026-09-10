import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    proxy: {
      "/n8n": {
        target: "https://lead-management-automation.vercel.app/",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/n8n/, ""),
      },
    },
  },
})