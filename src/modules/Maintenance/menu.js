module.exports = {
  path: '/maintenance',
  name: 'Manutenção',
  authority: ['MODULE', '-3'],
  icon: 'tool',
  routes: [
    {
      path: '/maintenance/controls',
      name: 'Controles',
      authority: ['DIRECTORY', 'CONTROLES'],
      icon: 'database',
      routes: [
        {
          path: '/maintenance/controls/maintenance-monitoring',
          name: 'Acompanhamento',
          icon: 'monitor',
          component: './../modules/Maintenance/controls/MaintenanceMonitoring',
        },
      ],
    },
  ],
};
