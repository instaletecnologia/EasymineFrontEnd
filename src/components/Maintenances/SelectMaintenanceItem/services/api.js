import request from '@/utils/request';

export async function fetchSelect(params) {
  return request('maintenance-items', {
    method: 'GET',
    params,
  });
}
