import { _ as __nuxt_component_0 } from './nuxt-link-BXGM91AG.mjs';
import { _ as _sfc_main$5, a as _sfc_main$2 } from './Button-3VgCA0Bx.mjs';
import { _ as _sfc_main$1 } from './Card-C33EBiTu.mjs';
import { defineComponent, ref, mergeProps, withCtx, createVNode, createTextVNode, unref, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-BXEM0gok.mjs';
import { c as useRoute } from './server.mjs';
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
  __name: "verify-email",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(true);
    const success = ref(false);
    const message = ref("");
    useAuth();
    useRoute();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UIcon = _sfc_main$5;
      const _component_UCard = _sfc_main$1;
      const _component_UButton = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-layout bg-info-gradient" }, _attrs))}><nav class="universal-nav"><div class="nav-container"><div class="nav-content">`);
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
      _push(`<div class="nav-actions gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Вход `);
          } else {
            return [
              createTextVNode(" Вход ")
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
            _push2(` Регистрация `);
          } else {
            return [
              createTextVNode(" Регистрация ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></nav><div class="page-content"><div class="centered-content"><div class="max-width-md fade-in">`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_UCard, { class: "universal-card text-center" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="card-padding space-y-6"${_scopeId}><div class="page-icon-container page-icon-info"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-envelope",
                class: "page-icon info loading-spinner"
              }, null, _parent2, _scopeId));
              _push2(`</div><div${_scopeId}><h2 class="page-title"${_scopeId}> Подтверждение email </h2><p class="page-subtitle"${_scopeId}> Проверяем ваш токен верификации... </p></div><div class="flex justify-center"${_scopeId}><div class="loading-spinner rounded-full h-8 w-8 border-b-2 border-blue-600"${_scopeId}></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "card-padding space-y-6" }, [
                  createVNode("div", { class: "page-icon-container page-icon-info" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-envelope",
                      class: "page-icon info loading-spinner"
                    })
                  ]),
                  createVNode("div", null, [
                    createVNode("h2", { class: "page-title" }, " Подтверждение email "),
                    createVNode("p", { class: "page-subtitle" }, " Проверяем ваш токен верификации... ")
                  ]),
                  createVNode("div", { class: "flex justify-center" }, [
                    createVNode("div", { class: "loading-spinner rounded-full h-8 w-8 border-b-2 border-blue-600" })
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (unref(success)) {
        _push(ssrRenderComponent(_component_UCard, { class: "universal-card text-center" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="card-padding space-y-6"${_scopeId}><div class="page-icon-container page-icon-success"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-check-circle",
                class: "page-icon success"
              }, null, _parent2, _scopeId));
              _push2(`</div><div${_scopeId}><h2 class="page-title"${_scopeId}> Email успешно подтвержден! </h2><p class="page-subtitle"${_scopeId}>${ssrInterpolate(unref(message))}</p></div><div class="space-y-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: ($event) => _ctx.$router.push("/login"),
                block: "",
                size: "lg",
                class: "bg-green-600 hover:bg-green-700"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-arrow-right-on-rectangle",
                      class: "mr-2"
                    }, null, _parent3, _scopeId2));
                    _push3(` Войти в систему `);
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
              }, _parent2, _scopeId));
              _push2(`<div class="text-sm text-gray-500"${_scopeId}> Теперь вы можете войти в свой аккаунт </div></div><div class="bg-green-50 border border-green-200 rounded-lg p-4"${_scopeId}><div class="flex items-start"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-information-circle",
                class: "h-5 w-5 text-green-600 mt-0.5 mr-3"
              }, null, _parent2, _scopeId));
              _push2(`<div class="text-sm text-green-800"${_scopeId}><strong${_scopeId}>Что дальше?</strong><br${_scopeId}> Используйте ваш email и пароль для входа в систему управления пользователями. </div></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "card-padding space-y-6" }, [
                  createVNode("div", { class: "page-icon-container page-icon-success" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-check-circle",
                      class: "page-icon success"
                    })
                  ]),
                  createVNode("div", null, [
                    createVNode("h2", { class: "page-title" }, " Email успешно подтвержден! "),
                    createVNode("p", { class: "page-subtitle" }, toDisplayString(unref(message)), 1)
                  ]),
                  createVNode("div", { class: "space-y-3" }, [
                    createVNode(_component_UButton, {
                      onClick: ($event) => _ctx.$router.push("/login"),
                      block: "",
                      size: "lg",
                      class: "bg-green-600 hover:bg-green-700"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-arrow-right-on-rectangle",
                          class: "mr-2"
                        }),
                        createTextVNode(" Войти в систему ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode("div", { class: "text-sm text-gray-500" }, " Теперь вы можете войти в свой аккаунт ")
                  ]),
                  createVNode("div", { class: "bg-green-50 border border-green-200 rounded-lg p-4" }, [
                    createVNode("div", { class: "flex items-start" }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-information-circle",
                        class: "h-5 w-5 text-green-600 mt-0.5 mr-3"
                      }),
                      createVNode("div", { class: "text-sm text-green-800" }, [
                        createVNode("strong", null, "Что дальше?"),
                        createVNode("br"),
                        createTextVNode(" Используйте ваш email и пароль для входа в систему управления пользователями. ")
                      ])
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_UCard, { class: "universal-card text-center" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="card-padding space-y-6"${_scopeId}><div class="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-exclamation-triangle",
                class: "h-8 w-8 text-red-600"
              }, null, _parent2, _scopeId));
              _push2(`</div><div${_scopeId}><h2 class="page-title"${_scopeId}> Ошибка верификации </h2><p class="text-red-600"${_scopeId}>${ssrInterpolate(unref(message))}</p></div><div class="space-y-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: ($event) => _ctx.$router.push("/register"),
                block: "",
                size: "lg",
                class: "bg-red-600 hover:bg-red-700"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-user-plus",
                      class: "mr-2"
                    }, null, _parent3, _scopeId2));
                    _push3(` Зарегистрироваться заново `);
                  } else {
                    return [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-user-plus",
                        class: "mr-2"
                      }),
                      createTextVNode(" Зарегистрироваться заново ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: ($event) => _ctx.$router.push("/login"),
                block: "",
                size: "lg",
                variant: "outline"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-arrow-right-on-rectangle",
                      class: "mr-2"
                    }, null, _parent3, _scopeId2));
                    _push3(` Попробовать войти `);
                  } else {
                    return [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-arrow-right-on-rectangle",
                        class: "mr-2"
                      }),
                      createTextVNode(" Попробовать войти ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="bg-red-50 border border-red-200 rounded-lg p-4"${_scopeId}><div class="flex items-start"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-light-bulb",
                class: "h-5 w-5 text-red-600 mt-0.5 mr-3"
              }, null, _parent2, _scopeId));
              _push2(`<div class="text-sm text-red-800"${_scopeId}><strong${_scopeId}>Возможные причины:</strong><br${_scopeId}> • Ссылка устарела или уже была использована<br${_scopeId}> • Неверный токен верификации<br${_scopeId}> • Проблемы с сетевым соединением </div></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "card-padding space-y-6" }, [
                  createVNode("div", { class: "mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-exclamation-triangle",
                      class: "h-8 w-8 text-red-600"
                    })
                  ]),
                  createVNode("div", null, [
                    createVNode("h2", { class: "page-title" }, " Ошибка верификации "),
                    createVNode("p", { class: "text-red-600" }, toDisplayString(unref(message)), 1)
                  ]),
                  createVNode("div", { class: "space-y-3" }, [
                    createVNode(_component_UButton, {
                      onClick: ($event) => _ctx.$router.push("/register"),
                      block: "",
                      size: "lg",
                      class: "bg-red-600 hover:bg-red-700"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-user-plus",
                          class: "mr-2"
                        }),
                        createTextVNode(" Зарегистрироваться заново ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_UButton, {
                      onClick: ($event) => _ctx.$router.push("/login"),
                      block: "",
                      size: "lg",
                      variant: "outline"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-arrow-right-on-rectangle",
                          class: "mr-2"
                        }),
                        createTextVNode(" Попробовать войти ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  createVNode("div", { class: "bg-red-50 border border-red-200 rounded-lg p-4" }, [
                    createVNode("div", { class: "flex items-start" }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-light-bulb",
                        class: "h-5 w-5 text-red-600 mt-0.5 mr-3"
                      }),
                      createVNode("div", { class: "text-sm text-red-800" }, [
                        createVNode("strong", null, "Возможные причины:"),
                        createVNode("br"),
                        createTextVNode(" • Ссылка устарела или уже была использована"),
                        createVNode("br"),
                        createTextVNode(" • Неверный токен верификации"),
                        createVNode("br"),
                        createTextVNode(" • Проблемы с сетевым соединением ")
                      ])
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      }
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/verify-email.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=verify-email-DcP-wPW9.mjs.map
