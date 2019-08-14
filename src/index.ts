import * as express from 'express';
import * as UGCMiddleware from '@xboxreplay/express-ugc-proxy';
import XBLAuthenticateMethod from './modules/authenticate';
import middlewares from './middlewares';
import { resolve } from 'path';

const host = String(process.env.HOST || '127.0.0.1');
const port = Number(process.env.PORT || 7890);
const app = express();
const api = express();

app.enable('trust proxy');
api.enable('trust proxy');
app.use('/', middlewares.XPoweredByMiddleware());
api.use('/', middlewares.XPoweredByMiddleware());

app.get('/favicon.ico', (_, res) =>
	res.redirect(301, 'https://www.xboxreplay.net/favicon.ico')
);

app.use(
	'/ugc-files',
	UGCMiddleware.handle(XBLAuthenticateMethod, {
		debug: true,
		redirectOnFetch: true
	})
);

api.get(
	'/settings',
	middlewares.validateGamertagMiddleware(),
	middlewares.authenticateMiddleware(),
	middlewares.playerSettingsMiddleware()
);

api.get(
	'/screenshots',
	middlewares.validateGamertagMiddleware(),
	middlewares.authenticateMiddleware(),
	middlewares.playerScreenshotsMiddleware()
);

api.get(
	'/gameclips',
	middlewares.validateGamertagMiddleware(),
	middlewares.authenticateMiddleware(),
	middlewares.playerGameclipsMiddleware()
);

app.use('/api', api);
app.get('/', (_, res) => {
	res.sendFile(resolve(__dirname, '..', 'public', 'index.html'));
});

app.listen(port, host, err => {
	if (err) throw err;
	else console.info(`> Listening at http://${host}:${port}`);
});
