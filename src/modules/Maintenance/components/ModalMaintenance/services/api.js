import request from '@/utils/request';

export async function add(params) {
  return request('maintenance-equipment-control-hour', {
    method: 'POST',
    params,
  });
}
