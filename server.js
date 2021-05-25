import express from 'express';
import ws from 'ws';

console.log('welcome to mmdmsville. population: you');

const PORT = process.env.PORT || 31032;

const server = express()
  .use(express.static('static'))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const websock = new ws.Server({ server });
websock.on('connection', ws => {
  console.log('we got one!');
  ws.on('close', () => console.log('they left T_T'));
});