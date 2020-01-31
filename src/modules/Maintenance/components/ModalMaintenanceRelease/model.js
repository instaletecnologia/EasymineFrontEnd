import { registerModel } from '@/utils/utils';

const MaintenanceRelease = {
  namespace: 'modules/Maintenance/MaintenanceRelease',

  state: {
    visible: false,
    params: {
      maintenanceType: null,
    },
  },

  effects: {
    *open({ payload }, { put }) {
      yield put({ type: 'setVisible', payload: true });
      yield put({ type: 'setParams', payload });
    },
    *close(_, { put }) {
      yield put({ type: 'setVisible', payload: false });
      yield put({ type: 'setParams', payload: null });
    },
  },

  reducers: {
    setVisible(state, { payload }) {
      return {
        ...state,
        visible: payload,
      };
    },
    setParams(state, { payload }) {
      return {
        ...state,
        params: payload,
      };
    },
  },
};

export default registerModel(MaintenanceRelease);
