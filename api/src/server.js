import debug from 'debug';
import express from 'express';
import cors from 'cors';

import { routes } from './routes.js';

const logger = debug('api:main');
const server = express();

const PORT = 8080;

// configs
server.use(express.json());
server.use(cors());
server.use(routes);

server.listen(PORT, () => {
    logger(`🚀 Server started! http://localhost:${PORT}`);
});
