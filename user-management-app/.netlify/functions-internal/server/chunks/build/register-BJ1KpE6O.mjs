import { _ as __nuxt_component_0 } from './nuxt-link-BXGM91AG.mjs';
import { _ as _sfc_main$5, a as _sfc_main$4 } from './Button-3VgCA0Bx.mjs';
import { _ as _sfc_main$1 } from './Card-C33EBiTu.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$2 } from './Input-BcAvFy-A.mjs';
import { _ as _sfc_main$3 } from './Checkbox-DpAVMccQ.mjs';
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
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const schema = z.object({
      name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
      email: z.string().email("Неверный формат email"),
      password: z.string().min(1, "Пароль обязателен"),
      confirmPassword: z.string().min(1, "Подтверждение пароля обязательно")
    }).refine((data) => data.password === data.confirmPassword, {
      message: "Пароли не совпадают",
      path: ["confirmPassword"]
    });
    const state = reactive({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    const loading = ref(false);
    const toast = useToast();
    const { register } = useAuth();
    const onSubmit = async (event) => {
      console.log("Form event:", event);
      console.log("Form data:", event.data);
      loading.value = true;
      try {
        const data = event.data;
        console.log("Calling register with:", { name: data.name, email: data.email, password: data.password });
        const result = await register(data.name, data.email, data.password);
        if (result.success) {
          toast.add({
            title: "Регистрация успешна!",
            description: result.message,
            color: "success"
          });
          Object.assign(state, {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
          });
          setTimeout(() => {
            navigateTo("/login");
          }, 2e3);
        } else {
          toast.add({
            title: "Ошибка регистрации",
            description: result.message,
            color: "error"
          });
        }
      } catch (error) {
        toast.add({
          title: "Ошибка",
          description: "Произошла ошибка при регистрации",
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
      const _component_UCheckbox = _sfc_main$3;
      const _component_UButton = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-layout bg-success-gradient" }, _attrs))}><nav class="universal-nav"><div class="nav-container"><div class="nav-content">`);
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
        to: "/login",
        class: "text-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Уже есть аккаунт? `);
          } else {
            return [
              createTextVNode(" Уже есть аккаунт? ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></nav><div class="page-content"><div class="centered-content"><div class="max-width-md fade-in"><div class="page-header"><div class="page-icon-container page-icon-success">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-user-plus",
        class: "page-icon success"
      }, null, _parent));
      _push(`</div><h2 class="page-title">Присоединяйтесь к нам</h2><p class="page-subtitle">Создайте свой аккаунт бесплатно</p></div>`);
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
                    label: "Полное имя",
                    name: "name",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(state).name,
                          "onUpdate:modelValue": ($event) => unref(state).name = $event,
                          type: "text",
                          placeholder: "Введите ваше имя",
                          autocomplete: "name",
                          disabled: unref(loading),
                          size: "lg",
                          icon: "i-heroicons-user",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).name,
                            "onUpdate:modelValue": ($event) => unref(state).name = $event,
                            type: "text",
                            placeholder: "Введите ваше имя",
                            autocomplete: "name",
                            disabled: unref(loading),
                            size: "lg",
                            icon: "i-heroicons-user",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
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
                          placeholder: "Придумайте надежный пароль",
                          autocomplete: "new-password",
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
                            placeholder: "Придумайте надежный пароль",
                            autocomplete: "new-password",
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
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "Подтверждение пароля",
                    name: "confirmPassword",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(state).confirmPassword,
                          "onUpdate:modelValue": ($event) => unref(state).confirmPassword = $event,
                          type: "password",
                          placeholder: "Повторите пароль",
                          autocomplete: "new-password",
                          disabled: unref(loading),
                          size: "lg",
                          icon: "i-heroicons-lock-closed",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).confirmPassword,
                            "onUpdate:modelValue": ($event) => unref(state).confirmPassword = $event,
                            type: "password",
                            placeholder: "Повторите пароль",
                            autocomplete: "new-password",
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
                  _push3(`<div class="flex items-start"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UCheckbox, { id: "agree-terms" }, null, _parent3, _scopeId2));
                  _push3(`<div class="ml-3 text-sm"${_scopeId2}><label for="agree-terms" class="text-gray-700"${_scopeId2}> Я согласен с <a href="#" class="text-link font-medium"${_scopeId2}> условиями использования </a> и <a href="#" class="text-link font-medium"${_scopeId2}> политикой конфиденциальности </a></label></div></div>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    type: "submit",
                    block: "",
                    size: "lg",
                    loading: unref(loading),
                    disabled: unref(loading),
                    class: "bg-green-600 hover:bg-green-700"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UIcon, {
                          name: "i-heroicons-user-plus",
                          class: "mr-2"
                        }, null, _parent4, _scopeId3));
                        _push4(` Создать аккаунт `);
                      } else {
                        return [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-user-plus",
                            class: "mr-2"
                          }),
                          createTextVNode(" Создать аккаунт ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UFormGroup, {
                      label: "Полное имя",
                      name: "name",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(state).name,
                          "onUpdate:modelValue": ($event) => unref(state).name = $event,
                          type: "text",
                          placeholder: "Введите ваше имя",
                          autocomplete: "name",
                          disabled: unref(loading),
                          size: "lg",
                          icon: "i-heroicons-user",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ]),
                      _: 1
                    }),
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
                          placeholder: "Придумайте надежный пароль",
                          autocomplete: "new-password",
                          disabled: unref(loading),
                          size: "lg",
                          icon: "i-heroicons-lock-closed",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormGroup, {
                      label: "Подтверждение пароля",
                      name: "confirmPassword",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(state).confirmPassword,
                          "onUpdate:modelValue": ($event) => unref(state).confirmPassword = $event,
                          type: "password",
                          placeholder: "Повторите пароль",
                          autocomplete: "new-password",
                          disabled: unref(loading),
                          size: "lg",
                          icon: "i-heroicons-lock-closed",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex items-start" }, [
                      createVNode(_component_UCheckbox, { id: "agree-terms" }),
                      createVNode("div", { class: "ml-3 text-sm" }, [
                        createVNode("label", {
                          for: "agree-terms",
                          class: "text-gray-700"
                        }, [
                          createTextVNode(" Я согласен с "),
                          createVNode("a", {
                            href: "#",
                            class: "text-link font-medium"
                          }, " условиями использования "),
                          createTextVNode(" и "),
                          createVNode("a", {
                            href: "#",
                            class: "text-link font-medium"
                          }, " политикой конфиденциальности ")
                        ])
                      ])
                    ]),
                    createVNode(_component_UButton, {
                      type: "submit",
                      block: "",
                      size: "lg",
                      loading: unref(loading),
                      disabled: unref(loading),
                      class: "bg-green-600 hover:bg-green-700"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-user-plus",
                          class: "mr-2"
                        }),
                        createTextVNode(" Создать аккаунт ")
                      ]),
                      _: 1
                    }, 8, ["loading", "disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="mt-6"${_scopeId}><div class="relative"${_scopeId}><div class="absolute inset-0 flex items-center"${_scopeId}><div class="w-full border-t border-gray-300"${_scopeId}></div></div><div class="relative flex justify-center text-sm"${_scopeId}><span class="px-2 bg-white text-gray-500"${_scopeId}>Или</span></div></div><div class="mt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/login",
              class: "w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-arrow-right-on-rectangle",
                    class: "mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` Войти в существующий аккаунт `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-right-on-rectangle",
                      class: "mr-2"
                    }),
                    createTextVNode(" Войти в существующий аккаунт ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
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
                      label: "Полное имя",
                      name: "name",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(state).name,
                          "onUpdate:modelValue": ($event) => unref(state).name = $event,
                          type: "text",
                          placeholder: "Введите ваше имя",
                          autocomplete: "name",
                          disabled: unref(loading),
                          size: "lg",
                          icon: "i-heroicons-user",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ]),
                      _: 1
                    }),
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
                          placeholder: "Придумайте надежный пароль",
                          autocomplete: "new-password",
                          disabled: unref(loading),
                          size: "lg",
                          icon: "i-heroicons-lock-closed",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormGroup, {
                      label: "Подтверждение пароля",
                      name: "confirmPassword",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(state).confirmPassword,
                          "onUpdate:modelValue": ($event) => unref(state).confirmPassword = $event,
                          type: "password",
                          placeholder: "Повторите пароль",
                          autocomplete: "new-password",
                          disabled: unref(loading),
                          size: "lg",
                          icon: "i-heroicons-lock-closed",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex items-start" }, [
                      createVNode(_component_UCheckbox, { id: "agree-terms" }),
                      createVNode("div", { class: "ml-3 text-sm" }, [
                        createVNode("label", {
                          for: "agree-terms",
                          class: "text-gray-700"
                        }, [
                          createTextVNode(" Я согласен с "),
                          createVNode("a", {
                            href: "#",
                            class: "text-link font-medium"
                          }, " условиями использования "),
                          createTextVNode(" и "),
                          createVNode("a", {
                            href: "#",
                            class: "text-link font-medium"
                          }, " политикой конфиденциальности ")
                        ])
                      ])
                    ]),
                    createVNode(_component_UButton, {
                      type: "submit",
                      block: "",
                      size: "lg",
                      loading: unref(loading),
                      disabled: unref(loading),
                      class: "bg-green-600 hover:bg-green-700"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-user-plus",
                          class: "mr-2"
                        }),
                        createTextVNode(" Создать аккаунт ")
                      ]),
                      _: 1
                    }, 8, ["loading", "disabled"])
                  ]),
                  _: 1
                }, 8, ["schema", "state"]),
                createVNode("div", { class: "mt-6" }, [
                  createVNode("div", { class: "relative" }, [
                    createVNode("div", { class: "absolute inset-0 flex items-center" }, [
                      createVNode("div", { class: "w-full border-t border-gray-300" })
                    ]),
                    createVNode("div", { class: "relative flex justify-center text-sm" }, [
                      createVNode("span", { class: "px-2 bg-white text-gray-500" }, "Или")
                    ])
                  ]),
                  createVNode("div", { class: "mt-6" }, [
                    createVNode(_component_NuxtLink, {
                      to: "/login",
                      class: "w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-arrow-right-on-rectangle",
                          class: "mr-2"
                        }),
                        createTextVNode(" Войти в существующий аккаунт ")
                      ]),
                      _: 1
                    })
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
      _push(`</div><div class="mt-8"><div class="bg-white/50 rounded-lg p-4 border border-gray-200/50"><h4 class="text-sm font-medium text-gray-900 mb-3">Преимущества аккаунта:</h4><div class="space-y-2 text-xs text-gray-600"><div class="flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-check-circle",
        class: "h-4 w-4 text-green-500 mr-2"
      }, null, _parent));
      _push(` Полный доступ к системе управления </div><div class="flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-shield-check",
        class: "h-4 w-4 text-blue-500 mr-2"
      }, null, _parent));
      _push(` Безопасность ваших данных </div><div class="flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-cog-6-tooth",
        class: "h-4 w-4 text-purple-500 mr-2"
      }, null, _parent));
      _push(` Персональные настройки </div></div></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-BJ1KpE6O.mjs.map
