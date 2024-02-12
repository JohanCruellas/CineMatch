
const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  // },
  {
    path: '/',
    name: "Login",
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: "Index", component: () => import('pages/IndexPage.vue') },
      { path: 'Search', name: 'Search', component: () => import('pages/SearchPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
