import { getCoords, getEquipmentsPosition } from '../services/api';

const PositionModel = {
  namespace: 'geoprocessPosition',
  state: {
    coords: [],
    equipments: [],
  },
  effects: {
    *loadCoords(_, { call, put }) {
      const response = yield call(getCoords);
      yield put({
        type: 'setCoords',
        payload: response,
      });
    },
    *loadEquipments(_, { call, put }) {
      const response = yield call(getEquipmentsPosition);
      yield put({
        type: 'setEquipments',
        payload: response,
      });
    },
  },
  reducers: {
    setCoords(state, action) {
      return {
        ...state,
        coords: action.payload,
      };
    },
    setEquipments(state, action) {
      return {
        ...state,
        equipments: action.payload,
      };
    },
  },
};
export default PositionModel;
