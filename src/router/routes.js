
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/register', name: 'register', component: () => import('pages/Register.vue'), meta: { guest: true} },
      { path: '/login', name: 'login', component: () => import('pages/Login.vue'), meta: { guest: true} },
      { path: '/admin', name: 'admin', component: () => import('pages/Admin.vue'), meta: { auth: true} },
      { path: '/customer', name: 'customer', component: () => import('pages/Customer.vue'), meta: { auth: true} }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}



export default routes
