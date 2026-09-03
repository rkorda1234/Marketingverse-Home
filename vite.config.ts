import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
    'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY || '')
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        main: 'index.html',
        'thank-you': 'thank-you.html',
        'avanti-way': 'avanti-way.html',
        saaga: 'saaga.html',
        'saaga-phase-2': 'saaga-phase-2.html',
        realtors: 'realtors.html',
        'prime-group': 'prime-group.html',
        'prime-group-proposal': 'prime-group-proposal.html',
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000
  }
});