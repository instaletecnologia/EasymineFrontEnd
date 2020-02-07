import request from '@/utils/request';

export async function fetchSelect(params) {
  return request('maintenance-ocorrence-by-type', {
    method: 'GET',
    params,
  });
}
