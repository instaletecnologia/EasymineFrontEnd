import { parse, stringify } from 'qs';
import { routerRedux } from 'dva/router';
import { auth, unauth } from '@/services/user';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(auth, payload);
      localStorage.setItem('token', response.token);

      const loginData = {
        token: response.token,
        type: 'account',
        currentAuthority: 'user',
        status: response.token ? true : 'error',
      };

      yield put({
        type: 'changeLoginStatus',
        payload: loginData,
      });

      // Login successfully
      if (loginData.status === true) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            redirect = null;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },
    *logout({ payload }, { put, call }) {
      if (payload && payload.revokeToken) yield call(unauth);

      const { redirect } = getPageQuery(); // redirect

      localStorage.removeItem('token');

      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
