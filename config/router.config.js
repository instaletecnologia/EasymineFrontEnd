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
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
      },

      // Geoprocess
      {
        path: '/geoprocess',
        name: 'Geoprocessamento',
        icon: 'global',
        routes: [
          {
            path: '/geoprocess/position',
            name: 'Posição',
            icon: 'environment',
            component: '../pages/GeoProcess/pages/Position',
          },
        ],
      },

      /**
       * MODULES
       */

      {
        path: '/operation',
        name: 'Operação',
        icon: 'global',
        routes: [
          {
            path: '/operation/registers',
            name: 'Cadastros',
            icon: 'database',
            routes: [
              {
                path: '/operation/registers/activites',
                name: 'Atividades',
                icon: 'branches',
                component: '../modules/Operation/pages/registers/RegistersActivities',
              },
            ],
          },
          {
            path: '/operation/controllers',
            name: 'Controles',
            icon: 'apartment',
            routes: [
              {
                path: '/operation/controllers/flow',
                name: 'Fluxo',
                icon: 'branches',
                component: '../modules/Operation/pages/controllers/Flow',
              },
            ],
          },
        ],
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
