import { getFlow } from '../services/api';

const FlowModel = {
  namespace: 'flow',
  state: {
    data: [],
  },
  effects: {
    *loadData(_, { call, put }) {
      const response = yield call(getFlow);
      yield put({
        type: 'setData',
        payload: response,
      });
    },
  },
  reducers: {
    setData(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
export default FlowModel;
