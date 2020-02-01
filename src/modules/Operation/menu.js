module.exports = {
  path: '/operation',
  name: 'Operação',
  authority: ['MODULE', '-10'],
  icon: 'global',
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
  ],
};
