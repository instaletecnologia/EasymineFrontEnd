// const OPERATION_MODULE = require('../src/modules/Operation/route.json');
// const MAINTENANCE_MODULE = require('../src/modules/Maintenance/route.json');

//import OPERATION_MODULE from '@/modules/Operation/menu.js';
import MAINTENANCE_MODULE from '@/modules/Maintenance/menu.js';
// import DISPATCH_MODULE from '@/modules/Dispatch/menu.js';

export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: '/user/login',
        name: 'login',
        component: './User/Login',
      },
      {
        path: '/user/register',
        name: 'register',
        component: './User/Register',
      },
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
      // {
      //   path: '/',
      //   name: 'Geoprocessamento',
      //   icon: 'smile',
      //   component: './../modules/Dispatch/controls/GeoProcess',
      // },
      // OPERATION_MODULE,
      MAINTENANCE_MODULE,
      // DISPATCH_MODULE,
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
