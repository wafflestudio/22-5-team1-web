// vite.config.ts
import react from "file:///home/ywk0524/wafflestudio/project/client/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { defineConfig } from "file:///home/ywk0524/wafflestudio/project/client/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": "/src" } }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS95d2swNTI0L3dhZmZsZXN0dWRpby9wcm9qZWN0L2NsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUveXdrMDUyNC93YWZmbGVzdHVkaW8vcHJvamVjdC9jbGllbnQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUveXdrMDUyNC93YWZmbGVzdHVkaW8vcHJvamVjdC9jbGllbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICByZXNvbHZlOiB7IGFsaWFzOiB7ICdAJzogJy9zcmMnIH0gfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2UyxPQUFPLFdBQVc7QUFDL1QsU0FBUyxvQkFBb0I7QUFHN0IsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFNBQVMsRUFBRSxPQUFPLEVBQUUsS0FBSyxPQUFPLEVBQUU7QUFDcEMsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K