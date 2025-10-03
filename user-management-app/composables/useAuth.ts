// Важно: Composable для управления аутентификацией
export const useAuth = () => {
  // Обратите внимание: Реактивное состояние пользователя
  const user = useState<any>('auth.user', () => null)
  const token = useState<string | null>('auth.token', () => null)

  // Полезно: Проверка аутентификации
  const isAuthenticated = computed(() => !!user.value && !!token.value)

  // Важно: Функция входа в систему
  const login = async (email: string, password: string) => {
    try {
      const response = await $fetch<any>('/api/auth/login', {
        method: 'POST',
        body: { email, password }
      })

      if (response.success) {
        // Обратите внимание: Сохраняем токен и данные пользователя
        token.value = response.token
        user.value = response.user

        // Полезно: Сохраняем токен в localStorage для персистентности
        if (process.client) {
          localStorage.setItem('auth-token', response.token)
        }

        return { success: true, message: response.message }
      }

      return { success: false, message: 'Ошибка входа' }
    } catch (error: any) {
      console.error('Login error:', error)
      return {
        success: false,
        message: error.data?.message || 'Ошибка при входе в систему'
      }
    }
  }

  // Важно: Функция регистрации
  const register = async (name: string, email: string, password: string) => {
    try {
      console.log('Register composable called with:', { name, email, password: password ? '[HIDDEN]' : undefined })

      const response = await $fetch<any>('/api/auth/register', {
        method: 'POST',
        body: { name, email, password }
      })

      console.log('Registration response:', response)

      return {
        success: response.success,
        message: response.message
      }
    } catch (error: any) {
      console.error('Registration error:', error)
      return {
        success: false,
        message: error.data?.message || 'Ошибка при регистрации'
      }
    }
  }

  // Обратите внимание: Функция выхода
  const logout = () => {
    user.value = null
    token.value = null

    if (process.client) {
      localStorage.removeItem('auth-token')
      // Перенаправляем на страницу входа
      navigateTo('/login')
    }
  }

  // Полезно: Инициализация при загрузке приложения
  const initAuth = async () => {
    if (process.client) {
      const savedToken = localStorage.getItem('auth-token')
      if (savedToken) {
        try {
          // Проверяем валидность токена, делая запрос к защищенному эндпоинту
          const response = await $fetch<any>('/api/users', {
            headers: {
              Authorization: `Bearer ${savedToken}`
            }
          })

          if (response.success) {
            token.value = savedToken
            // Получаем данные пользователя из токена или делаем дополнительный запрос
            // Здесь упрощенно - в реальном приложении лучше декодировать JWT
          }
        } catch (error) {
          // Токен невалиден, удаляем его
          localStorage.removeItem('auth-token')
        }
      }
    }
  }

  // Важно: Функция верификации email
  const verifyEmail = async (token: string) => {
    try {
      const { data } = await $fetch<any>('/api/auth/verify-email', {
        method: 'POST',
        body: { token }
      })

      return {
        success: data.success,
        message: data.message
      }
    } catch (error: any) {
      console.error('Email verification error:', error)
      return {
        success: false,
        message: error.data?.message || 'Ошибка при верификации email'
      }
    }
  }

  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated,
    login,
    register,
    logout,
    initAuth,
    verifyEmail
  }
}
