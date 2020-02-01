import request from '@/utils/request';

export async function fetchMaintenceEquipments() {
  return request('maintenance-equipments');
}
