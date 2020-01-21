import request from '@/utils/request';

export async function fetcSelectEquipamentTag() {
  return request('equipments-select-tag');
}
