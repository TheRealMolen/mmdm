
const debug = process.env.NODE_ENV !== 'production';

const syncHost = !debug ? location.origin.replace(/^http/, 'ws') : 'ws://localhost:31032';


export const joinGame = (gameId, onNewState) => {
  const syncUrl = syncHost + '/game/' + encodeURIComponent(gameId);
  try {
    const syncSock = new WebSocket(syncUrl);
    syncSock.onmessage = event => {
      console.log('sock event:', event);
      // TODO: call onNewState as appropes
    };

    return {
      onStateChanged(state) {
        console.log('-->statechange; TODO send it');
      },
    };
  }
  catch (err) {
    console.error(err);
    return {
      onStateChanged() {
        // null
      },
    };
  }
};
