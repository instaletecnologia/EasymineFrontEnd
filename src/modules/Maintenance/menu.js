module.exports = {
  path: '/maintenance',
  name: 'maintenance',
  authority: ['MODULE', '-3'],
  icon: 'tool',
  routes: [
    {
      path: '/maintenance/controls',
      name: 'controls',
      authority: ['DIRECTORY', 'CONTROLES'],
      icon: 'database',
      routes: [
        {
          path: '/maintenance/controls/maintenance-monitoring',
          name: 'monitoring',
          icon: 'monitor',
          component: './../modules/Maintenance/controls/MaintenanceMonitoring',
        },
      ],
    },
  ],
};
