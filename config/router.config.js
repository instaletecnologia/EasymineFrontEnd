export default [
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
          }
        ],
      },
      {
        path: '/flow',
        name: 'Fluxo',
        icon: 'branches',
        component: '../pages/Flow/pages/Flow'
      },

      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
