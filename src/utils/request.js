/* eslint-disable prefer-const */
/* eslint-disable func-names */
/* eslint-disable no-undef */
/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';

const codeMessage = {
  200: 'The server successfully returned the requested data. ',
  201: 'New or modified data was successful. ',
  202: 'A request has been queued in the background (asynchronous task). ',
  204: 'Successfully deleted data. ',
  400: 'The request sent has an error, and the server did not create or modify data. ',
  401: 'User does not have permission (token, username, password incorrect). ',
  403: 'The user is authorized, but access is forbidden. ',
  404: 'The request was made for a record that does not exist, and the server did nothing. ',
  406: 'The requested format is not available. ',
  410: 'The requested resource was permanently deleted and will no longer be available. ',
  422: 'When creating an object, a validation error occurred. ',
  500: 'A server error occurred. Please check the server. ',
  502: 'Gateway error. ',
  503: 'Service is unavailable, the server is temporarily overloaded or maintained. ',
  504: 'Gateway timed out. ',
};
/**
 * 异常处理程序
 */

const errorHandler = error => {
  const { response } = error;

  console.log(error);

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    switch (status) {
      case 401:
        // @HACK
        // eslint-disable-next-line no-underscore-dangle
        window.g_app._store.dispatch({
          type: 'login/logout',
        });
        return response;

      default:
        notification.error({
          message: `Request error ${status}: ${url}`,
          description: errorText,
        });
    }
  } else if (!response) {
    notification.error({
      description: 'Your network is abnormal and cannot connect to the server',
      message: 'network anomaly',
    });
  }

  return response;
};

const request = function(arg1, arg2) {
  const token = localStorage.getItem('token');
  let headers = {
    'Content-Type': 'application/json',
    scope: '*',
    grant_type: '',
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
  };

  if (token) headers.Authorization = `Bearer ${token}`;
  else headers.Authorization = `Bearer 123`;

  return extend({
    errorHandler,
    // credentials: 'include',
    prefix: API_URL,
    headers,
  })(arg1, arg2);
};

export default request;
