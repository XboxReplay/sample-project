import XPoweredByMiddleware from './x-powered-by';
import authenticateMiddleware from './authenticate';
import validateGamertagMiddleware from './validate-gamertag';
import playerSettingsMiddleware from './player-settings';
import playerScreenshotsMiddleware from './player-screenshots';
import playerGameclipsMiddleware from './player-gameclips';
import XBLAuthenticateMiddleware from './authenticate';

export default {
	XPoweredByMiddleware,
	authenticateMiddleware,
	validateGamertagMiddleware,
	playerSettingsMiddleware,
	playerScreenshotsMiddleware,
	playerGameclipsMiddleware,
	XBLAuthenticateMiddleware
};
