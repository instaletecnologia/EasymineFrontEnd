import { fetcSelectUserMechanical } from '../components/SelectUserMechanical/services/api';

const SelectUserMechanical = {
  namespace: 'SelectUserMechanical',
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
      const response = yield call(fetcSelectUserMechanical);
      yield put({ type: 'setData', payload: response });
    },
  },
};
export default SelectUserMechanical;
