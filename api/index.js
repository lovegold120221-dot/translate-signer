import {createServer} from 'http';
import {handler} from '../../dist/sign-translate/server/server.mjs';

const server = createServer(handler);

export default function (req, res) {
  server.emit('request', req, res);
}
