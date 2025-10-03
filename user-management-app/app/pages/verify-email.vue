<template>
  <div class="page-layout bg-info-gradient">
    <!-- Навигация -->
    <nav class="universal-nav">
      <div class="nav-container">
        <div class="nav-content">
          <NuxtLink to="/" class="nav-brand">
            <UIcon name="i-heroicons-users" class="brand-icon" />
            <span class="brand-text">UserManager</span>
          </NuxtLink>
          <div class="nav-actions gap-4">
            <NuxtLink to="/login" class="text-link">
              Вход
            </NuxtLink>
            <NuxtLink to="/register" class="text-link">
              Регистрация
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Основной контент -->
    <div class="page-content">
      <div class="centered-content">
        <div class="max-width-md fade-in">

          <!-- Состояние загрузки -->
          <UCard v-if="loading" class="universal-card text-center">
            <div class="card-padding space-y-6">
              <div class="page-icon-container page-icon-info">
                <UIcon name="i-heroicons-envelope" class="page-icon info loading-spinner" />
              </div>
              <div>
                <h2 class="page-title">
                  Подтверждение email
                </h2>
                <p class="page-subtitle">
                  Проверяем ваш токен верификации...
                </p>
              </div>
              <div class="flex justify-center">
                <div class="loading-spinner rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            </div>
          </UCard>

          <!-- Состояние успеха -->
          <UCard v-else-if="success" class="universal-card text-center">
            <div class="card-padding space-y-6">
              <div class="page-icon-container page-icon-success">
                <UIcon name="i-heroicons-check-circle" class="page-icon success" />
              </div>
              <div>
                <h2 class="page-title">
                  Email успешно подтвержден!
                </h2>
                <p class="page-subtitle">
                  {{ message }}
                </p>
              </div>

              <!-- Успешные действия -->
              <div class="space-y-3">
                <UButton @click="$router.push('/login')" block size="lg" class="bg-green-600 hover:bg-green-700">
                  <UIcon name="i-heroicons-arrow-right-on-rectangle" class="mr-2" />
                  Войти в систему
                </UButton>

                <div class="text-sm text-gray-500">
                  Теперь вы можете войти в свой аккаунт
                </div>
              </div>

              <!-- Дополнительная информация -->
              <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <div class="flex items-start">
                  <UIcon name="i-heroicons-information-circle" class="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                  <div class="text-sm text-green-800">
                    <strong>Что дальше?</strong><br>
                    Используйте ваш email и пароль для входа в систему управления пользователями.
                  </div>
                </div>
              </div>
            </div>
          </UCard>

          <!-- Состояние ошибки -->
          <UCard v-else class="universal-card text-center">
            <div class="card-padding space-y-6">
              <div class="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <UIcon name="i-heroicons-exclamation-triangle" class="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h2 class="page-title">
                  Ошибка верификации
                </h2>
                <p class="text-red-600">
                  {{ message }}
                </p>
              </div>

              <!-- Действия при ошибке -->
              <div class="space-y-3">
                <UButton @click="$router.push('/register')" block size="lg" class="bg-red-600 hover:bg-red-700">
                  <UIcon name="i-heroicons-user-plus" class="mr-2" />
                  Зарегистрироваться заново
                </UButton>

                <UButton @click="$router.push('/login')" block size="lg" variant="outline">
                  <UIcon name="i-heroicons-arrow-right-on-rectangle" class="mr-2" />
                  Попробовать войти
                </UButton>
              </div>

              <!-- Помощь -->
              <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                <div class="flex items-start">
                  <UIcon name="i-heroicons-light-bulb" class="h-5 w-5 text-red-600 mt-0.5 mr-3" />
                  <div class="text-sm text-red-800">
                    <strong>Возможные причины:</strong><br>
                    • Ссылка устарела или уже была использована<br>
                    • Неверный токен верификации<br>
                    • Проблемы с сетевым соединением
                  </div>
                </div>
              </div>
            </div>
          </UCard>

          <!-- Возврат на главную -->
          <div class="text-center mt-6">
            <NuxtLink to="/" class="inline-flex items-center text-link">
              <UIcon name="i-heroicons-arrow-left" class="mr-2" />
              Вернуться на главную
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~~/composables/useAuth'

// Настройка страницы
definePageMeta({
  layout: false
})

// Реактивные данные
const loading = ref(true)
const success = ref(false)
const message = ref('')

const { verifyEmail } = useAuth()
const route = useRoute()

// Верификация при монтировании компонента
onMounted(async () => {
  const token = route.query.token as string

  if (!token) {
    success.value = false
    message.value = 'Токен верификации не найден в URL'
    loading.value = false
    return
  }

  try {
    const result = await verifyEmail(token)
    success.value = result.success
    message.value = result.message
  } catch (error) {
    success.value = false
    message.value = 'Произошла ошибка при верификации email'
  } finally {
    loading.value = false
  }
})
</script>
