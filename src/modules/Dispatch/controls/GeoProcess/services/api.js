import request from '@/utils/request';

export async function getCoords() {
  return request('geo-process/coords');
}

export async function getEquipmentsPosition() {
  return request('geo-process/position');
}
