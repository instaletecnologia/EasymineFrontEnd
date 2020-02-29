import request from '@/utils/request';

export async function fetchSelectEquipmentTag() {
  return request('equipments-select-tag', {
    method: 'GET',
  });
}
