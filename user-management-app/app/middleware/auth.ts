import { useAuth } from "~~/composables/useAuth"

// Важно: Middleware для проверки аутентификации
export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth()

  // Обратите внимание: Проверяем токен в localStorage
  if (process.client) {
    const token = localStorage.getItem('auth-token')

    if (!token) {
      // Полезно: Перенаправляем неаутентифицированных пользователей на страницу входа
      return navigateTo('/login')
    }
  }
})
