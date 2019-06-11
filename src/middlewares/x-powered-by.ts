import * as express from 'express';

export default () => (
	_: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	res.setHeader('X-Powered-By', 'XboxReplay.net');
	return next();
};
