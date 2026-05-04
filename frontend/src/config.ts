const isLocal = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || 
   window.location.hostname === '127.0.0.1');

export const API_URL = import.meta.env.VITE_API_URL || 
  (isLocal ? 'http://localhost:8080' : 'https://recovery-ai-tper.onrender.com');

export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'anoopyadav5984@gmail.com';
