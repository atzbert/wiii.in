
function startSocket() {
  const socket = io.connect('https://streamer.cryptocompare.com/');
  socket.on('connect', () => {
    socket.emit('SubAdd', {subs: ['5~CCCAGG~ETH~EUR']});
  });
  socket.on('m', function(message) {
    const messageType = message.substring(0, message.indexOf('~'));
    if (messageType === CCC.STATIC.TYPE.CURRENTAGG) {
      const res = CCC.CURRENT.unpack(message);
      if (res.PRICE) {
        document.querySelector('#ticker').innerHTML = res.PRICE + ' €';
      }
    }
  });
}
