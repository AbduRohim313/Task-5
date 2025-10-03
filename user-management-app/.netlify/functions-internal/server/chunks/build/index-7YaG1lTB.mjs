import { _ as _sfc_main$5, a as _sfc_main$1 } from './Button-3VgCA0Bx.mjs';
import { _ as _sfc_main$2 } from './Card-C33EBiTu.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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
import './server.mjs';
import 'vue-router';
import 'tailwindcss/colors';
import '@iconify/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import '@vueuse/core';
import 'tailwind-variants';
import './index-Dzbh7zzd.mjs';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import './nuxt-link-BXGM91AG.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$5;
      const _component_UButton = _sfc_main$1;
      const _component_UCard = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-layout bg-primary-gradient" }, _attrs))}><nav class="universal-nav sticky"><div class="nav-container"><div class="nav-content"><div class="nav-brand">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-users",
        class: "brand-icon"
      }, null, _parent));
      _push(`<span class="brand-text">UserManager</span></div><div class="nav-actions">`);
      _push(ssrRenderComponent(_component_UButton, {
        to: "/login",
        variant: "ghost",
        size: "sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Войти`);
          } else {
            return [
              createTextVNode("Войти")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        to: "/register",
        size: "sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Регистрация`);
          } else {
            return [
              createTextVNode("Регистрация")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></nav><main class="page-content"><div class="content-container py-16"><div class="text-center mb-16 fade-in"><div class="page-icon-container page-icon-primary mb-8">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-shield-check",
        class: "page-icon primary",
        style: { "height": "4rem", "width": "4rem" }
      }, null, _parent));
      _push(`</div><h1 class="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6"> Система управления <span class="text-primary-600">пользователями</span></h1><p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"> Современное веб-приложение для эффективного управления пользователями с интуитивным интерфейсом и мощными возможностями </p><div class="flex flex-col sm:flex-row gap-4 justify-center">`);
      _push(ssrRenderComponent(_component_UButton, {
        to: "/register",
        size: "lg",
        class: "px-8 py-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-user-plus",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Начать работу `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-user-plus",
                class: "mr-2"
              }),
              createTextVNode(" Начать работу ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        to: "/login",
        variant: "outline",
        size: "lg",
        class: "px-8 py-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-right-on-rectangle",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Войти в систему `);
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
      }, _parent));
      _push(`</div></div><div class="grid md:grid-cols-3 gap-8 mb-16">`);
      _push(ssrRenderComponent(_component_UCard, { class: "universal-card hover:shadow-lg transition-shadow" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-center card-padding"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-users",
              class: "mx-auto h-12 w-12 text-primary-600 mb-4"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="text-xl font-semibold text-gray-900 mb-2"${_scopeId}>Управление пользователями</h3><p class="text-gray-600"${_scopeId}>Полный CRUD для управления пользователями с сортировкой и фильтрацией</p></div>`);
          } else {
            return [
              createVNode("div", { class: "text-center card-padding" }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-users",
                  class: "mx-auto h-12 w-12 text-primary-600 mb-4"
                }),
                createVNode("h3", { class: "text-xl font-semibold text-gray-900 mb-2" }, "Управление пользователями"),
                createVNode("p", { class: "text-gray-600" }, "Полный CRUD для управления пользователями с сортировкой и фильтрацией")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, { class: "universal-card hover:shadow-lg transition-shadow" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-center card-padding"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-shield-check",
              class: "mx-auto h-12 w-12 text-green-600 mb-4"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="text-xl font-semibold text-gray-900 mb-2"${_scopeId}>Безопасность</h3><p class="text-gray-600"${_scopeId}>JWT аутентификация, хеширование паролей и защита маршрутов</p></div>`);
          } else {
            return [
              createVNode("div", { class: "text-center card-padding" }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-shield-check",
                  class: "mx-auto h-12 w-12 text-green-600 mb-4"
                }),
                createVNode("h3", { class: "text-xl font-semibold text-gray-900 mb-2" }, "Безопасность"),
                createVNode("p", { class: "text-gray-600" }, "JWT аутентификация, хеширование паролей и защита маршрутов")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, { class: "universal-card hover:shadow-lg transition-shadow" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-center card-padding"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-envelope",
              class: "mx-auto h-12 w-12 text-blue-600 mb-4"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="text-xl font-semibold text-gray-900 mb-2"${_scopeId}>Email верификация</h3><p class="text-gray-600"${_scopeId}>Автоматическая отправка писем для подтверждения аккаунтов</p></div>`);
          } else {
            return [
              createVNode("div", { class: "text-center card-padding" }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-envelope",
                  class: "mx-auto h-12 w-12 text-blue-600 mb-4"
                }),
                createVNode("h3", { class: "text-xl font-semibold text-gray-900 mb-2" }, "Email верификация"),
                createVNode("p", { class: "text-gray-600" }, "Автоматическая отправка писем для подтверждения аккаунтов")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="text-center"><h2 class="text-3xl font-bold text-gray-900 mb-8">Современные технологии</h2><div class="grid grid-cols-2 md:grid-cols-4 gap-6"><div class="flex flex-col items-center p-4"><div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2"><span class="text-green-600 font-bold">N4</span></div><span class="text-sm font-medium text-gray-900">Nuxt 4</span></div><div class="flex flex-col items-center p-4"><div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2"><span class="text-blue-600 font-bold">UI</span></div><span class="text-sm font-medium text-gray-900">Nuxt UI</span></div><div class="flex flex-col items-center p-4"><div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2"><span class="text-purple-600 font-bold">P</span></div><span class="text-sm font-medium text-gray-900">Prisma</span></div><div class="flex flex-col items-center p-4"><div class="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-2"><span class="text-cyan-600 font-bold">TS</span></div><span class="text-sm font-medium text-gray-900">TypeScript</span></div></div></div></div></main><footer class="bg-white border-t border-gray-200 mt-16"><div class="content-container py-8"><div class="text-center text-gray-600"><p>© 2025 UserManager. Создано с помощью Nuxt 4 и Nuxt UI.</p></div></div></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-7YaG1lTB.mjs.map
