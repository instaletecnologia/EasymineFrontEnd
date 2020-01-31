import request from '@/utils/request';

export async function release(params) {
  return request('maintenance-equipment-release-control-hour', {
    method: 'POST',
    params,
  });
}
