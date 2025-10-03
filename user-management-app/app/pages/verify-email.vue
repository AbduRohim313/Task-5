<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <!-- Навигация -->
    <nav class="bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <NuxtLink to="/" class="flex items-center">
            <UIcon name="i-heroicons-users" class="h-8 w-8 text-primary-600" />
            <span class="ml-2 text-xl font-bold text-gray-900">UserManager</span>
          </NuxtLink>
          <div class="flex space-x-4">
            <NuxtLink to="/login" class="text-sm text-primary-600 hover:text-primary-500">
              Вход
            </NuxtLink>
            <NuxtLink to="/register" class="text-sm text-primary-600 hover:text-primary-500">
              Регистрация
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Основной контент -->
    <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full">
        
        <!-- Состояние загрузки -->
        <UCard v-if="loading" class="text-center p-8 shadow-xl border-0">
          <div class="space-y-6">
            <div class="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <UIcon name="i-heroicons-envelope" class="h-8 w-8 text-blue-600 animate-pulse" />
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900 mb-2">
                Подтверждение email
              </h2>
              <p class="text-gray-600">
                Проверяем ваш токен верификации...
              </p>
            </div>
            <div class="flex justify-center">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </UCard>

        <!-- Состояние успеха -->
        <UCard v-else-if="success" class="text-center p-8 shadow-xl border-0">
          <div class="space-y-6">
            <div class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <UIcon name="i-heroicons-check-circle" class="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900 mb-2">
                Email успешно подтвержден!
              </h2>
              <p class="text-gray-600">
                {{ message }}
              </p>
            </div>
            
            <!-- Успешные действия -->
            <div class="space-y-3">
              <UButton 
                @click="$router.push('/login')" 
                block 
                size="lg"
                class="bg-green-600 hover:bg-green-700"
              >
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
        <UCard v-else class="text-center p-8 shadow-xl border-0">
          <div class="space-y-6">
            <div class="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <UIcon name="i-heroicons-exclamation-triangle" class="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900 mb-2">
                Ошибка верификации
              </h2>
              <p class="text-red-600">
                {{ message }}
              </p>
            </div>

            <!-- Действия при ошибке -->
            <div class="space-y-3">
              <UButton 
                @click="$router.push('/register')" 
                block 
                size="lg"
                class="bg-red-600 hover:bg-red-700"
              >
                <UIcon name="i-heroicons-user-plus" class="mr-2" />
                Зарегистрироваться заново
              </UButton>
              
              <UButton 
                @click="$router.push('/login')" 
                block 
                size="lg"
                variant="outline"
              >
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
          <NuxtLink 
            to="/" 
            class="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <UIcon name="i-heroicons-arrow-left" class="mr-2" />
            Вернуться на главную
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
