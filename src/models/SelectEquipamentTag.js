import { fetcSelectEquipamentTag } from '../components/SelectEquipamentTag/services/api';

const SelectEquipamentTag = {
  namespace: 'SelectEquipamentTag',
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
      const response = yield call(fetcSelectEquipamentTag);
      yield put({ type: 'setData', payload: response });
    },
  },
};
export default SelectEquipamentTag;
