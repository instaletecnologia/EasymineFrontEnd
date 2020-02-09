import request from '@/utils/request';

export async function release(params) {
  return request('maintenance-release', {
    method: 'POST',
    params,
  });
}
