<template>
  <div class="page-layout bg-primary-gradient">
    <!-- Навигация -->
    <nav class="universal-nav">
      <div class="nav-container">
        <div class="nav-content">
          <NuxtLink to="/" class="nav-brand">
            <UIcon name="i-heroicons-users" class="brand-icon" />
            <span class="brand-text">UserManager</span>
          </NuxtLink>
          <NuxtLink to="/register" class="text-link">
            Нужен аккаунт?
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
            <div class="page-icon-container page-icon-primary">
              <UIcon name="i-heroicons-arrow-right-on-rectangle" class="page-icon primary" />
            </div>
            <h2 class="page-title">Добро пожаловать</h2>
            <p class="page-subtitle">Войдите в свой аккаунт</p>
          </div>

          <!-- Форма входа -->
          <UCard class="universal-card">
            <div class="card-padding">
              <UForm :schema="schema" :state="state" @submit="onSubmit" class="form-container">
                <UFormGroup label="Email адрес" name="email" required>
                  <UInput v-model="state.email" type="email" placeholder="your@email.com" autocomplete="email"
                    :disabled="loading" size="lg" icon="i-heroicons-envelope" />
                </UFormGroup>

                <UFormGroup label="Пароль" name="password" required>
                  <UInput v-model="state.password" type="password" placeholder="Введите пароль"
                    autocomplete="current-password" :disabled="loading" size="lg" icon="i-heroicons-lock-closed" />
                </UFormGroup>

                <UButton type="submit" block size="lg" :loading="loading" :disabled="loading"
                  class="bg-primary-600 hover:bg-primary-700">
                  <UIcon name="i-heroicons-arrow-right-on-rectangle" class="mr-2" />
                  Войти в систему
                </UButton>
              </UForm>

              <!-- Дополнительные ссылки -->
              <div class="mt-6 space-y-4">
                <div class="text-center">
                  <NuxtLink to="/register" class="text-link font-medium">
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
