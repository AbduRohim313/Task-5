<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
    <!-- Навигация -->
    <nav class="bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <NuxtLink to="/" class="flex items-center">
            <UIcon name="i-heroicons-users" class="h-8 w-8 text-primary-600" />
            <span class="ml-2 text-xl font-bold text-gray-900">UserManager</span>
          </NuxtLink>
          <NuxtLink to="/login" class="text-sm text-primary-600 hover:text-primary-500">
            Уже есть аккаунт?
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Основной контент -->
    <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full">
        <!-- Заголовок -->
        <div class="text-center mb-8">
          <div class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <UIcon name="i-heroicons-user-plus" class="h-8 w-8 text-green-600" />
          </div>
          <h2 class="text-3xl font-bold text-gray-900">Присоединяйтесь к нам</h2>
          <p class="mt-2 text-gray-600">Создайте свой аккаунт бесплатно</p>
        </div>

        <!-- Форма регистрации -->
        <UCard class="p-6 shadow-xl border-0">
          <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-5">
            <!-- Имя пользователя -->
            <UFormGroup label="Полное имя" name="name" required>
              <UInput 
                v-model="state.name" 
                type="text" 
                placeholder="Введите ваше имя" 
                autocomplete="name"
                :disabled="loading"
                size="lg"
                icon="i-heroicons-user"
              />
            </UFormGroup>

            <!-- Email -->
            <UFormGroup label="Email адрес" name="email" required>
              <UInput 
                v-model="state.email" 
                type="email" 
                placeholder="your@email.com" 
                autocomplete="email"
                :disabled="loading"
                size="lg"
                icon="i-heroicons-envelope"
              />
            </UFormGroup>

            <!-- Пароль -->
            <UFormGroup label="Пароль" name="password" required>
              <UInput 
                v-model="state.password" 
                type="password" 
                placeholder="Придумайте надежный пароль" 
                autocomplete="new-password"
                :disabled="loading"
                size="lg"
                icon="i-heroicons-lock-closed"
              />
            </UFormGroup>

            <!-- Подтверждение пароля -->
            <UFormGroup label="Подтверждение пароля" name="confirmPassword" required>
              <UInput 
                v-model="state.confirmPassword" 
                type="password" 
                placeholder="Повторите пароль" 
                autocomplete="new-password"
                :disabled="loading"
                size="lg"
                icon="i-heroicons-lock-closed"
              />
            </UFormGroup>

            <!-- Соглашение -->
            <div class="flex items-start">
              <UCheckbox id="agree-terms" />
              <div class="ml-3 text-sm">
                <label for="agree-terms" class="text-gray-700">
                  Я согласен с 
                  <a href="#" class="text-primary-600 hover:text-primary-500 font-medium">
                    условиями использования
                  </a>
                  и 
                  <a href="#" class="text-primary-600 hover:text-primary-500 font-medium">
                    политикой конфиденциальности
                  </a>
                </label>
              </div>
            </div>

            <!-- Кнопка регистрации -->
            <UButton 
              type="submit" 
              block 
              size="lg"
              :loading="loading" 
              :disabled="loading"
              class="bg-green-600 hover:bg-green-700"
            >
              <UIcon name="i-heroicons-user-plus" class="mr-2" />
              Создать аккаунт
            </UButton>
          </UForm>

          <!-- Дополнительные опции -->
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">Или</span>
              </div>
            </div>

            <div class="mt-6">
              <NuxtLink 
                to="/login" 
                class="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <UIcon name="i-heroicons-arrow-right-on-rectangle" class="mr-2" />
                Войти в существующий аккаунт
              </NuxtLink>
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

        <!-- Преимущества регистрации -->
        <div class="mt-8">
          <div class="bg-white/50 rounded-lg p-4 border border-gray-200/50">
            <h4 class="text-sm font-medium text-gray-900 mb-3">Преимущества аккаунта:</h4>
            <div class="space-y-2 text-xs text-gray-600">
              <div class="flex items-center">
                <UIcon name="i-heroicons-check-circle" class="h-4 w-4 text-green-500 mr-2" />
                Полный доступ к системе управления
              </div>
              <div class="flex items-center">
                <UIcon name="i-heroicons-shield-check" class="h-4 w-4 text-blue-500 mr-2" />
                Безопасность ваших данных
              </div>
              <div class="flex items-center">
                <UIcon name="i-heroicons-cog-6-tooth" class="h-4 w-4 text-purple-500 mr-2" />
                Персональные настройки
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'

// Настройка страницы
definePageMeta({
  layout: false,
  middleware: 'guest'
})

// Схема валидации с проверкой совпадения паролей
const schema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Неверный формат email'),
  password: z.string().min(1, 'Пароль обязателен'),
  confirmPassword: z.string().min(1, 'Подтверждение пароля обязательно')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"]
})

// Состояние формы
const state = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const toast = useToast()
const { register } = useAuth()

// Обработка отправки формы
const onSubmit = async (event: any) => {
  console.log('Form event:', event)
  console.log('Form data:', event.data)
  loading.value = true

  try {
    const data = event.data
    console.log('Calling register with:', { name: data.name, email: data.email, password: data.password })
    const result = await register(data.name, data.email, data.password)

    if (result.success) {
      toast.add({
        title: 'Регистрация успешна!',
        description: result.message,
        color: 'success'
      })

      // Очищаем форму
      Object.assign(state, {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      })

      // Через некоторое время перенаправляем на страницу входа
      setTimeout(() => {
        navigateTo('/login')
      }, 2000)
    } else {
      toast.add({
        title: 'Ошибка регистрации',
        description: result.message,
        color: 'error'
      })
    }
  } catch (error) {
    toast.add({
      title: 'Ошибка',
      description: 'Произошла ошибка при регистрации',
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}
</script>
