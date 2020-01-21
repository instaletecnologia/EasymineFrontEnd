// import { fetchMaintenceEquipments } from '../services/api';

const ModalMaintenanceDetailing = {
  namespace: 'ModalMaintenanceDetailing',
  state: {
    loading: false,
    visible: false,
    initialValue: null,
  },
  reducers: {
    setVisible(state, action) {
      return {
        ...state,
        visible: action.payload,
      };
    },
    setInitialValue(state, action) {
      return {
        ...state,
        initialValue: action.payload,
      };
    },
  },
  effects: {
    *updateVisible({ payload }, { put }) {
      yield put({ type: 'setVisible', payload });
    },
    *changeInitialValue({ payload }, { put }) {
      yield put({ type: 'setInitialValue', payload });
    },
  },
};
export default ModalMaintenanceDetailing;
