import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('sessions/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}
export async function auth(params) {
  return request('sessions', {
    method: 'POST',
    data: params,
  });
}
export async function unauth() {
  return request('sessions/revokeToken', {
    method: 'POST',
  });
}
