import { _ as _sfc_main$5, a as _sfc_main$1 } from './Button-3VgCA0Bx.mjs';
import { _ as _sfc_main$2 } from './Card-C33EBiTu.mjs';
import { _ as _sfc_main$3 } from './Checkbox-DpAVMccQ.mjs';
import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, isRef, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-BXEM0gok.mjs';
import { u as useToast } from './useToast-DFecy48D.mjs';
import { _ as _export_sfc } from './server.mjs';
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
import './nuxt-link-BXGM91AG.mjs';
import 'vue-router';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const users = ref([]);
    const selectedUsers = ref([]);
    const selectAll = ref(false);
    const loading = ref(false);
    const currentSort = ref("lastLoginAt");
    const sortOrder = ref("desc");
    const stats = computed(() => ({
      total: users.value.length,
      active: users.value.filter((u) => u.status === "ACTIVE").length,
      blocked: users.value.filter((u) => u.status === "BLOCKED").length,
      unverified: users.value.filter((u) => u.status === "UNVERIFIED").length
    }));
    const toast = useToast();
    const { logout } = useAuth();
    const fetchUsers = async () => {
      loading.value = true;
      try {
        const token = localStorage.getItem("auth-token");
        const response = await $fetch("/api/users", {
          query: {
            sortBy: currentSort.value,
            sortOrder: sortOrder.value
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.success) {
          users.value = response.users;
        }
      } catch (error) {
        toast.add({
          title: "Ошибка",
          description: "Не удалось загрузить список пользователей",
          color: "error"
        });
      } finally {
        loading.value = false;
      }
    };
    const refreshUsers = () => {
      fetchUsers();
    };
    const sortBy = (field) => {
      if (currentSort.value === field) {
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
      } else {
        currentSort.value = field;
        sortOrder.value = "desc";
      }
      fetchUsers();
    };
    const toggleSelectAll = () => {
      if (selectAll.value) {
        selectedUsers.value = users.value.map((u) => u.id);
      } else {
        selectedUsers.value = [];
      }
    };
    watch(selectedUsers, () => {
      selectAll.value = selectedUsers.value.length === users.value.length && users.value.length > 0;
    }, { deep: true });
    const manageUsers = async (action) => {
      if (selectedUsers.value.length === 0 && action !== "delete-unverified") return;
      loading.value = true;
      try {
        const token = localStorage.getItem("auth-token");
        let response;
        if (action === "delete-unverified") {
          response = await $fetch("/api/users/delete-unverified", {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        } else {
          response = await $fetch("/api/users/manage", {
            method: "POST",
            body: {
              userIds: selectedUsers.value,
              action
            },
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        }
        if (response.success) {
          toast.add({
            title: "Успешно!",
            description: response.message,
            color: "success"
          });
          selectedUsers.value = [];
          selectAll.value = false;
          await fetchUsers();
        }
      } catch (error) {
        toast.add({
          title: "Ошибка",
          description: error.data?.message || "Произошла ошибка",
          color: "error"
        });
      } finally {
        loading.value = false;
      }
    };
    const blockUsers = () => manageUsers("block");
    const unblockUsers = () => manageUsers("unblock");
    const deleteUsers = () => manageUsers("delete");
    const deleteUnverifiedUsers = () => manageUsers("delete-unverified");
    const getStatusClass = (status) => {
      const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
      switch (status) {
        case "ACTIVE":
          return `${baseClasses} bg-green-100 text-green-800`;
        case "BLOCKED":
          return `${baseClasses} bg-red-100 text-red-800`;
        case "UNVERIFIED":
          return `${baseClasses} bg-yellow-100 text-yellow-800`;
        default:
          return `${baseClasses} bg-gray-100 text-gray-800`;
      }
    };
    const getStatusText = (status) => {
      switch (status) {
        case "ACTIVE":
          return "Активен";
        case "BLOCKED":
          return "Заблокирован";
        case "UNVERIFIED":
          return "Не подтвержден";
        default:
          return status;
      }
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString("ru-RU");
    };
    const formatRelativeTime = (dateString) => {
      const date = new Date(dateString);
      const now = /* @__PURE__ */ new Date();
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1e3 * 60 * 60));
      if (diffInHours < 1) return "Менее часа назад";
      if (diffInHours < 24) return `${diffInHours} ч. назад`;
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) return `${diffInDays} дн. назад`;
      return formatDate(dateString).split(",")[0];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$5;
      const _component_UButton = _sfc_main$1;
      const _component_UCard = _sfc_main$2;
      const _component_UCheckbox = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-layout bg-admin-layout" }, _attrs))} data-v-0492e637><nav class="bg-white shadow-sm border-b border-gray-200" data-v-0492e637><div class="nav-container" data-v-0492e637><div class="nav-content" data-v-0492e637><div class="flex items-center" data-v-0492e637><div class="nav-brand" data-v-0492e637>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-users",
        class: "brand-icon"
      }, null, _parent));
      _push(`<span class="brand-text" data-v-0492e637>UserManager</span></div><div class="hidden md:block ml-8" data-v-0492e637><span class="text-gray-500" data-v-0492e637>Панель администратора</span></div></div><div class="nav-actions" data-v-0492e637>`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "ghost",
        icon: "i-heroicons-bell",
        size: "sm"
      }, null, _parent));
      _push(`<div class="flex items-center space-x-3" data-v-0492e637><div class="hidden md:block text-right" data-v-0492e637><p class="text-sm font-medium text-gray-900" data-v-0492e637>Администратор</p><p class="text-xs text-gray-500" data-v-0492e637>admin@example.com</p></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        onClick: unref(logout),
        variant: "ghost",
        icon: "i-heroicons-arrow-right-on-rectangle",
        size: "sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Выйти `);
          } else {
            return [
              createTextVNode(" Выйти ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></nav><div class="page-content" data-v-0492e637><div class="content-container py-6" data-v-0492e637><div class="mb-8" data-v-0492e637><div class="md:flex md:items-center md:justify-between" data-v-0492e637><div class="min-w-0 flex-1" data-v-0492e637><h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate" data-v-0492e637> Управление пользователями </h1><div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6" data-v-0492e637><div class="mt-2 flex items-center text-sm text-gray-500" data-v-0492e637>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-calendar",
        class: "flex-shrink-0 mr-1.5 h-4 w-4"
      }, null, _parent));
      _push(` Последнее обновление: ${ssrInterpolate((/* @__PURE__ */ new Date()).toLocaleDateString("ru-RU"))}</div></div></div></div><div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-6" data-v-0492e637>`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-0492e637${_scopeId}><div class="flex-shrink-0" data-v-0492e637${_scopeId}><div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center" data-v-0492e637${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-users",
              class: "h-5 w-5 text-blue-600"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="ml-4" data-v-0492e637${_scopeId}><p class="text-sm font-medium text-gray-500" data-v-0492e637${_scopeId}>Всего пользователей</p><p class="text-2xl font-semibold text-gray-200" data-v-0492e637${_scopeId}>${ssrInterpolate(unref(stats).total)}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode("div", { class: "flex-shrink-0" }, [
                  createVNode("div", { class: "w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-users",
                      class: "h-5 w-5 text-blue-600"
                    })
                  ])
                ]),
                createVNode("div", { class: "ml-4" }, [
                  createVNode("p", { class: "text-sm font-medium text-gray-500" }, "Всего пользователей"),
                  createVNode("p", { class: "text-2xl font-semibold text-gray-200" }, toDisplayString(unref(stats).total), 1)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-0492e637${_scopeId}><div class="flex-shrink-0" data-v-0492e637${_scopeId}><div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center" data-v-0492e637${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-check-circle",
              class: "h-5 w-5 text-green-600"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="ml-4" data-v-0492e637${_scopeId}><p class="text-sm font-medium text-gray-500" data-v-0492e637${_scopeId}>Активные</p><p class="text-2xl font-semibold text-gray-200" data-v-0492e637${_scopeId}>${ssrInterpolate(unref(stats).active)}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode("div", { class: "flex-shrink-0" }, [
                  createVNode("div", { class: "w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-check-circle",
                      class: "h-5 w-5 text-green-600"
                    })
                  ])
                ]),
                createVNode("div", { class: "ml-4" }, [
                  createVNode("p", { class: "text-sm font-medium text-gray-500" }, "Активные"),
                  createVNode("p", { class: "text-2xl font-semibold text-gray-200" }, toDisplayString(unref(stats).active), 1)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-0492e637${_scopeId}><div class="flex-shrink-0" data-v-0492e637${_scopeId}><div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center" data-v-0492e637${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-no-symbol",
              class: "h-5 w-5 text-red-600"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="ml-4" data-v-0492e637${_scopeId}><p class="text-sm font-medium text-gray-500" data-v-0492e637${_scopeId}>Заблокированные</p><p class="text-2xl font-semibold text-gray-200" data-v-0492e637${_scopeId}>${ssrInterpolate(unref(stats).blocked)}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode("div", { class: "flex-shrink-0" }, [
                  createVNode("div", { class: "w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-no-symbol",
                      class: "h-5 w-5 text-red-600"
                    })
                  ])
                ]),
                createVNode("div", { class: "ml-4" }, [
                  createVNode("p", { class: "text-sm font-medium text-gray-500" }, "Заблокированные"),
                  createVNode("p", { class: "text-2xl font-semibold text-gray-200" }, toDisplayString(unref(stats).blocked), 1)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-0492e637${_scopeId}><div class="flex-shrink-0" data-v-0492e637${_scopeId}><div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center" data-v-0492e637${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-exclamation-triangle",
              class: "h-5 w-5 text-yellow-600"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="ml-4" data-v-0492e637${_scopeId}><p class="text-sm font-medium text-gray-500" data-v-0492e637${_scopeId}>Неподтвержденные</p><p class="text-2xl font-semibold text-gray-200" data-v-0492e637${_scopeId}>${ssrInterpolate(unref(stats).unverified)}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode("div", { class: "flex-shrink-0" }, [
                  createVNode("div", { class: "w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-exclamation-triangle",
                      class: "h-5 w-5 text-yellow-600"
                    })
                  ])
                ]),
                createVNode("div", { class: "ml-4" }, [
                  createVNode("p", { class: "text-sm font-medium text-gray-500" }, "Неподтвержденные"),
                  createVNode("p", { class: "text-2xl font-semibold text-gray-200" }, toDisplayString(unref(stats).unverified), 1)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between" data-v-0492e637${_scopeId}><h3 class="text-lg font-medium text-gray-900" data-v-0492e637${_scopeId}>Список пользователей</h3><div class="flex items-center space-x-3" data-v-0492e637${_scopeId}>`);
            if (unref(selectedUsers).length > 0) {
              _push2(`<div class="flex items-center space-x-2" data-v-0492e637${_scopeId}><span class="text-sm text-gray-600" data-v-0492e637${_scopeId}> Выбрано: ${ssrInterpolate(unref(selectedUsers).length)}</span>`);
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: blockUsers,
                disabled: unref(loading),
                color: "error",
                variant: "soft",
                size: "sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-no-symbol",
                      class: "mr-1"
                    }, null, _parent3, _scopeId2));
                    _push3(` Заблокировать `);
                  } else {
                    return [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-no-symbol",
                        class: "mr-1"
                      }),
                      createTextVNode(" Заблокировать ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: unblockUsers,
                disabled: unref(loading),
                color: "success",
                variant: "soft",
                size: "sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-lock-open",
                      class: "mr-1"
                    }, null, _parent3, _scopeId2));
                    _push3(` Разблокировать `);
                  } else {
                    return [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-lock-open",
                        class: "mr-1"
                      }),
                      createTextVNode(" Разблокировать ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: deleteUsers,
                disabled: unref(loading),
                color: "error",
                variant: "outline",
                size: "sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-trash",
                      class: "mr-1"
                    }, null, _parent3, _scopeId2));
                    _push3(` Удалить `);
                  } else {
                    return [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-trash",
                        class: "mr-1"
                      }),
                      createTextVNode(" Удалить ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_UButton, {
              onClick: deleteUnverifiedUsers,
              disabled: unref(loading),
              color: "warning",
              variant: "soft",
              size: "sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-user-minus",
                    class: "mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` Очистить неподтвержденных `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-user-minus",
                      class: "mr-1"
                    }),
                    createTextVNode(" Очистить неподтвержденных ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              onClick: refreshUsers,
              disabled: unref(loading),
              variant: "outline",
              size: "sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-arrow-path",
                    class: "mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` Обновить `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-path",
                      class: "mr-1"
                    }),
                    createTextVNode(" Обновить ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between" }, [
                createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "Список пользователей"),
                createVNode("div", { class: "flex items-center space-x-3" }, [
                  unref(selectedUsers).length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex items-center space-x-2"
                  }, [
                    createVNode("span", { class: "text-sm text-gray-600" }, " Выбрано: " + toDisplayString(unref(selectedUsers).length), 1),
                    createVNode(_component_UButton, {
                      onClick: blockUsers,
                      disabled: unref(loading),
                      color: "error",
                      variant: "soft",
                      size: "sm"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-no-symbol",
                          class: "mr-1"
                        }),
                        createTextVNode(" Заблокировать ")
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(_component_UButton, {
                      onClick: unblockUsers,
                      disabled: unref(loading),
                      color: "success",
                      variant: "soft",
                      size: "sm"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-lock-open",
                          class: "mr-1"
                        }),
                        createTextVNode(" Разблокировать ")
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(_component_UButton, {
                      onClick: deleteUsers,
                      disabled: unref(loading),
                      color: "error",
                      variant: "outline",
                      size: "sm"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-trash",
                          class: "mr-1"
                        }),
                        createTextVNode(" Удалить ")
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ])) : createCommentVNode("", true),
                  createVNode(_component_UButton, {
                    onClick: deleteUnverifiedUsers,
                    disabled: unref(loading),
                    color: "warning",
                    variant: "soft",
                    size: "sm"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-user-minus",
                        class: "mr-1"
                      }),
                      createTextVNode(" Очистить неподтвержденных ")
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode(_component_UButton, {
                    onClick: refreshUsers,
                    disabled: unref(loading),
                    variant: "outline",
                    size: "sm"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-arrow-path",
                        class: "mr-1"
                      }),
                      createTextVNode(" Обновить ")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="overflow-hidden" data-v-0492e637${_scopeId}><div class="overflow-x-auto" data-v-0492e637${_scopeId}><table class="min-w-full divide-y divide-gray-200" data-v-0492e637${_scopeId}><thead class="bg-gray-50" data-v-0492e637${_scopeId}><tr data-v-0492e637${_scopeId}><th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8" data-v-0492e637${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UCheckbox, {
              modelValue: unref(selectAll),
              "onUpdate:modelValue": ($event) => isRef(selectAll) ? selectAll.value = $event : null,
              onChange: toggleSelectAll,
              disabled: unref(loading)
            }, null, _parent2, _scopeId));
            _push2(`</th><th scope="col" class="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100" data-v-0492e637${_scopeId}><div class="flex items-center space-x-1" data-v-0492e637${_scopeId}><span data-v-0492e637${_scopeId}>Имя</span>`);
            if (unref(currentSort) === "name") {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: unref(sortOrder) === "asc" ? "i-heroicons-chevron-up" : "i-heroicons-chevron-down",
                class: "w-4 h-4 text-gray-400"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></th><th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100" data-v-0492e637${_scopeId}><div class="flex items-center space-x-1" data-v-0492e637${_scopeId}><span data-v-0492e637${_scopeId}>Email</span>`);
            if (unref(currentSort) === "email") {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: unref(sortOrder) === "asc" ? "i-heroicons-chevron-up" : "i-heroicons-chevron-down",
                class: "w-4 h-4 text-gray-400"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></th><th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100" data-v-0492e637${_scopeId}><div class="flex items-center space-x-1" data-v-0492e637${_scopeId}><span data-v-0492e637${_scopeId}>Последний вход</span>`);
            if (unref(currentSort) === "lastLoginAt") {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: unref(sortOrder) === "asc" ? "i-heroicons-chevron-up" : "i-heroicons-chevron-down",
                class: "w-4 h-4 text-gray-400"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></th><th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100" data-v-0492e637${_scopeId}><div class="flex items-center space-x-1" data-v-0492e637${_scopeId}><span data-v-0492e637${_scopeId}>Регистрация</span>`);
            if (unref(currentSort) === "registrationTime") {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: unref(sortOrder) === "asc" ? "i-heroicons-chevron-up" : "i-heroicons-chevron-down",
                class: "w-4 h-4 text-gray-400"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></th><th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100" data-v-0492e637${_scopeId}><div class="flex items-center space-x-1" data-v-0492e637${_scopeId}><span data-v-0492e637${_scopeId}>Статус</span>`);
            if (unref(currentSort) === "status") {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: unref(sortOrder) === "asc" ? "i-heroicons-chevron-up" : "i-heroicons-chevron-down",
                class: "w-4 h-4 text-gray-400"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></th></tr></thead><tbody class="divide-y divide-gray-200 bg-white" data-v-0492e637${_scopeId}><!--[-->`);
            ssrRenderList(unref(users), (user) => {
              _push2(`<tr class="${ssrRenderClass([{ "bg-blue-50": unref(selectedUsers).includes(user.id) }, "hover:bg-gray-50"])}" data-v-0492e637${_scopeId}><td class="relative w-12 px-6 sm:w-16 sm:px-8" data-v-0492e637${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UCheckbox, {
                "model-value": unref(selectedUsers).includes(user.id),
                "onUpdate:modelValue": (checked) => {
                  if (checked) {
                    unref(selectedUsers).push(user.id);
                  } else {
                    const index = unref(selectedUsers).indexOf(user.id);
                    if (index > -1) unref(selectedUsers).splice(index, 1);
                  }
                },
                disabled: unref(loading)
              }, null, _parent2, _scopeId));
              _push2(`</td><td class="whitespace-nowrap py-4 pr-3 text-sm" data-v-0492e637${_scopeId}><div class="flex items-center" data-v-0492e637${_scopeId}><div class="h-10 w-10 flex-shrink-0" data-v-0492e637${_scopeId}><div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center" data-v-0492e637${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-user",
                class: "h-5 w-5 text-gray-500"
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="ml-4" data-v-0492e637${_scopeId}><div class="font-medium text-gray-900" data-v-0492e637${_scopeId}>${ssrInterpolate(user.name)}</div></div></div></td><td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500" data-v-0492e637${_scopeId}>${ssrInterpolate(user.email)}</td><td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500" data-v-0492e637${_scopeId}>`);
              if (user.lastLoginAt) {
                _push2(`<span${ssrRenderAttr("title", formatDate(user.lastLoginAt))} data-v-0492e637${_scopeId}>${ssrInterpolate(formatRelativeTime(user.lastLoginAt))}</span>`);
              } else {
                _push2(`<span class="text-gray-400" data-v-0492e637${_scopeId}> Никогда </span>`);
              }
              _push2(`</td><td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"${ssrRenderAttr("title", formatDate(user.registrationTime))} data-v-0492e637${_scopeId}>${ssrInterpolate(formatRelativeTime(user.registrationTime))}</td><td class="whitespace-nowrap px-3 py-4 text-sm" data-v-0492e637${_scopeId}><span class="${ssrRenderClass(getStatusClass(user.status))}" data-v-0492e637${_scopeId}>${ssrInterpolate(getStatusText(user.status))}</span></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (unref(loading)) {
              _push2(`<div class="flex justify-center py-8" data-v-0492e637${_scopeId}><div class="flex items-center space-x-2" data-v-0492e637${_scopeId}><div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600" data-v-0492e637${_scopeId}></div><span class="text-sm text-gray-500" data-v-0492e637${_scopeId}>Загрузка...</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!unref(loading) && unref(users).length === 0) {
              _push2(`<div class="text-center py-12" data-v-0492e637${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-users",
                class: "mx-auto h-12 w-12 text-gray-400"
              }, null, _parent2, _scopeId));
              _push2(`<h3 class="mt-2 text-sm font-medium text-gray-900" data-v-0492e637${_scopeId}>Пользователи не найдены</h3><p class="mt-1 text-sm text-gray-500" data-v-0492e637${_scopeId}>Начните с создания первого пользователя</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "overflow-hidden" }, [
                createVNode("div", { class: "overflow-x-auto" }, [
                  createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                    createVNode("thead", { class: "bg-gray-50" }, [
                      createVNode("tr", null, [
                        createVNode("th", {
                          scope: "col",
                          class: "relative w-12 px-6 sm:w-16 sm:px-8"
                        }, [
                          createVNode(_component_UCheckbox, {
                            modelValue: unref(selectAll),
                            "onUpdate:modelValue": ($event) => isRef(selectAll) ? selectAll.value = $event : null,
                            onChange: toggleSelectAll,
                            disabled: unref(loading)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ]),
                        createVNode("th", {
                          scope: "col",
                          class: "min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100",
                          onClick: ($event) => sortBy("name")
                        }, [
                          createVNode("div", { class: "flex items-center space-x-1" }, [
                            createVNode("span", null, "Имя"),
                            unref(currentSort) === "name" ? (openBlock(), createBlock(_component_UIcon, {
                              key: 0,
                              name: unref(sortOrder) === "asc" ? "i-heroicons-chevron-up" : "i-heroicons-chevron-down",
                              class: "w-4 h-4 text-gray-400"
                            }, null, 8, ["name"])) : createCommentVNode("", true)
                          ])
                        ], 8, ["onClick"]),
                        createVNode("th", {
                          scope: "col",
                          class: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100",
                          onClick: ($event) => sortBy("email")
                        }, [
                          createVNode("div", { class: "flex items-center space-x-1" }, [
                            createVNode("span", null, "Email"),
                            unref(currentSort) === "email" ? (openBlock(), createBlock(_component_UIcon, {
                              key: 0,
                              name: unref(sortOrder) === "asc" ? "i-heroicons-chevron-up" : "i-heroicons-chevron-down",
                              class: "w-4 h-4 text-gray-400"
                            }, null, 8, ["name"])) : createCommentVNode("", true)
                          ])
                        ], 8, ["onClick"]),
                        createVNode("th", {
                          scope: "col",
                          class: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100",
                          onClick: ($event) => sortBy("lastLoginAt")
                        }, [
                          createVNode("div", { class: "flex items-center space-x-1" }, [
                            createVNode("span", null, "Последний вход"),
                            unref(currentSort) === "lastLoginAt" ? (openBlock(), createBlock(_component_UIcon, {
                              key: 0,
                              name: unref(sortOrder) === "asc" ? "i-heroicons-chevron-up" : "i-heroicons-chevron-down",
                              class: "w-4 h-4 text-gray-400"
                            }, null, 8, ["name"])) : createCommentVNode("", true)
                          ])
                        ], 8, ["onClick"]),
                        createVNode("th", {
                          scope: "col",
                          class: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100",
                          onClick: ($event) => sortBy("registrationTime")
                        }, [
                          createVNode("div", { class: "flex items-center space-x-1" }, [
                            createVNode("span", null, "Регистрация"),
                            unref(currentSort) === "registrationTime" ? (openBlock(), createBlock(_component_UIcon, {
                              key: 0,
                              name: unref(sortOrder) === "asc" ? "i-heroicons-chevron-up" : "i-heroicons-chevron-down",
                              class: "w-4 h-4 text-gray-400"
                            }, null, 8, ["name"])) : createCommentVNode("", true)
                          ])
                        ], 8, ["onClick"]),
                        createVNode("th", {
                          scope: "col",
                          class: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100",
                          onClick: ($event) => sortBy("status")
                        }, [
                          createVNode("div", { class: "flex items-center space-x-1" }, [
                            createVNode("span", null, "Статус"),
                            unref(currentSort) === "status" ? (openBlock(), createBlock(_component_UIcon, {
                              key: 0,
                              name: unref(sortOrder) === "asc" ? "i-heroicons-chevron-up" : "i-heroicons-chevron-down",
                              class: "w-4 h-4 text-gray-400"
                            }, null, 8, ["name"])) : createCommentVNode("", true)
                          ])
                        ], 8, ["onClick"])
                      ])
                    ]),
                    createVNode("tbody", { class: "divide-y divide-gray-200 bg-white" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(users), (user) => {
                        return openBlock(), createBlock("tr", {
                          key: user.id,
                          class: [{ "bg-blue-50": unref(selectedUsers).includes(user.id) }, "hover:bg-gray-50"]
                        }, [
                          createVNode("td", { class: "relative w-12 px-6 sm:w-16 sm:px-8" }, [
                            createVNode(_component_UCheckbox, {
                              "model-value": unref(selectedUsers).includes(user.id),
                              "onUpdate:modelValue": (checked) => {
                                if (checked) {
                                  unref(selectedUsers).push(user.id);
                                } else {
                                  const index = unref(selectedUsers).indexOf(user.id);
                                  if (index > -1) unref(selectedUsers).splice(index, 1);
                                }
                              },
                              disabled: unref(loading)
                            }, null, 8, ["model-value", "onUpdate:modelValue", "disabled"])
                          ]),
                          createVNode("td", { class: "whitespace-nowrap py-4 pr-3 text-sm" }, [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("div", { class: "h-10 w-10 flex-shrink-0" }, [
                                createVNode("div", { class: "h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center" }, [
                                  createVNode(_component_UIcon, {
                                    name: "i-heroicons-user",
                                    class: "h-5 w-5 text-gray-500"
                                  })
                                ])
                              ]),
                              createVNode("div", { class: "ml-4" }, [
                                createVNode("div", { class: "font-medium text-gray-900" }, toDisplayString(user.name), 1)
                              ])
                            ])
                          ]),
                          createVNode("td", { class: "whitespace-nowrap px-3 py-4 text-sm text-gray-500" }, toDisplayString(user.email), 1),
                          createVNode("td", { class: "whitespace-nowrap px-3 py-4 text-sm text-gray-500" }, [
                            user.lastLoginAt ? (openBlock(), createBlock("span", {
                              key: 0,
                              title: formatDate(user.lastLoginAt)
                            }, toDisplayString(formatRelativeTime(user.lastLoginAt)), 9, ["title"])) : (openBlock(), createBlock("span", {
                              key: 1,
                              class: "text-gray-400"
                            }, " Никогда "))
                          ]),
                          createVNode("td", {
                            class: "whitespace-nowrap px-3 py-4 text-sm text-gray-500",
                            title: formatDate(user.registrationTime)
                          }, toDisplayString(formatRelativeTime(user.registrationTime)), 9, ["title"]),
                          createVNode("td", { class: "whitespace-nowrap px-3 py-4 text-sm" }, [
                            createVNode("span", {
                              class: getStatusClass(user.status)
                            }, toDisplayString(getStatusText(user.status)), 3)
                          ])
                        ], 2);
                      }), 128))
                    ])
                  ])
                ]),
                unref(loading) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex justify-center py-8"
                }, [
                  createVNode("div", { class: "flex items-center space-x-2" }, [
                    createVNode("div", { class: "animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600" }),
                    createVNode("span", { class: "text-sm text-gray-500" }, "Загрузка...")
                  ])
                ])) : createCommentVNode("", true),
                !unref(loading) && unref(users).length === 0 ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "text-center py-12"
                }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-users",
                    class: "mx-auto h-12 w-12 text-gray-400"
                  }),
                  createVNode("h3", { class: "mt-2 text-sm font-medium text-gray-900" }, "Пользователи не найдены"),
                  createVNode("p", { class: "mt-1 text-sm text-gray-500" }, "Начните с создания первого пользователя")
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const admin = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0492e637"]]);

export { admin as default };
//# sourceMappingURL=admin-CdUDpkxD.mjs.map
