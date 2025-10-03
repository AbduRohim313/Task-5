<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Важно: Навигационная панель для аутентифицированных пользователей -->
    <nav v-if="user" class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">
              Система управления пользователями
            </h1>
          </div>

          <div class="flex items-center space-x-4">
            <!-- Обратите внимание: Информация о текущем пользователе -->
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-700">{{ user.name }}</span>
              <UBadge :color="getStatusColor(user.status)" variant="subtle">
                {{ getStatusText(user.status) }}
              </UBadge>
            </div>

            <!-- Полезно: Кнопка выхода -->
            <UButton @click="logout" variant="ghost" size="sm" icon="i-heroicons-arrow-right-on-rectangle">
              Выйти
            </UButton>
          </div>
        </div>
      </div>
    </nav>

    <!-- Важно: Основное содержимое -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <slot />
    </main>

    <!-- Обратите внимание: Компонент для отображения уведомлений -->
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~~/composables/useAuth'


// Полезно: Получаем состояние аутентификации
const { user, logout } = useAuth()

// Важно: Функции для отображения статуса пользователя
function getStatusColor(status: string) {
  switch (status) {
    case 'ACTIVE': return 'green'
    case 'BLOCKED': return 'red'
    case 'UNVERIFIED': return 'yellow'
    default: return 'gray'
  }
}

function getStatusText(status: string) {
  switch (status) {
    case 'ACTIVE': return 'Активен'
    case 'BLOCKED': return 'Заблокирован'
    case 'UNVERIFIED': return 'Не подтвержден'
    default: return status
  }
}
</script>
