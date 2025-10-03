<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
    <!-- Навигационная панель -->
    <nav class="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <UIcon name="i-heroicons-users" class="h-8 w-8 text-primary-600" />
            <span class="ml-2 text-xl font-bold text-gray-900">UserManager</span>
          </div>
          <div class="flex items-center space-x-4">
            <UButton to="/login" variant="ghost" size="sm">Войти</UButton>
            <UButton to="/register" size="sm">Регистрация</UButton>
          </div>
        </div>
      </div>
    </nav>

    <!-- Основной контент -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <!-- Hero секция -->
      <div class="text-center mb-16">
        <div class="mb-8">
          <UIcon name="i-heroicons-shield-check" class="mx-auto h-16 w-16 text-primary-600" />
        </div>
        <h1 class="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
          Система управления
          <span class="text-primary-600">пользователями</span>
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Современное веб-приложение для эффективного управления пользователями с интуитивным интерфейсом и мощными возможностями
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
        <UCard class="p-6 hover:shadow-lg transition-shadow">
          <div class="text-center">
            <UIcon name="i-heroicons-users" class="mx-auto h-12 w-12 text-primary-600 mb-4" />
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Управление пользователями</h3>
            <p class="text-gray-600">Полный CRUD для управления пользователями с сортировкой и фильтрацией</p>
          </div>
        </UCard>
        
        <UCard class="p-6 hover:shadow-lg transition-shadow">
          <div class="text-center">
            <UIcon name="i-heroicons-shield-check" class="mx-auto h-12 w-12 text-green-600 mb-4" />
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Безопасность</h3>
            <p class="text-gray-600">JWT аутентификация, хеширование паролей и защита маршрутов</p>
          </div>
        </UCard>
        
        <UCard class="p-6 hover:shadow-lg transition-shadow">
          <div class="text-center">
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
    </main>

    <!-- Футер -->
    <footer class="bg-white border-t border-gray-200 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
onMounted(() => {
  if (process.client) {
    const token = localStorage.getItem('auth-token')
    if (token) {
      // Небольшая задержка для плавности
      setTimeout(() => {
        navigateTo('/admin')
      }, 1000)
    }
  }
})
</script>
