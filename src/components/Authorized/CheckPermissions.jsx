import { useSelector } from 'dva';
import _ from 'lodash';
// import { CURRENT } from './renderAuthorize';

const checkPermissions = (authority, currentAuthority, target, Exception) => {
  // Don't have authority to verify
  if (!authority) return target;

  if (!_.isArray(authority)) throw new Error('authority need to be an array');

  const key = authority[0];
  const value = authority[1];

  return currentAuthority[key].indexOf(value) !== -1 ? target : Exception;
};

export { checkPermissions };

function check(authority, target, Exception) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = useSelector(state => state.user.currentUser);
  const CURRENT_AUTHORITY = {
    AREA: _.get(user, 'Areas', []).map(val => val.toString()),
    MODULE: _.get(user, 'Modulos', []).map(val => val.toString()),
    DIRECTORY: _.get(user, 'Diretorios', []).map(val => val.toString()),
    FUNCTIONALITY: _.get(user, 'Funcionalidades', []).map(val => val.toString()),
  };

  return checkPermissions(authority, CURRENT_AUTHORITY, target, Exception);
}

export default check;
