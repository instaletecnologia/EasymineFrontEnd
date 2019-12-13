const OPERATION_MODULE = require('../src/modules/Operation/route.json');

export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      {
        path: '/',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
      },

      {
        path: '/basic',
        name: 'Básico',
        routes: [OPERATION_MODULE],
      },

      /*
       * END Modules
       */

      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
