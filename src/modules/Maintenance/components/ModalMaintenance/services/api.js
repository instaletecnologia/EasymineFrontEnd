import request from '@/utils/request';

export async function add(params) {
  return request('maintenance-equipments', {
    method: 'POST',
    params,
  });
}
