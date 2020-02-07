module.exports = {
  path: '/operation',
  name: 'Operação',
  authority: ['MODULE', '-10'],
  icon: 'thunderbolt',
  routes: [
    {
      path: '/operation/registers',
      name: 'Cadastros',
      authority: ['DIRECTORY', 'CADASTROS'],
      icon: 'database',
      routes: [
        /* {
          path: '/operation/registers/activities',
          name: 'Atividades',
          authority: ['FUNCTIONALITY', '64'],
          icon: 'branches',
          component: '../modules/Operation/pages/registers/RegistersActivities',
        }, */
      ],
    },
    {
      path: '/operation/indicators',
      name: 'Indicadores',
      authority: ['DIRECTORY', 'INDICADORES'],
      icon: 'database',
      routes: [
        {
          path: '/operation/indicators/movement',
          name: 'Dashboard Movement',
          // authority: ['FUNCTIONALITY', '64'],
          icon: 'dashboard',
          component: '../modules/Operation/pages/indicators/movement/dashboardMovement',
        },
      ],
    },
  ],
};
