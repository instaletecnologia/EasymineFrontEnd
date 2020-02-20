import _ from 'lodash';
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
    *fetch(_params, { call, put }) {
      const response = yield call(fetchMaintenceEquipments);
      if (_.isArray(response)) {
        yield put({ type: 'setData', payload: response });
      }
    },
  },
};
export default MaintenanceMonitoringModel;
