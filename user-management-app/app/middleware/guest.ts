// Полезно: Middleware для гостевых страниц (перенаправляет аутентифицированных пользователей)
export default defineNuxtRouteMiddleware((to, from) => {
  // Важно: Проверяем токен в localStorage
  if (process.client) {
    const token = localStorage.getItem('auth-token')

    if (token) {
      // Обратите внимание: Перенаправляем аутентифицированных пользователей в админ панель
      return navigateTo('/admin')
    }
  }
})
