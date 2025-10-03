<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
    <!-- Навигация -->
    <nav class="bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <NuxtLink to="/" class="flex items-center">
            <UIcon name="i-heroicons-users" class="h-8 w-8 text-primary-600" />
            <span class="ml-2 text-xl font-bold text-gray-900">UserManager</span>
          </NuxtLink>
          <NuxtLink to="/register" class="text-sm text-primary-600 hover:text-primary-500">
            Нужен аккаунт?
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Основной контент -->
    <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full">
        <!-- Заголовок -->
        <div class="text-center mb-8">
          <div class="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <UIcon name="i-heroicons-arrow-right-on-rectangle" class="h-8 w-8 text-primary-600" />
          </div>
          <h2 class="text-3xl font-bold text-gray-900">Добро пожаловать</h2>
          <p class="mt-2 text-gray-600">Войдите в свой аккаунт</p>
        </div>

        <!-- Форма входа -->
        <UCard class="p-6 shadow-xl border-0">
          <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-6">
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

            <UFormGroup label="Пароль" name="password" required>
              <UInput 
                v-model="state.password" 
                type="password" 
                placeholder="Введите пароль" 
                autocomplete="current-password"
                :disabled="loading"
                size="lg"
                icon="i-heroicons-lock-closed"
              />
            </UFormGroup>

            <UButton 
              type="submit" 
              block 
              size="lg"
              :loading="loading" 
              :disabled="loading"
              class="bg-primary-600 hover:bg-primary-700"
            >
              <UIcon name="i-heroicons-arrow-right-on-rectangle" class="mr-2" />
              Войти в систему
            </UButton>
          </UForm>

          <!-- Дополнительные ссылки -->
          <div class="mt-6 space-y-4">
            <div class="text-center">
              <NuxtLink 
                to="/register" 
                class="text-sm text-primary-600 hover:text-primary-500 font-medium"
              >
                Нет аккаунта? Зарегистрируйтесь
              </NuxtLink>
            </div>
            
            <!-- Демо данные -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="text-sm font-medium text-gray-900 mb-2">Демо доступ:</h4>
              <div class="text-xs text-gray-600 space-y-1">
                <div>Email: admin@example.com</div>
                <div>Пароль: admin123</div>
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
import { z } from 'zod'

// Настройка страницы
definePageMeta({
  layout: false,
  middleware: 'guest'
})

// Схема валидации
const schema = z.object({
  email: z.string().email('Неверный формат email'),
  password: z.string().min(1, 'Пароль обязателен')
})

// Состояние формы
const state = reactive({
  email: '',
  password: ''
})

const loading = ref(false)
const toast = useToast()
const { login } = useAuth()

// Обработка отправки формы
const onSubmit = async (event: any) => {
  loading.value = true

  try {
    const data = event.data
    const result = await login(data.email, data.password)

    if (result.success) {
      toast.add({
        title: 'Успешно!',
        description: result.message,
        color: 'success'
      })

      // Перенаправляем на админ панель
      await navigateTo('/admin')
    } else {
      toast.add({
        title: 'Ошибка входа',
        description: result.message,
        color: 'error'
      })
    }
  } catch (error) {
    toast.add({
      title: 'Ошибка',
      description: 'Произошла ошибка при входе в систему',
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}
</script>