import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { jwtDecode } from "jwt-decode";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createWebHistory(),
  })

  Router.beforeEach((to, from, next) => {
    const publicPages = ['/']
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = localStorage.getItem('token')

    if (to.matched.some(record => record.meta.requiresAdmin)) {
      if (loggedIn) {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        if (decoded.isAdministrator) {
          return next()
        }
      }
      return next('/404')
    }

    if (authRequired && !loggedIn) {
      return next('/')
    }

    next()
  })

  return Router
})
