import express from 'express';
import ws from 'ws';
import url from 'url';

console.log('welcome to mmdmsville. population: you');

const PORT = process.env.PORT || 31032;

const server = express()
  .use(express.static('static'))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const websock = new ws.Server({ server });
websock.on('connection', (ws, req) => {
  const path = url.parse(req.url).pathname;
  console.log('we got one at ' + path);
  ws.on('close', () => console.log('they left T_T  (from ' + path + ')'));
});