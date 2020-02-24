import request from '@/utils/request';

export async function fetcSelectUserMechanical() {
  return request('users-mechanical');
}
