
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
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'Match', name: "Index", component: () => import('pages/IndexPage.vue') },
      { path: 'Search', name: 'Search', component: () => import('pages/SearchPage.vue') },
      { path: 'Social', name: 'Social', component: () => import('pages/SocialPage.vue') },
      {path : 'Admin', name: 'Admin', meta: { requiresAdmin: true }, component: () => import('pages/AdminPage.vue')},
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
