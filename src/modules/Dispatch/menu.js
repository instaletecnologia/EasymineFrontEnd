module.exports = {
  path: '/dispatch',
  name: 'Despacho',
  authority: ['MODULE', '-3'],
  icon: 'global',
  routes: [
    {
      path: '/dispatch/controls',
      name: 'Controles',
      authority: ['DIRECTORY', 'CONTROLES'],
      icon: 'database',
      routes: [
        {
          path: '/dispatch/controls/geoprocessamento',
          name: 'Geoprocessamento',
          icon: 'tool',
          component: './../modules/Dispatch/controls/GeoProcess',
        },
      ],
    },
  ],
};
