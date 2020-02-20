module.exports = {
  path: '/optional/maintenance',
  name: 'maintenance',
  authority: ['MODULE', '-3'],
  icon: 'tool',
  routes: [
    {
      path: '/optional/maintenance/controls',
      name: 'controls',
      authority: ['DIRECTORY', 'CONTROLES'],
      icon: 'database',
      routes: [
        {
          path: '/optional/maintenance/controls/maintenance-monitoring',
          name: 'monitoring',
          icon: 'monitor',
          component: './../modules/Maintenance/controls/MaintenanceMonitoring',
        },
      ],
    },
  ],
};
