import { _ as __nuxt_component_0 } from './nuxt-link-BXGM91AG.mjs';
import { _ as _sfc_main$5, a as _sfc_main$3 } from './Button-3VgCA0Bx.mjs';
import { _ as _sfc_main$1 } from './Card-C33EBiTu.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$2 } from './Input-BcAvFy-A.mjs';
import { defineComponent, reactive, ref, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { z } from 'zod';
import { u as useAuth } from './useAuth-BXEM0gok.mjs';
import { u as useToast } from './useToast-DFecy48D.mjs';
import { n as navigateTo } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@iconify/utils';
import 'consola';
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import './index-Dzbh7zzd.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import 'vue-router';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const schema = z.object({
      email: z.string().email("Неверный формат email"),
      password: z.string().min(1, "Пароль обязателен")
    });
    const state = reactive({
      email: "",
      password: ""
    });
    const loading = ref(false);
    const toast = useToast();
    const { login } = useAuth();
    const onSubmit = async (event) => {
      loading.value = true;
      try {
        const data = event.data;
        const result = await login(data.email, data.password);
        if (result.success) {
          toast.add({
            title: "Успешно!",
            description: result.message,
            color: "success"
          });
          await navigateTo("/admin");
        } else {
          toast.add({
            title: "Ошибка входа",
            description: result.message,
            color: "error"
          });
        }
      } catch (error) {
        toast.add({
          title: "Ошибка",
          description: "Произошла ошибка при входе в систему",
          color: "error"
        });
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UIcon = _sfc_main$5;
      const _component_UCard = _sfc_main$1;
      const _component_UForm = _sfc_main$1$1;
      const _component_UFormGroup = resolveComponent("UFormGroup");
      const _component_UInput = _sfc_main$2;
      const _component_UButton = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-layout bg-primary-gradient" }, _attrs))}><nav class="universal-nav"><div class="nav-container"><div class="nav-content">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "nav-brand"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-users",
              class: "brand-icon"
            }, null, _parent2, _scopeId));
            _push2(`<span class="brand-text"${_scopeId}>UserManager</span>`);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-users",
                class: "brand-icon"
              }),
              createVNode("span", { class: "brand-text" }, "UserManager")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/register",
        class: "text-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Нужен аккаунт? `);
          } else {
            return [
              createTextVNode(" Нужен аккаунт? ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></nav><div class="page-content"><div class="centered-content"><div class="max-width-md fade-in"><div class="page-header"><div class="page-icon-container page-icon-primary">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-arrow-right-on-rectangle",
        class: "page-icon primary"
      }, null, _parent));
      _push(`</div><h2 class="page-title">Добро пожаловать</h2><p class="page-subtitle">Войдите в свой аккаунт</p></div>`);
      _push(ssrRenderComponent(_component_UCard, { class: "universal-card" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card-padding"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UForm, {
              schema: unref(schema),
              state: unref(state),
              onSubmit,
              class: "form-container"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "Email адрес",
                    name: "email",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(state).email,
                          "onUpdate:modelValue": ($event) => unref(state).email = $event,
                          type: "email",
                          placeholder: "your@email.com",
                          autocomplete: "email",
                          disabled: unref(loading),
                          size: "lg",
                          icon: "i-heroicons-envelope",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).email,
                            "onUpdate:modelValue": ($event) => unref(state).email = $event,
                            type: "email",
                            placeholder: "your@email.com",
                            autocomplete: "email",
                            disabled: unref(loading),
                            size: "lg",
                            icon: "i-heroicons-envelope",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "Пароль",
                    name: "password",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(state).password,
                          "onUpdate:modelValue": ($event) => unref(state).password = $event,
                          type: "password",
                          placeholder: "Введите пароль",
                          autocomplete: "current-password",
                          disabled: unref(loading),
                          size: "lg",
                          icon: "i-heroicons-lock-closed",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).password,
                            "onUpdate:modelValue": ($event) => unref(state).password = $event,
                            type: "password",
                            placeholder: "Введите пароль",
                            autocomplete: "current-password",
                            disabled: unref(loading),
                            size: "lg",
                            icon: "i-heroicons-lock-closed",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UButton, {
                    type: "submit",
                    block: "",
                    size: "lg",
                    loading: unref(loading),
                    disabled: unref(loading),
                    class: "bg-primary-600 hover:bg-primary-700"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UIcon, {
                          name: "i-heroicons-arrow-right-on-rectangle",
                          class: "mr-2"
                        }, null, _parent4, _scopeId3));
                        _push4(` Войти в систему `);
                      } else {
                        return [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-arrow-right-on-rectangle",
                            class: "mr-2"
                          }),
                          createTextVNode(" Войти в систему ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UFormGroup, {
                      label: "Email адрес",
                      name: "email",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(state).email,
                          "onUpdate:modelValue": ($event) => unref(state).email = $event,
                          type: "email",
                          placeholder: "your@email.com",
                          autocomplete: "email",
                          disabled: unref(loading),
                          size: "lg",
                          icon: "i-heroicons-envelope",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormGroup, {
                      label: "Пароль",
                      name: "password",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(state).password,
                          "onUpdate:modelValue": ($event) => unref(state).password = $event,
                          type: "password",
                          placeholder: "Введите пароль",
                          autocomplete: "current-password",
                          disabled: unref(loading),
                          size: "lg",
                          icon: "i-heroicons-lock-closed",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UButton, {
                      type: "submit",
                      block: "",
                      size: "lg",
                      loading: unref(loading),
                      disabled: unref(loading),
                      class: "bg-primary-600 hover:bg-primary-700"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-arrow-right-on-rectangle",
                          class: "mr-2"
                        }),
                        createTextVNode(" Войти в систему ")
                      ]),
                      _: 1
                    }, 8, ["loading", "disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="mt-6 space-y-4"${_scopeId}><div class="text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/register",
              class: "text-link font-medium"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Нет аккаунта? Зарегистрируйтесь `);
                } else {
                  return [
                    createTextVNode(" Нет аккаунта? Зарегистрируйтесь ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="bg-gray-50 rounded-lg p-4"${_scopeId}><h4 class="text-sm font-medium text-gray-900 mb-2"${_scopeId}>Демо доступ:</h4><div class="text-xs text-gray-600 space-y-1"${_scopeId}><div${_scopeId}>Email: admin@example.com</div><div${_scopeId}>Пароль: admin123</div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "card-padding" }, [
                createVNode(_component_UForm, {
                  schema: unref(schema),
                  state: unref(state),
                  onSubmit,
                  class: "form-container"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UFormGroup, {
                      label: "Email адрес",
                      name: "email",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(state).email,
                          "onUpdate:modelValue": ($event) => unref(state).email = $event,
                          type: "email",
                          placeholder: "your@email.com",
                          autocomplete: "email",
                          disabled: unref(loading),
                          size: "lg",
                          icon: "i-heroicons-envelope",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormGroup, {
                      label: "Пароль",
                      name: "password",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(state).password,
                          "onUpdate:modelValue": ($event) => unref(state).password = $event,
                          type: "password",
                          placeholder: "Введите пароль",
                          autocomplete: "current-password",
                          disabled: unref(loading),
                          size: "lg",
                          icon: "i-heroicons-lock-closed",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UButton, {
                      type: "submit",
                      block: "",
                      size: "lg",
                      loading: unref(loading),
                      disabled: unref(loading),
                      class: "bg-primary-600 hover:bg-primary-700"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-arrow-right-on-rectangle",
                          class: "mr-2"
                        }),
                        createTextVNode(" Войти в систему ")
                      ]),
                      _: 1
                    }, 8, ["loading", "disabled"])
                  ]),
                  _: 1
                }, 8, ["schema", "state"]),
                createVNode("div", { class: "mt-6 space-y-4" }, [
                  createVNode("div", { class: "text-center" }, [
                    createVNode(_component_NuxtLink, {
                      to: "/register",
                      class: "text-link font-medium"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Нет аккаунта? Зарегистрируйтесь ")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "bg-gray-50 rounded-lg p-4" }, [
                    createVNode("h4", { class: "text-sm font-medium text-gray-900 mb-2" }, "Демо доступ:"),
                    createVNode("div", { class: "text-xs text-gray-600 space-y-1" }, [
                      createVNode("div", null, "Email: admin@example.com"),
                      createVNode("div", null, "Пароль: admin123")
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="text-center mt-6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "inline-flex items-center text-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-left",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Вернуться на главную `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-left",
                class: "mr-2"
              }),
              createTextVNode(" Вернуться на главную ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-DOJHQO-U.mjs.map
