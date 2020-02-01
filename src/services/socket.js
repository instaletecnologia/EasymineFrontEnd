import socketIOClient from 'socket.io-client';

export default socketIOClient(window.SOCKET_URL, { autoConnect: true });
