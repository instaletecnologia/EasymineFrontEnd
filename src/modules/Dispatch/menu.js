module.exports = {
  path: '/dispatch',
  name: 'Despacho',
  authority: ['MODULE', '-3'],
  icon: 'fire',
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
          icon: 'environment',
          component: './../modules/Dispatch/controls/GeoProcess',
        },
      ],
    },
  ],
};
