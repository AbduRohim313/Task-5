<template>
  <div class="page-layout bg-success-gradient">
    <!-- Навигация -->
    <nav class="universal-nav">
      <div class="nav-container">
        <div class="nav-content">
          <NuxtLink to="/" class="nav-brand">
            <UIcon name="i-heroicons-users" class="brand-icon" />
            <span class="brand-text">UserManager</span>
          </NuxtLink>
          <NuxtLink to="/login" class="text-link">
            Уже есть аккаунт?
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Основной контент -->
    <div class="page-content">
      <div class="centered-content">
        <div class="max-width-md fade-in">
          <!-- Заголовок -->
          <div class="page-header">
            <div class="page-icon-container page-icon-success">
              <UIcon name="i-heroicons-user-plus" class="page-icon success" />
            </div>
            <h2 class="page-title">Присоединяйтесь к нам</h2>
            <p class="page-subtitle">Создайте свой аккаунт бесплатно</p>
          </div>

          <!-- Форма регистрации -->
          <UCard class="universal-card">
            <div class="card-padding">
              <UForm :schema="schema" :state="state" @submit="onSubmit" class="form-container">
                <!-- Имя пользователя -->
                <UFormGroup label="Полное имя" name="name" required>
                  <UInput v-model="state.name" type="text" placeholder="Введите ваше имя" autocomplete="name"
                    :disabled="loading" size="lg" icon="i-heroicons-user" class="w-full" />
                </UFormGroup>

                <!-- Email -->
                <UFormGroup label="Email адрес" name="email" required>
                  <UInput v-model="state.email" type="email" placeholder="your@email.com" autocomplete="email"
                    :disabled="loading" size="lg" icon="i-heroicons-envelope" class="w-full" />
                </UFormGroup>

                <!-- Пароль -->
                <UFormGroup label="Пароль" name="password" required>
                  <UInput v-model="state.password" type="password" placeholder="Придумайте надежный пароль"
                    autocomplete="new-password" :disabled="loading" size="lg" icon="i-heroicons-lock-closed"
                    class="w-full" />
                </UFormGroup>

                <!-- Подтверждение пароля -->
                <UFormGroup label="Подтверждение пароля" name="confirmPassword" required>
                  <UInput v-model="state.confirmPassword" type="password" placeholder="Повторите пароль"
                    autocomplete="new-password" :disabled="loading" size="lg" icon="i-heroicons-lock-closed"
                    class="w-full" />
                </UFormGroup>

                <!-- Соглашение -->
                <div class="flex items-start">
                  <UCheckbox id="agree-terms" />
                  <div class="ml-3 text-sm">
                    <label for="agree-terms" class="text-gray-700">
                      Я согласен с
                      <a href="#" class="text-link font-medium">
                        условиями использования
                      </a>
                      и
                      <a href="#" class="text-link font-medium">
                        политикой конфиденциальности
                      </a>
                    </label>
                  </div>
                </div>

                <!-- Кнопка регистрации -->
                <UButton type="submit" block size="lg" :loading="loading" :disabled="loading"
                  class="bg-green-600 hover:bg-green-700">
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
                  <NuxtLink to="/login"
                    class="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <UIcon name="i-heroicons-arrow-right-on-rectangle" class="mr-2" />
                    Войти в существующий аккаунт
                  </NuxtLink>
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
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { useAuth } from '~~/composables/useAuth'

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
