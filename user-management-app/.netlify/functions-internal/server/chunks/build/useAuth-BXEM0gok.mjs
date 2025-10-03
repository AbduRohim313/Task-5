import { b as useState } from './server.mjs';
import { computed, readonly } from 'vue';

const useAuth = () => {
  const user = useState("auth.user", () => null);
  const token = useState("auth.token", () => null);
  const isAuthenticated = computed(() => !!user.value && !!token.value);
  const login = async (email, password) => {
    try {
      const response = await $fetch("/api/auth/login", {
        method: "POST",
        body: { email, password }
      });
      if (response.success) {
        token.value = response.token;
        user.value = response.user;
        if (false) ;
        return { success: true, message: response.message };
      }
      return { success: false, message: "Ошибка входа" };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.data?.message || "Ошибка при входе в систему"
      };
    }
  };
  const register = async (name, email, password) => {
    try {
      console.log("Register composable called with:", { name, email, password: password ? "[HIDDEN]" : void 0 });
      const response = await $fetch("/api/auth/register", {
        method: "POST",
        body: { name, email, password }
      });
      console.log("Registration response:", response);
      return {
        success: response.success,
        message: response.message
      };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: error.data?.message || "Ошибка при регистрации"
      };
    }
  };
  const logout = () => {
    user.value = null;
    token.value = null;
  };
  const initAuth = async () => {
  };
  const verifyEmail = async (token2) => {
    try {
      const { data } = await $fetch("/api/auth/verify-email", {
        method: "POST",
        body: { token: token2 }
      });
      return {
        success: data.success,
        message: data.message
      };
    } catch (error) {
      console.error("Email verification error:", error);
      return {
        success: false,
        message: error.data?.message || "Ошибка при верификации email"
      };
    }
  };
  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated,
    login,
    register,
    logout,
    initAuth,
    verifyEmail
  };
};

export { useAuth as u };
//# sourceMappingURL=useAuth-BXEM0gok.mjs.map
