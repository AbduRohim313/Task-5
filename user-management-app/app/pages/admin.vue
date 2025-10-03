<template>
  <div class="page-layout bg-admin-layout">
    <!-- Верхняя панель навигации -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="nav-container">
        <div class="nav-content">
          <!-- Логотип и заголовок -->
          <div class="flex items-center">
            <div class="nav-brand">
              <UIcon name="i-heroicons-users" class="brand-icon" />
              <span class="brand-text">UserManager</span>
            </div>
            <div class="hidden md:block ml-8">
              <span class="text-gray-500">Панель администратора</span>
            </div>
          </div>

          <!-- Правая панель -->
          <div class="nav-actions">
            <!-- Уведомления -->
            <UButton variant="ghost" icon="i-heroicons-bell" size="sm" />

            <!-- Профиль -->
            <div class="flex items-center space-x-3">
              <div class="hidden md:block text-right">
                <p class="text-sm font-medium text-gray-900">Администратор</p>
                <p class="text-xs text-gray-500">admin@example.com</p>
              </div>
              <UButton @click="logout" variant="ghost" icon="i-heroicons-arrow-right-on-rectangle" size="sm">
                Выйти
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Основной контент -->
    <div class="page-content">
      <div class="content-container py-6">
        <!-- Заголовок и статистика -->
        <div class="mb-8">
          <div class="md:flex md:items-center md:justify-between">
            <div class="min-w-0 flex-1">
              <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Управление пользователями
              </h1>
              <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <UIcon name="i-heroicons-calendar" class="flex-shrink-0 mr-1.5 h-4 w-4" />
                  Последнее обновление: {{ new Date().toLocaleDateString('ru-RU') }}
                </div>
              </div>
            </div>
          </div>

          <!-- Карточки статистики -->
          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-6">
            <!-- Всего пользователей -->
            <UCard>
              <template #header>
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <UIcon name="i-heroicons-users" class="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">Всего пользователей</p>
                    <p class="text-2xl font-semibold text-gray-200">{{ stats.total }}</p>
                  </div>
                </div>
              </template>
            </UCard>

            <!-- Активные -->
            <UCard>
              <template #header>
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <UIcon name="i-heroicons-check-circle" class="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">Активные</p>
                    <p class="text-2xl font-semibold text-gray-200">{{ stats.active }}</p>
                  </div>
                </div>
              </template>
            </UCard>

            <!-- Заблокированные -->
            <UCard>
              <template #header>
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <UIcon name="i-heroicons-no-symbol" class="h-5 w-5 text-red-600" />
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">Заблокированные</p>
                    <p class="text-2xl font-semibold text-gray-200">{{ stats.blocked }}</p>
                  </div>
                </div>
              </template>
            </UCard>

            <!-- Неподтвержденные -->
            <UCard>
              <template #header>
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <UIcon name="i-heroicons-exclamation-triangle" class="h-5 w-5 text-yellow-600" />
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">Неподтвержденные</p>
                    <p class="text-2xl font-semibold text-gray-200">{{ stats.unverified }}</p>
                  </div>
                </div>
              </template>
            </UCard>
          </div>
        </div>

        <!-- Панель управления пользователями -->
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900">Список пользователей</h3>

              <!-- Панель действий -->
              <div class="flex items-center space-x-3">
                <!-- Действия с выбранными -->
                <div v-if="selectedUsers.length > 0" class="flex items-center space-x-2">
                  <span class="text-sm text-gray-600">
                    Выбрано: {{ selectedUsers.length }}
                  </span>

                  <UButton @click="blockUsers" :disabled="loading" color="error" variant="soft" size="sm">
                    <UIcon name="i-heroicons-no-symbol" class="mr-1" />
                    Заблокировать
                  </UButton>

                  <UButton @click="unblockUsers" :disabled="loading" color="success" variant="soft" size="sm">
                    <UIcon name="i-heroicons-lock-open" class="mr-1" />
                    Разблокировать
                  </UButton>

                  <UButton @click="deleteUsers" :disabled="loading" color="error" variant="outline" size="sm">
                    <UIcon name="i-heroicons-trash" class="mr-1" />
                    Удалить
                  </UButton>
                </div>

                <!-- Общие действия -->
                <UButton @click="deleteUnverifiedUsers" :disabled="loading" color="warning" variant="soft" size="sm">
                  <UIcon name="i-heroicons-user-minus" class="mr-1" />
                  Очистить неподтвержденных
                </UButton>

                <UButton @click="refreshUsers" :disabled="loading" variant="outline" size="sm">
                  <UIcon name="i-heroicons-arrow-path" class="mr-1" />
                  Обновить
                </UButton>
              </div>
            </div>
          </template>
          <!-- Таблица пользователей -->
          <div class="overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <!-- Чекбокс для выбора всех -->
                    <th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8">
                      <UCheckbox v-model="selectAll" @change="toggleSelectAll" :disabled="loading" />
                    </th>

                    <!-- Сортируемые заголовки -->
                    <th scope="col"
                      class="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                      @click="sortBy('name')">
                      <div class="flex items-center space-x-1">
                        <span>Имя</span>
                        <UIcon v-if="currentSort === 'name'"
                          :name="sortOrder === 'asc' ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                          class="w-4 h-4 text-gray-400" />
                      </div>
                    </th>

                    <th scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                      @click="sortBy('email')">
                      <div class="flex items-center space-x-1">
                        <span>Email</span>
                        <UIcon v-if="currentSort === 'email'"
                          :name="sortOrder === 'asc' ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                          class="w-4 h-4 text-gray-400" />
                      </div>
                    </th>

                    <th scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                      @click="sortBy('lastLoginAt')">
                      <div class="flex items-center space-x-1">
                        <span>Последний вход</span>
                        <UIcon v-if="currentSort === 'lastLoginAt'"
                          :name="sortOrder === 'asc' ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                          class="w-4 h-4 text-gray-400" />
                      </div>
                    </th>

                    <th scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                      @click="sortBy('registrationTime')">
                      <div class="flex items-center space-x-1">
                        <span>Регистрация</span>
                        <UIcon v-if="currentSort === 'registrationTime'"
                          :name="sortOrder === 'asc' ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                          class="w-4 h-4 text-gray-400" />
                      </div>
                    </th>

                    <th scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                      @click="sortBy('status')">
                      <div class="flex items-center space-x-1">
                        <span>Статус</span>
                        <UIcon v-if="currentSort === 'status'"
                          :name="sortOrder === 'asc' ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                          class="w-4 h-4 text-gray-400" />
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody class="divide-y divide-gray-200 bg-white">
                  <!-- Строки пользователей -->
                  <tr v-for="user in users" :key="user.id" :class="{ 'bg-blue-50': selectedUsers.includes(user.id) }"
                    class="hover:bg-gray-50">

                    <!-- Чекбокс для выбора пользователя -->
                    <td class="relative w-12 px-6 sm:w-16 sm:px-8">
                      <UCheckbox :model-value="selectedUsers.includes(user.id)" @update:model-value="(checked) => {
                        if (checked) {
                          selectedUsers.push(user.id)
                        } else {
                          const index = selectedUsers.indexOf(user.id)
                          if (index > -1) selectedUsers.splice(index, 1)
                        }
                      }" :disabled="loading" />
                    </td>

                    <!-- Данные пользователя -->
                    <td class="whitespace-nowrap py-4 pr-3 text-sm">
                      <div class="flex items-center">
                        <div class="h-10 w-10 flex-shrink-0">
                          <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <UIcon name="i-heroicons-user" class="h-5 w-5 text-gray-500" />
                          </div>
                        </div>
                        <div class="ml-4">
                          <div class="font-medium text-gray-900">{{ user.name }}</div>
                        </div>
                      </div>
                    </td>

                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {{ user.email }}
                    </td>

                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span v-if="user.lastLoginAt" :title="formatDate(user.lastLoginAt)">
                        {{ formatRelativeTime(user.lastLoginAt) }}
                      </span>
                      <span v-else class="text-gray-400">
                        Никогда
                      </span>
                    </td>

                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      :title="formatDate(user.registrationTime)">
                      {{ formatRelativeTime(user.registrationTime) }}
                    </td>

                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                      <span :class="getStatusClass(user.status)">
                        {{ getStatusText(user.status) }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Индикатор загрузки -->
            <div v-if="loading" class="flex justify-center py-8">
              <div class="flex items-center space-x-2">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                <span class="text-sm text-gray-500">Загрузка...</span>
              </div>
            </div>

            <!-- Сообщение о пустом списке -->
            <div v-if="!loading && users.length === 0" class="text-center py-12">
              <UIcon name="i-heroicons-users" class="mx-auto h-12 w-12 text-gray-400" />
              <h3 class="mt-2 text-sm font-medium text-gray-900">Пользователи не найдены</h3>
              <p class="mt-1 text-sm text-gray-500">Начните с создания первого пользователя</p>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~~/composables/useAuth'
// Настройка страницы
definePageMeta({
  middleware: 'auth'
})

// Типы данных
interface User {
  id: string
  name: string
  email: string
  status: 'ACTIVE' | 'BLOCKED' | 'UNVERIFIED'
  lastLoginAt: string | null
  registrationTime: string
}

// Реактивные данные
const users = ref<User[]>([])
const selectedUsers = ref<string[]>([])
const selectAll = ref(false)
const loading = ref(false)
const currentSort = ref('lastLoginAt')
const sortOrder = ref('desc')

// Статистика пользователей
const stats = computed(() => ({
  total: users.value.length,
  active: users.value.filter(u => u.status === 'ACTIVE').length,
  blocked: users.value.filter(u => u.status === 'BLOCKED').length,
  unverified: users.value.filter(u => u.status === 'UNVERIFIED').length
}))

const toast = useToast()
const { logout } = useAuth()

// Загрузка пользователей при монтировании компонента
onMounted(() => {
  fetchUsers()
})

// Функция загрузки пользователей
const fetchUsers = async () => {
  loading.value = true

  try {
    const token = localStorage.getItem('auth-token')
    const response = await $fetch('/api/users', {
      query: {
        sortBy: currentSort.value,
        sortOrder: sortOrder.value
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.success) {
      users.value = response.users
    }
  } catch (error) {
    toast.add({
      title: 'Ошибка',
      description: 'Не удалось загрузить список пользователей',
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}

// Обновление данных
const refreshUsers = () => {
  fetchUsers()
}

// Сортировка пользователей
const sortBy = (field: string) => {
  if (currentSort.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    currentSort.value = field
    sortOrder.value = 'desc'
  }
  fetchUsers()
}

// Выбор всех пользователей
const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedUsers.value = users.value.map(u => u.id)
  } else {
    selectedUsers.value = []
  }
}

// Отслеживание изменений выбранных пользователей
watch(selectedUsers, () => {
  selectAll.value = selectedUsers.value.length === users.value.length && users.value.length > 0
}, { deep: true })

// Управление пользователями
const manageUsers = async (action: string) => {
  if (selectedUsers.value.length === 0 && action !== 'delete-unverified') return

  loading.value = true

  try {
    const token = localStorage.getItem('auth-token')
    let response

    if (action === 'delete-unverified') {
      response = await $fetch('/api/users/delete-unverified', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } else {
      response = await $fetch('/api/users/manage', {
        method: 'POST',
        body: {
          userIds: selectedUsers.value,
          action
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }

    if (response.success) {
      toast.add({
        title: 'Успешно!',
        description: response.message,
        color: 'success'
      })

      // Очищаем выбор и перезагружаем список
      selectedUsers.value = []
      selectAll.value = false
      await fetchUsers()
    }
  } catch (error: any) {
    toast.add({
      title: 'Ошибка',
      description: error.data?.message || 'Произошла ошибка',
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}

// Функции для действий с пользователями
const blockUsers = () => manageUsers('block')
const unblockUsers = () => manageUsers('unblock')
const deleteUsers = () => manageUsers('delete')
const deleteUnverifiedUsers = () => manageUsers('delete-unverified')

// Утилиты для отображения
const getStatusClass = (status: string) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
  switch (status) {
    case 'ACTIVE':
      return `${baseClasses} bg-green-100 text-green-800`
    case 'BLOCKED':
      return `${baseClasses} bg-red-100 text-red-800`
    case 'UNVERIFIED':
      return `${baseClasses} bg-yellow-100 text-yellow-800`
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'ACTIVE': return 'Активен'
    case 'BLOCKED': return 'Заблокирован'
    case 'UNVERIFIED': return 'Не подтвержден'
    default: return status
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('ru-RU')
}

const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return 'Менее часа назад'
  if (diffInHours < 24) return `${diffInHours} ч. назад`

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays} дн. назад`

  return formatDate(dateString).split(',')[0] // Только дата без времени
}
</script>

<style scoped>
/* Дополнительные стили для админ панели */
</style>
