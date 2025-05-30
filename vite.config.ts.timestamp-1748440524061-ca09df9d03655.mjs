// vite.config.ts
import react from "file:///C:/Users/Julien%20Fritsch/Documents/GitHub/Collectif%20Feydeau%20--%20app/Collectif-Feydeau---app/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { defineConfig } from "file:///C:/Users/Julien%20Fritsch/Documents/GitHub/Collectif%20Feydeau%20--%20app/Collectif-Feydeau---app/node_modules/vite/dist/node/index.js";
import { componentTagger } from "file:///C:/Users/Julien%20Fritsch/Documents/GitHub/Collectif%20Feydeau%20--%20app/Collectif-Feydeau---app/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\Julien Fritsch\\Documents\\GitHub\\Collectif Feydeau -- app\\Collectif-Feydeau---app";
var vite_config_default = defineConfig(({ mode }) => ({
  // Utiliser une base vide en développement et la base GitHub Pages en production
  // La base URL sera détectée dynamiquement en production
  base: mode === "production" ? "/" : "/",
  // Assurer que les chemins d'assets sont correctement générés
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
    sourcemap: true,
    // Configuration du code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Regrouper React et les dépendances liées dans un chunk
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          // Regrouper les composants UI dans un chunk séparé
          "vendor-ui": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-tabs",
            "@radix-ui/react-select",
            "@radix-ui/react-toast",
            "lucide-react",
            "framer-motion"
          ]
        }
      }
    },
    // Réduire la taille des chunks générés
    chunkSizeWarningLimit: 600
  },
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: false,
    // Désactivation de HTTPS pour éviter les problèmes de certificat
    hmr: {
      clientPort: 8080
    }
  },
  plugins: [
    react(),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxKdWxpZW4gRnJpdHNjaFxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXENvbGxlY3RpZiBGZXlkZWF1IC0tIGFwcFxcXFxDb2xsZWN0aWYtRmV5ZGVhdS0tLWFwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcSnVsaWVuIEZyaXRzY2hcXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFxDb2xsZWN0aWYgRmV5ZGVhdSAtLSBhcHBcXFxcQ29sbGVjdGlmLUZleWRlYXUtLS1hcHBcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0p1bGllbiUyMEZyaXRzY2gvRG9jdW1lbnRzL0dpdEh1Yi9Db2xsZWN0aWYlMjBGZXlkZWF1JTIwLS0lMjBhcHAvQ29sbGVjdGlmLUZleWRlYXUtLS1hcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7ICBcclxuICAvLyBVdGlsaXNlciB1bmUgYmFzZSB2aWRlIGVuIGRcdTAwRTl2ZWxvcHBlbWVudCBldCBsYSBiYXNlIEdpdEh1YiBQYWdlcyBlbiBwcm9kdWN0aW9uXHJcbiAgLy8gTGEgYmFzZSBVUkwgc2VyYSBkXHUwMEU5dGVjdFx1MDBFOWUgZHluYW1pcXVlbWVudCBlbiBwcm9kdWN0aW9uXHJcbiAgYmFzZTogbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nID8gXCIvXCIgOiBcIi9cIixcclxuICAvLyBBc3N1cmVyIHF1ZSBsZXMgY2hlbWlucyBkJ2Fzc2V0cyBzb250IGNvcnJlY3RlbWVudCBnXHUwMEU5blx1MDBFOXJcdTAwRTlzXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcjogJ2Rpc3QnLFxyXG4gICAgYXNzZXRzRGlyOiAnYXNzZXRzJyxcclxuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxyXG4gICAgc291cmNlbWFwOiB0cnVlLFxyXG4gICAgLy8gQ29uZmlndXJhdGlvbiBkdSBjb2RlIHNwbGl0dGluZ1xyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICBtYW51YWxDaHVua3M6IHtcclxuICAgICAgICAgIC8vIFJlZ3JvdXBlciBSZWFjdCBldCBsZXMgZFx1MDBFOXBlbmRhbmNlcyBsaVx1MDBFOWVzIGRhbnMgdW4gY2h1bmtcclxuICAgICAgICAgICd2ZW5kb3ItcmVhY3QnOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC1yb3V0ZXItZG9tJ10sXHJcbiAgICAgICAgICAvLyBSZWdyb3VwZXIgbGVzIGNvbXBvc2FudHMgVUkgZGFucyB1biBjaHVuayBzXHUwMEU5cGFyXHUwMEU5XHJcbiAgICAgICAgICAndmVuZG9yLXVpJzogW1xyXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LWRpYWxvZycsXHJcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtdGFicycsXHJcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3Qtc2VsZWN0JyxcclxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC10b2FzdCcsXHJcbiAgICAgICAgICAgICdsdWNpZGUtcmVhY3QnLFxyXG4gICAgICAgICAgICAnZnJhbWVyLW1vdGlvbicsXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgLy8gUlx1MDBFOWR1aXJlIGxhIHRhaWxsZSBkZXMgY2h1bmtzIGdcdTAwRTluXHUwMEU5clx1MDBFOXNcclxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogNjAwLFxyXG4gIH0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiBcIjAuMC4wLjBcIixcclxuICAgIHBvcnQ6IDgwODAsXHJcbiAgICBzdHJpY3RQb3J0OiBmYWxzZSxcclxuICAgIC8vIERcdTAwRTlzYWN0aXZhdGlvbiBkZSBIVFRQUyBwb3VyIFx1MDBFOXZpdGVyIGxlcyBwcm9ibFx1MDBFOG1lcyBkZSBjZXJ0aWZpY2F0XHJcbiAgICBobXI6IHtcclxuICAgICAgY2xpZW50UG9ydDogODA4MFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgbW9kZSA9PT0gJ2RldmVsb3BtZW50JyAmJlxyXG4gICAgY29tcG9uZW50VGFnZ2VyKCksXHJcbiAgXS5maWx0ZXIoQm9vbGVhbiksXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pKTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtZCxPQUFPLFdBQVc7QUFDcmUsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsdUJBQXVCO0FBSGhDLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUE7QUFBQTtBQUFBLEVBR3pDLE1BQU0sU0FBUyxlQUFlLE1BQU07QUFBQTtBQUFBLEVBRXBDLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLGFBQWE7QUFBQSxJQUNiLFdBQVc7QUFBQTtBQUFBLElBRVgsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBO0FBQUEsVUFFWixnQkFBZ0IsQ0FBQyxTQUFTLGFBQWEsa0JBQWtCO0FBQUE7QUFBQSxVQUV6RCxhQUFhO0FBQUEsWUFDWDtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSx1QkFBdUI7QUFBQSxFQUN6QjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBO0FBQUEsSUFFWixLQUFLO0FBQUEsTUFDSCxZQUFZO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFBQSxFQUVBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFNBQVMsaUJBQ1QsZ0JBQWdCO0FBQUEsRUFDbEIsRUFBRSxPQUFPLE9BQU87QUFBQSxFQUNoQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
