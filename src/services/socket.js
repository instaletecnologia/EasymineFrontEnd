import socketIOClient from 'socket.io-client';

// eslint-disable-next-line no-undef
// export const socketInstance = socketIOClient(SOCKET_URL, {
//   autoConnect: true,
// });

export const socketInstance = socketIOClient({
  autoConnect: true,
});

export const EVENTS = {
  ON_EQUIPMENT_CONNECTION: 'onEquipmentConnection',
  ON_EQUIPMENT_COMPASS: 'onEquipmentCompass',
  ON_EQUIPMENT_POSITION: 'onEquipmentPosition',
  ON_EQUIPMENT_REFRESH_ALL: 'onEquipmentRefreshAll',
};

socketInstance.on('connect', socket => {
  console.log('connect');
});

socketInstance.on('disconnect', () => {
  console.log('disconnect');
});

export default socketInstance;
