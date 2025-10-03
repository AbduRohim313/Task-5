// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],

  css: [
    '~/assets/css/main.css'
  ],
  // Настройки для Netlify deployment
  nitro: {
    preset: 'netlify'
  },
  runtimeConfig: {
    // Переменные для сервера
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    databaseUrl: process.env.DATABASE_URL,
    emailUser: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASSWORD,
    emailHost: process.env.EMAIL_HOST || 'smtp.gmail.com',
    emailPort: process.env.EMAIL_PORT || '587',
    public: {
      // Публичные переменные для клиента
      appUrl: process.env.APP_URL || 'http://localhost:3000'
    }
  }
})
