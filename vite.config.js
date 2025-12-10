import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
 import tailwindcss from '@tailwindcss/vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
})



// import { defineConfig } from 'vite';
//

// export default defineConfig({
//   plugins: [
//     ,tailwindcss()
//   ],
// });
// Put Tailwind CSS and daisyUI in your CSS file (and remove old styles)

// src/style.css
//