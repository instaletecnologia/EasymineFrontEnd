import request from '@/utils/request';

export async function fetchSelect() {
  return request('maintenance-reason');
}
