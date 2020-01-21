import { fetch } from '../components/InputNumberPlate/services/api';

const InputNumberPlate = {
  namespace: 'InputNumberPlate',
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
      const response = yield call(fetch);
      yield put({ type: 'setData', payload: response });
    },
  },
};
export default InputNumberPlate;
