import request from '@/utils/request';

export async function fetcSelect(params) {
  const url = `maintenance-failure-class-time-category/${params.idCategoriasTempo}`;
  // const url = `maintenance-failure-class-time-category/${1}`
  const result = request(url);
  return result;
}
