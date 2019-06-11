import * as express from 'express';
import { resolve } from 'path';

// **** MIDDLEWARES **** //

import XPoweredByMiddleware from './middlewares/x-powered-by';
import authenticateMiddleware from './middlewares/authenticate';
import validateGamertagMiddleware from './middlewares/validate-gamertag';
import playerSettingsMiddleware from './middlewares/player-settings';
import playerScreenshotsMiddleware from './middlewares/player-screenshots';
import playerGameclipsMiddleware from './middlewares/player-gameclips';

// **** EXPRESS **** //

const app = express();
const api = express();

app.use('/', XPoweredByMiddleware());
api.use('/', XPoweredByMiddleware());
app.use('/static', express.static(resolve(__dirname, '..', 'public')));

api.get(
	'/settings',
	validateGamertagMiddleware(),
	authenticateMiddleware(),
	playerSettingsMiddleware()
);

api.get(
	'/screenshots',
	validateGamertagMiddleware(),
	authenticateMiddleware(),
	playerScreenshotsMiddleware()
);

api.get(
	'/gameclips',
	validateGamertagMiddleware(),
	authenticateMiddleware(),
	playerGameclipsMiddleware()
);

app.use('/api', api);
app.get('/', (_: express.Request, res: express.Response) => {
	res.sendFile(resolve(__dirname, '..', 'public', 'index.html'));
});

const server = app.listen(7890, '127.0.0.1');
server.on('error', console.error);
server.on('listening', () => {
	console.info(`Listening at http://127.0.0.1:7890`);
});
