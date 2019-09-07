import request from '@/utils/request';

export async function getFlow() {
  return request('flux');
}
