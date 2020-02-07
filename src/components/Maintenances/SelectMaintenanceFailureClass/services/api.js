import request from '@/utils/request';

export async function fetchSelect(params) {
  return request('maintenance-failure-class-time-category', {
    method: 'GET',
    params,
  });
}
