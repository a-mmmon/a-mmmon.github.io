import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/react-vat-calculator/',  // <-- set your repo or deployment folder here
  plugins: [react()],
});
