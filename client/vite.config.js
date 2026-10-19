import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/trips": {
        target: "http://localhost:3001",
        changeOrigin: true
      },
      "/destinations": {
        target: "http://localhost:3001",
        changeOrigin: true
      },
      "/activities": {
        target: "http://localhost:3001",
        changeOrigin: true
      },
      "/trips_destinations": {
        target: "http://localhost:3001",
        changeOrigin: true
      }
    }
  }
});
