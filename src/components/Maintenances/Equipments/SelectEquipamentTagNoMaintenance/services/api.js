import request from '@/utils/request';

export async function fetchSelectEquipmentTagNoInMaintenance() {
  return request('equipments-select-tag-not-in-maintenance', {
    method: 'GET',
  });
}
