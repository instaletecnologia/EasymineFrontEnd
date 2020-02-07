import { fetchMaintenceEquipments } from '../services/api';

const MaintenanceMonitoringModel = {
  namespace: 'MaintenanceMonitoring',
  state: {
    loading: false,
    data: [],
  },
  reducers: {
    setData(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fetchMaintenceEquipments);
      yield put({ type: 'setData', payload: response });
    },
  },
};
export default MaintenanceMonitoringModel;
