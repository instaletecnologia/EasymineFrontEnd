import request from '@/utils/request';

export async function add(params) {
  return request('maintenance-detailing', {
    method: 'POST',
    params,
  });
}
