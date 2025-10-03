<template>
  <div class="page-layout bg-primary-gradient">
    <!-- Навигационная панель -->
    <nav class="universal-nav sticky">
      <div class="nav-container">
        <div class="nav-content">
          <div class="nav-brand">
            <UIcon name="i-heroicons-users" class="brand-icon" />
            <span class="brand-text">UserManager</span>
          </div>
          <div class="nav-actions">
            <UButton to="/login" variant="ghost" size="sm">Войти</UButton>
            <UButton to="/register" size="sm">Регистрация</UButton>
          </div>
        </div>
      </div>
    </nav>

    <!-- Основной контент -->
    <main class="page-content">
      <div class="content-container py-16">
        <!-- Hero секция -->
        <div class="text-center mb-16 fade-in">
          <div class="page-icon-container page-icon-primary mb-8">
            <UIcon name="i-heroicons-shield-check" class="page-icon primary" style="height: 4rem; width: 4rem;" />
          </div>
          <h1 class="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Система управления
            <span class="text-primary-600">пользователями</span>
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Современное веб-приложение для эффективного управления пользователями с интуитивным интерфейсом и мощными
            возможностями
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UButton to="/register" size="lg" class="px-8 py-3">
              <UIcon name="i-heroicons-user-plus" class="mr-2" />
              Начать работу
            </UButton>
            <UButton to="/login" variant="outline" size="lg" class="px-8 py-3">
              <UIcon name="i-heroicons-arrow-right-on-rectangle" class="mr-2" />
              Войти в систему
            </UButton>
          </div>
        </div>

        <!-- Функции -->
        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <UCard class="universal-card hover:shadow-lg transition-shadow">
            <div class="text-center card-padding">
              <UIcon name="i-heroicons-users" class="mx-auto h-12 w-12 text-primary-600 mb-4" />
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Управление пользователями</h3>
              <p class="text-gray-600">Полный CRUD для управления пользователями с сортировкой и фильтрацией</p>
            </div>
          </UCard>

          <UCard class="universal-card hover:shadow-lg transition-shadow">
            <div class="text-center card-padding">
              <UIcon name="i-heroicons-shield-check" class="mx-auto h-12 w-12 text-green-600 mb-4" />
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Безопасность</h3>
              <p class="text-gray-600">JWT аутентификация, хеширование паролей и защита маршрутов</p>
            </div>
          </UCard>

          <UCard class="universal-card hover:shadow-lg transition-shadow">
            <div class="text-center card-padding">
              <UIcon name="i-heroicons-envelope" class="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Email верификация</h3>
              <p class="text-gray-600">Автоматическая отправка писем для подтверждения аккаунтов</p>
            </div>
          </UCard>
        </div>

        <!-- Технологии -->
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 mb-8">Современные технологии</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="flex flex-col items-center p-4">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                <span class="text-green-600 font-bold">N4</span>
              </div>
              <span class="text-sm font-medium text-gray-900">Nuxt 4</span>
            </div>
            <div class="flex flex-col items-center p-4">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                <span class="text-blue-600 font-bold">UI</span>
              </div>
              <span class="text-sm font-medium text-gray-900">Nuxt UI</span>
            </div>
            <div class="flex flex-col items-center p-4">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                <span class="text-purple-600 font-bold">P</span>
              </div>
              <span class="text-sm font-medium text-gray-900">Prisma</span>
            </div>
            <div class="flex flex-col items-center p-4">
              <div class="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-2">
                <span class="text-cyan-600 font-bold">TS</span>
              </div>
              <span class="text-sm font-medium text-gray-900">TypeScript</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Футер -->
    <footer class="bg-white border-t border-gray-200 mt-16">
      <div class="content-container py-8">
        <div class="text-center text-gray-600">
          <p>&copy; 2025 UserManager. Создано с помощью Nuxt 4 и Nuxt UI.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Важно: Настройка страницы
definePageMeta({
  layout: false
})

// Автоматическое перенаправление аутентифицированных пользователей
// ВРЕМЕННО ОТКЛЮЧЕНО для проверки стилей
/*
onMounted(() => {
  if (process.client) {
    const token = localStorage.getItem('auth-token')
    if (token) {
      // Проверяем валидность токена перед перенаправлением
      try {
        // Простая проверка структуры JWT токена
        const tokenParts = token.split('.')
        if (tokenParts.length === 3 && tokenParts[1]) {
          // Декодируем payload для проверки срока действия
          const payload = JSON.parse(atob(tokenParts[1]))
          const currentTime = Math.floor(Date.now() / 1000)

          // Если токен не истек, перенаправляем
          if (payload.exp && payload.exp > currentTime) {
            setTimeout(() => {
              navigateTo('/admin')
            }, 1000)
          } else {
            // Токен истек, удаляем его
            localStorage.removeItem('auth-token')
          }
        } else {
          // Неверный формат токена, удаляем его
          localStorage.removeItem('auth-token')
        }
      } catch (error) {
        // Ошибка при парсинге токена, удаляем его
        localStorage.removeItem('auth-token')
      }
    }
  }
})
*/
</script>
