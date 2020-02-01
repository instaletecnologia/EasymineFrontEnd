import request from '@/utils/request';

export async function getCoords() {
  return request('api/v1/geo-process/coords');
}

export async function getEquipments() {
  return request('api/v1/geo-process/position');
}
