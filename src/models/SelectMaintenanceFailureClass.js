import { fetcSelect } from '../components/SelectMaintenanceFailureClass/services/api';

const SelectMaintenanceFailureClass = {
  namespace: 'SelectMaintenanceFailureClass',
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
    *fetch({ payload }, { call, put }) {
      const response = yield call(fetcSelect, payload);
      yield put({ type: 'setData', payload: response });
    },
  },
};
export default SelectMaintenanceFailureClass;
