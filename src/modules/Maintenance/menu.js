module.exports = {
  path: '/maintenance',
  name: 'Manutenção',
  authority: ['MODULE', '-3'],
  icon: 'global',
  routes: [
    {
      path: '/maintenance/controls',
      name: 'Controles',
      authority: ['DIRECTORY', 'CONTROLES'],
      icon: 'database',
      routes: [
        {
          path: '/maintenance/controls/maintenance-monitoring',
          name: 'Acompanhamento de manutenção',
          icon: 'tool',
          component: './../modules/Maintenance/controls/MaintenanceMonitoring',
        },
      ],
    },
  ],
};
