export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {},
  },

  reducers: {
    setStatus(state, { payload }) {
      return {
        ...state,
        status: payload,
      };
    },
  },
};
